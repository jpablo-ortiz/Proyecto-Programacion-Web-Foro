import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from '../../shared/foro.service';
import { Tema } from '../../shared/Entidades/tema';
import { Comentario } from '../../shared/Entidades/comentario';
import { Auxiliar } from '../../shared/auxiliar';
import { Usuario } from '../../shared/Entidades/usuario';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-tema-view',
  templateUrl: './tema-view.component.html',
  styleUrls: ['./tema-view.component.css']
})
export class TemaViewComponent implements OnInit {

  private usuarioActual: Usuario;
  private id;

  public tema: Tema;
  public comentarioEdicion: Comentario = new Comentario(-1000, -1000, undefined, '');
  public comentarioRespuesta: Comentario = new Comentario(-1000, -1000, undefined, '');
  public nuevoComentarioContenido: string;
  public modoEdicion = false;
  public modoRespuesta = false;
  public comentarioPrincipal = false;

  constructor(private ForoRepo: ForoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.usuarioActual = JSON.parse(sessionStorage.getItem('user'));
    this.id = +this.route.snapshot.paramMap.get('id');
    this.findTema(this.id, false);
  }

  findTema(id: number, temp: boolean): void {
    this.ForoRepo.getTema(id).subscribe(
      result => {
        console.log(result);
        this.tema = result;
        this.getComentariosFromTema(this.tema.id, temp);
      },
      error => console.log(error)
    );
  }

  getComentariosFromTema(temaId: number, temp: boolean): void {
    this.ForoRepo.getAllComentariosFromTema(temaId).subscribe(
      result => {
        console.log(result);
        if (result?.length > 0) {
          this.tema.comentarios = result;
          if (!temp) {
            Auxiliar.quickSortComentariosPorRanking(this.tema.comentarios, 0, this.tema.comentarios.length - 1);
          }
          this.recursivoComentarios(this.tema.comentarios, temp);
        }
        else {
          this.tema.comentarios = [];
        }
      },
      error => {
        console.log(error);
        this.tema.comentarios = [];
      }
    );
  }

  recursivoComentarios(comentarios: Comentario[], temp: boolean): void {
    for (let i = 0; i < comentarios.length; i++) {
      if (comentarios?.length > 0) {
        if (!temp) {
          Auxiliar.quickSortComentariosPorFecha(comentarios, 0, comentarios.length - 1);
          comentarios = comentarios.reverse(); // De más nuevo a más viejo
        }
        this.ForoRepo.getAllComentariosHijosFromComentario(comentarios[i].id).subscribe(
          result => {
            console.log(result);
            if (result?.length > 0) {
              comentarios[i].comentariosHijos = result;
            }
            else {
              comentarios[i].comentariosHijos = [];
            }
            this.recursivoComentarios(comentarios[i].comentariosHijos, temp);
          },
          error => {
            console.log(error);
            comentarios[i].comentariosHijos = [];
          }
        );
      }
    }
  }

  darLike(comentario: Comentario): void {
    this.ForoRepo.increaseRankingComentario(comentario).subscribe(
      result => comentario.ranking += 1,
      error => console.log('ERROR AL DAR EL LIKE')
    );
  }

  darDislike(comentario: Comentario): void {
    if (comentario.ranking > 0) {
      this.ForoRepo.decreaseRankingComentario(comentario).subscribe(
        result => comentario.ranking -= 1,
        error => console.log('ERROR AL DAR EL LIKE')
      );
    }
  }

  esDeUsuario(comentario: Comentario) {
    for (const coment of this.usuarioActual.comentarios) {
      if (coment.id === comentario.id) {
        return true;
      }
    }
    return false;
  }

  eliminarComentario(comentario: Comentario) {
    this.ForoRepo.deleteComentario(comentario).toPromise().then(
      result => this.findTema(this.id, false),
      error => console.log('ERROR AL Eliminar Comentario')
    );
  }

  habilitarModoEdicion(comentario: Comentario) {
    this.modoEdicion = true;
    this.comentarioEdicion = comentario;
  }

  editarComentario() {
    this.ForoRepo.updateComentario(this.comentarioEdicion).toPromise().then(
      result => {
        this.modoEdicion = false;
        this.comentarioEdicion = null;
        this.findTema(this.id, false);
      },
      error => console.log('ERROR AL Eliminar Comentario')
    );
  }

  habilitarModoRespuesta(comentario: any, comentarioPrincipal: boolean) {
    this.comentarioPrincipal = comentarioPrincipal;
    if (comentarioPrincipal)
    {
      this.comentarioRespuesta.id = -100000; // Id que nunca existirá
    }
    else
    {
      this.comentarioRespuesta = comentario;
    }
    this.modoRespuesta = true;
  }

  crearComentario() {
    if (this.comentarioPrincipal) {
      // Se esta creando un comentario principal
      this.ForoRepo.createComentarioPrincipal(this.nuevoComentarioContenido, this.tema, this.usuarioActual).subscribe(
        result => {
          this.modoEdicion = false;
          this.comentarioRespuesta.id = -100000;
          this.comentarioPrincipal = false;
          this.modoRespuesta = false;
          this.actualizarUsuario();
        }
      );
    }
    else {
      // Se esta haciendo una respuesta
      this.ForoRepo.createComentarioSecundario(this.nuevoComentarioContenido, this.comentarioRespuesta, this.usuarioActual).subscribe(
        result => {
          this.modoEdicion = false;
          this.comentarioRespuesta.id = -100000;
          this.comentarioPrincipal = false;
          this.modoRespuesta = false;
          this.actualizarUsuario();
        }
      );
    }
  }

  actualizarUsuario() {
    this.ForoRepo.getUsuarioBy(this.usuarioActual.user, this.usuarioActual.password).toPromise().then(
      result => {
        this.usuarioActual = result;

        const results = forkJoin(
          {
            data1: this.ForoRepo.getAllComentariosFromUsuario(this.usuarioActual.id).toPromise().then(
              data => {
                this.usuarioActual.comentarios = data;
                sessionStorage.setItem('user', JSON.stringify(this.usuarioActual));
              },
              error => console.log('Error Obteniendo comentarios del usuario')
            ),

            data2: this.ForoRepo.getAllTemasFromUsuario(this.usuarioActual.id).toPromise().then(
              data => {
                this.usuarioActual.temas = data;
                sessionStorage.setItem('user', JSON.stringify(this.usuarioActual));
              },
              error => console.log('Error Obteniendo temas del usuario')
            ),

            data3: this.ForoRepo.getAllForosFromUsuario(this.usuarioActual.id).toPromise().then(
              data => {
                this.usuarioActual.foros = data;
                sessionStorage.setItem('user', JSON.stringify(this.usuarioActual));
              },
              error => console.log('Error Obteniendo foros del usuario')
            )
          });

        results.subscribe(
          () => {
            sessionStorage.setItem('user', JSON.stringify(this.usuarioActual));
            this.findTema(this.id, false);
          }
        );

      },
      error => console.log('NO SE ENCONTRÓ USUARIO')
    );
  }

}

