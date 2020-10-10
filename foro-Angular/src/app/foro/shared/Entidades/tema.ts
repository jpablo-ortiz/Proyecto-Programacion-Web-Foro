import { Comentario } from './comentario';

export class Tema {
  public id: number;
  public ranking: number;
  public fechaPublicacion: Date;
  public titulo: string;
  public contenido: string;
  public comentarios: Comentario[];

  constructor(id: number, ranking: number, fechaPublicacion: Date, titulo: string, contenido: string) {
    this.id = id;
    this.ranking = ranking;
    this.fechaPublicacion = fechaPublicacion;
    this.contenido = contenido;
    this.titulo = titulo;
    this.comentarios = [];
  }
}
