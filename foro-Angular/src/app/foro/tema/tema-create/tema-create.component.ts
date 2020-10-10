import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foro } from '../../shared/Entidades/foro';
import { Tema } from '../../shared/Entidades/tema';
import { Usuario } from '../../shared/Entidades/usuario';
import { ForoService } from '../../shared/foro.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-tema-create',
  templateUrl: './tema-create.component.html',
  styleUrls: ['./tema-create.component.css']
})
export class TemaCreateComponent implements OnInit {
  @ViewChild('createForm', { static: true }) createForm;

  submitted = false;

  tema: Tema = new Tema(
    undefined,
    0,
    undefined,
    undefined,
    undefined
  );

  errorMessage = '';
  id: number;
  pass: boolean;
  public foro: Foro;
  public usuarioActual: Usuario;

  constructor(private ForoRepo: ForoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.ForoRepo.getForo(this.id).subscribe(
      result => this.foro = result
    );
    this.usuarioActual = JSON.parse(sessionStorage.getItem('user'));
  }

  create() {
    this.submitted = true;
    this.ForoRepo.createTema(this.tema, this.foro, this.usuarioActual).subscribe(
      result => {
        console.log(result);
        this.actualizarUsuario();
        this.router.navigate(['/foro/foro-view', this.foro.id]);
      },
      error => {
        console.error(error);
        this.errorMessage = error.toString();
        this.submitted = false;
      }
    );
  }

  cancel() {
    this.router.navigate(['/foro/foro-view', this.foro.id]);
  }

  get canSubmit() {
    return this.createForm.form.valid && !this.submitted;
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
            )
          });

        results.subscribe(
          () => {
            this.router.navigate(['/foro/foro-view', this.foro.id]);
          }
        );

      },
      error => console.log('NO SE ENCONTRÓ USUARIO')
    );
  }

}
