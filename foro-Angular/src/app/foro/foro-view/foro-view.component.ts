import { Component, Input, OnInit } from '@angular/core';
import { ForoService } from '../shared/foro.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Foro } from '../shared/Entidades/foro';
import { Auxiliar } from '../shared/auxiliar';
import { Tema } from '../shared/Entidades/tema';
import { Usuario } from '../shared/Entidades/usuario';

@Component({
  selector: 'app-foro-view',
  templateUrl: './foro-view.component.html',
  styleUrls: ['./foro-view.component.css']
})
export class ForoViewComponent implements OnInit {

  private usuarioActual: Usuario;
  private id;

  public foro: Foro;
  public temaEdicion: Tema;
  public modoEdicion = false;

  constructor(private ForoRepo: ForoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.findForo(this.id, false);
    this.usuarioActual = JSON.parse(sessionStorage.getItem('user'));
  }

  findForo(id: number, temp: boolean) {
    this.ForoRepo.getForo(id).toPromise().then(
      result => {
        console.log(result);
        this.foro = result;
        this.getTemas(this.foro.id, temp);
      },
      error => console.log(error)
    );
  }

  getTemas(foroId: number, temp: boolean): void {
    this.ForoRepo.getAllTemasFromForo(foroId).subscribe(
      result => {
        console.log(result);
        this.foro.temas = result;
        if (!temp) {
          Auxiliar.quickSortTemasPorRanking(this.foro.temas, 0, this.foro.temas.length - 1);
        }
      },
      error => console.log(error)
    );
  }

  darLike(tema: Tema): void {
    this.ForoRepo.increaseRankingTema(tema).toPromise().then(
      result => tema.ranking += 1,
      error => console.log('ERROR AL DAR EL LIKE')
    );
  }

  darDislike(tema: Tema): void {
    if (tema.ranking > 0) {
      this.ForoRepo.decreaseRankingTema(tema).subscribe(
        result => tema.ranking -= 1,
        error => console.log('ERROR AL DAR EL LIKE')
      );
    }
  }

  esDeUsuario(tema: Tema) {
    for (const tem of this.usuarioActual.temas) {
      if (tem.id === tema.id) {
        return true;
      }
    }
    return false;
  }

  eliminarTema(tema: Tema) {
    this.ForoRepo.deleteTema(tema).toPromise().then(
      result => this.findForo(this.id, false),
      error => console.log('ERROR AL Eliminar Tema')
    );
  }

  habilitarModoEdicion(tema: Tema) {
    this.modoEdicion = true;
    this.temaEdicion = tema;
  }

  editarTema() {
    this.ForoRepo.updateTema(this.temaEdicion).toPromise().then(
      result => {
        this.modoEdicion = false;
        this.temaEdicion = null;
        this.findForo(this.id, false);
      },
      error => console.log('ERROR AL Eliminar Comentario')
    );
  }
}
