import { Component, OnInit } from '@angular/core';
import { ForoService } from '../shared/foro.service';
import { Foro } from '../shared/Entidades/foro';
import { Usuario } from '../shared/Entidades/usuario';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-foro-list',
  templateUrl: './foro-list.component.html',
  styleUrls: ['./foro-list.component.css']
})
export class ForoListComponent implements OnInit {

  public foros: Foro[];
  public clickedForo = new Foro(0, false, '');

  public usuarioActual: Usuario;
  mensaje: string;
  sesionIniciada = false;

  result: any;

  agregarForo = false;
  nuevoTitulo = '';
  nuevoEsModerado = false;

  constructor(private ForoRepo: ForoService) { }

  ngOnInit(): void {
    this.usuarioActual = JSON.parse(sessionStorage.getItem('user'));
    this.getForos();
  }

  getForos(): void {
    this.ForoRepo.getAllForos().subscribe(
      result => {
        console.log(result);
        this.foros = result;
        this.mensaje = JSON.stringify(result);
      },
      error => {
        console.log(error);
        this.mensaje = JSON.stringify(error);
      }
    );
  }

  habilitarAgregarForo(): void {
    this.agregarForo = true;
  }

  crearForo(): void {
    this.ForoRepo.createForo(this.nuevoTitulo, this.nuevoEsModerado, this.usuarioActual).subscribe(
      result => {
        this.nuevoTitulo = '';
        this.nuevoEsModerado = false;
        this.agregarForo = false;
        // TODO arreglar todos los actualizarUsuario para que guarden los Foros
        this.actualizarUsuario();
      }
    );
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
            this.getForos();
          }
        );

      },
      error => console.log('NO SE ENCONTRÓ USUARIO')
    );
  }

}
