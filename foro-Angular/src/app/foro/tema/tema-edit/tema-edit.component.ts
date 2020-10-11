import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foro } from '../../shared/Entidades/foro';
import { Tema } from '../../shared/Entidades/tema';
import { Usuario } from '../../shared/Entidades/usuario';
import { ForoService } from '../../shared/foro.service';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css']
})
export class TemaEditComponent implements OnInit {

  public tema: Tema = null;
  public foro: Foro = null;
  public usuarioActual: Usuario = null;

  errorMessage = '';
  idTema: number;
  idForo: number;

  constructor(private route: ActivatedRoute, private router: Router, private ForoRepo: ForoService) { }

  ngOnInit() {
    this.idTema = +this.route.snapshot.paramMap.get('idTema');
    this.idForo = +this.route.snapshot.paramMap.get('idForo');

    this.ForoRepo.getTema(this.idTema).subscribe(
      result => this.tema = result
    );

    this.ForoRepo.getForo(this.idForo).subscribe(
      result => this.foro = result
    );

    this.usuarioActual = JSON.parse(sessionStorage.getItem('user'));
  }

  update() {
    console.log(this.tema);
    this.ForoRepo.updateTema(this.tema).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/foro/foro-view', this.foro.id]);
      },
      error => {
        console.error(error);
        this.errorMessage = error.toString();
      }
    );
  }

  cancel() {
    this.router.navigate(['/foro/foro-view', this.foro.id]);
  }
}
