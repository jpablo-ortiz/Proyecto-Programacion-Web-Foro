import { Component, OnInit } from '@angular/core';
import { ForoService } from '../shared/foro.service';
import { Foro } from '../shared/Entidades/foro';

@Component({
  selector: 'app-foro-list',
  templateUrl: './foro-list.component.html',
  styleUrls: ['./foro-list.component.css']
})
export class ForoListComponent implements OnInit {

  public foros: Foro[];
  public clickedForo = new Foro(0, false, '');

  usuario = 'user';
  contrasena = 'contra';
  mensaje: string;
  sesionIniciada = false;

  result: any;

  constructor(private foroRepo: ForoService) { }

  ngOnInit(): void {
    this.getForos();
  }

  getForos(): void {
    this.foroRepo.getAllForos().subscribe(
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

}
