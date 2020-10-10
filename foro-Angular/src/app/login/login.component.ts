import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForoService } from '../foro/shared/foro.service';
import { MatButtonModule } from '@angular/material/button';
import { Usuario } from '../foro/shared/Entidades/usuario';
import { verifyHostBindings } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public usuarioActual: Usuario;

  public usuario = 'user';
  public contrasena = 'contra';
  public sesionIniciada = false;

  public mensaje: string;
  public mensaje2: string;

  constructor(private ForoRepo: ForoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  entrar() {
    this.sesionIniciada = this.isAuth();
    console.log(this.sesionIniciada);

    if (this.sesionIniciada) {
      this.mensaje = 'Error: Ya hay una sesión iniciada';
    }
    else {
      sessionStorage.setItem('Auth', 'true');
      this.ForoRepo.login(this.usuario, this.contrasena).toPromise().then(
        result => {
          this.mensaje = 'Inicio de sesion correcto';
          this.obtenerUsuario();
        },
        error => this.mensaje = 'Nombre de usario o Contraseña Incorrectos, por favor intente nuevamente'
      );
    }
  }

  obtenerUsuario() {
    this.ForoRepo.getUsuarioBy(this.usuario, this.contrasena).toPromise().then(
      result => {
        this.usuarioActual = result;

        this.ForoRepo.getAllComentariosFromUsuario(this.usuarioActual.id).toPromise().then(
          data => {
            this.usuarioActual.comentarios = data;
            sessionStorage.setItem('user', JSON.stringify(this.usuarioActual));
          },
          error => console.log('Error Obteniendo comentarios del usuario')
        );

        this.ForoRepo.getAllTemasFromUsuario(this.usuarioActual.id).toPromise().then(
          data => {
            this.usuarioActual.temas = data;
            sessionStorage.setItem('user', JSON.stringify(this.usuarioActual));
          },
          error => console.log('Error Obteniendo temas del usuario')
        );

      },
      error => console.log('NO SE ENCONTRÓ USUARIO')
    );
    // this.mensaje2 = JSON.parse(sessionStorage.getItem('user'));
    this.mensaje2 = sessionStorage.getItem('user');
  }

  salir() {
    this.sesionIniciada = this.isAuth();
    console.log(this.sesionIniciada);

    if (this.sesionIniciada) {
      sessionStorage.setItem('Auth', 'false');
      this.ForoRepo.logout().toPromise().then(
        data => {
          // tslint:disable-next-line: no-unused-expression
          sessionStorage.clear;
          this.mensaje = 'Sesion cerrada correctamente';
        },
        error => this.mensaje = 'Error'
      );
    }
    else {
      this.mensaje = 'Error: No hay una sesion abierta';
    }
  }

  isAuth(): boolean {
    if (sessionStorage.getItem('Auth') != null && sessionStorage.getItem('Auth') === 'true') {
      return true;
    }
    else {
      return false;
    }
  }

}
