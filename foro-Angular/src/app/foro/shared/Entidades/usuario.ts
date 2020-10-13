import { Comentario } from './comentario';
import { Foro } from './foro';
import { Tema } from './tema';

export class Usuario {

  public id: number;
  public user: string;
  public password: string;
  public rol: string;
  public temas: Tema[];
  public comentarios: Comentario[];
  public foros: Foro[];

  constructor(id: number, user: string, password: string, rol: string) {
    this.id = id;
    this.user = user;
    this.password = password;
    this.rol = rol;
    this.temas = [];
    this.comentarios = [];
    this.foros = [];
  }

}
