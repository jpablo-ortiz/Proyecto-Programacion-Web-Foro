import { Tema } from './tema';

export class Foro {
  public id: number;
  public moderador: boolean;
  public titulo: string;
  public temas: Tema[];

  constructor(id: number, moderador: boolean, titulo: string) {
    this.id = id;
    this.moderador = moderador;
    this.titulo = titulo;
    this.temas = [];
  }
}
