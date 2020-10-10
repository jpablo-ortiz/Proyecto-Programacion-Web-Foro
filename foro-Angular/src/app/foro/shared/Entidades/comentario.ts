export class Comentario {
  public id: number;
  public ranking: number;
  public fecha: Date;
  public contenido: string;
  public comentariosHijos: Comentario[];

  constructor(id: number, ranking: number, fecha: Date, contenido: string) {
    this.id = id;
    this.ranking = ranking;
    this.fecha = fecha;
    this.contenido = contenido;
    this.comentariosHijos = [];
  }

}
