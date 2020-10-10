import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin } from 'rxjs';
import { Comentario } from './Entidades/comentario';
import { Foro } from './Entidades/foro';
import { Tema } from './Entidades/tema';
import { Usuario } from './Entidades/usuario';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ForoService {

  public httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }

  private get<T>(url, httpHeader): Observable<T> {
    console.log('get', url);
    return this.http.get<T>(url, httpHeader).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  private post<T>(url, data, httpHeader): Observable<T> {
    console.log('post', url);
    return this.http.post<T>(url, data, httpHeader).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  private put<T>(url, data, httpHeader): Observable<T> {
    console.log('put', url);
    return this.http.put<T>(url, data, httpHeader).pipe(
      // retry(5),
      catchError(this.handleError)
    );
  }

  /**********/
  /* FOROS */
  /**********/

  public getAllForos() {
    const url = environment.foroServiceBaseUrl + '/foros';
    return this.get<Foro[]>(url, { withCredentials: true });
  }

  public getForo(foroId: number) {
    const url = environment.foroServiceBaseUrl + '/foros/' + foroId;
    return this.get<Foro>(url, { withCredentials: true });
  }

  public getAllTemasFromForo(foroId: number) {
    const url = environment.foroServiceBaseUrl + '/foros/' + foroId + '/temas';
    return this.get<Tema[]>(url, { withCredentials: true });
  }

  /*********/
  /* TEMAS */
  /*********/

  public getAllTemas() {
    const url = environment.foroServiceBaseUrl + '/temas';
    return this.get<Tema[]>(url, { withCredentials: true });
  }

  public getTema(temaId: number) {
    const url = environment.foroServiceBaseUrl + '/temas/' + temaId;
    return this.get<Tema>(url, { withCredentials: true });
  }

  public increaseRankingTema(tema: Tema) {
    const url = environment.foroServiceBaseUrl + '/temas/i/' + tema.id;
    return this.put(url, {}, { withCredentials: true });
  }

  public decreaseRankingTema(tema: Tema) {
    const url = environment.foroServiceBaseUrl + '/temas/d/' + tema.id;
    return this.put(url, {}, { withCredentials: true });
  }

  public createTema(tema: Tema, foroAlQuePertenece: Foro, usuarioAlQuePertenece: Usuario) {
    const url = environment.foroServiceBaseUrl + '/temas/f:' + foroAlQuePertenece.id + '/u:' + usuarioAlQuePertenece.id;
    return this.post(url,
      {
        ranking: 0,
        fechaPublicacion: Date.now(),
        titulo: tema.titulo,
        contenido: tema.contenido
      },
      { withCredentials: true });
  }

  public updateTema(tema: Tema) {
    const url = environment.foroServiceBaseUrl + '/temas/' + tema.id;
    return this.put(url,
      {
        titulo: tema.titulo,
        contenido: tema.contenido
      },
      { withCredentials: true });
  }

  public deleteTema(tema: Tema) {
    const url = environment.foroServiceBaseUrl + '/temas/' + tema.id;
    return this.http.delete(url, { withCredentials: true });
  }

  /***********/
  /* Usuario */
  /***********/

  public getUsuarioBy(usuario: string, contra: string) {
    const url = environment.foroServiceBaseUrl + '/usuarios/' + usuario + '/' + contra;
    return this.get<Usuario>(url, { withCredentials: true });
  }

  public getAllComentariosFromUsuario(usuarioId: number) {
    const url = environment.foroServiceBaseUrl + '/usuario/' + usuarioId + '/comentarios/';
    return this.get<Comentario[]>(url, { withCredentials: true });
  }

  public getAllTemasFromUsuario(usuarioId: number) {
    const url = environment.foroServiceBaseUrl + '/usuario/' + usuarioId + '/temas/';
    return this.get<Tema[]>(url, { withCredentials: true });
  }

  /***************/
  /* Comentarios */
  /***************/

  public getAllComentariosFromTema(temaId: number) {
    const url = environment.foroServiceBaseUrl + '/temas/' + temaId + '/comentarios';
    return this.get<Comentario[]>(url, { withCredentials: true });
  }

  public getAllComentariosHijosFromComentario(comentarioId: number) {
    const url = environment.foroServiceBaseUrl + '/comentarios/' + comentarioId + '/comentarios';
    return this.get<Comentario[]>(url, { withCredentials: true });
  }

  public getComentario(comentarioId: number) {
    const url = environment.foroServiceBaseUrl + '/comentarios/' + comentarioId;
    return this.get<Comentario>(url, { withCredentials: true });
  }

  public increaseRankingComentario(comentario: Comentario) {
    const url = environment.foroServiceBaseUrl + '/comentarios/i/' + comentario.id;
    return this.put(url, {}, { withCredentials: true });
  }

  public decreaseRankingComentario(comentario: Comentario) {
    const url = environment.foroServiceBaseUrl + '/comentarios/d/' + comentario.id;
    return this.put(url, {}, { withCredentials: true });
  }

  public createComentarioPrincipal(contenidoC: string, temaAlQuePertenece: Tema, usuarioAlQuePertenece: Usuario) {
    const url = environment.foroServiceBaseUrl + '/comentarios/t:' + temaAlQuePertenece.id + '/u:' + usuarioAlQuePertenece.id;
    return this.post(url,
      {
        ranking: 0,
        fecha: Date.now(),
        contenido: contenidoC
      },
      { withCredentials: true });
  }

  public createComentarioSecundario(contenidoC: string, comentarioAlQuePertenece: Comentario, usuarioAlQuePertenece: Usuario) {
    const url = environment.foroServiceBaseUrl + '/comentarios/c:' + comentarioAlQuePertenece.id + '/u:' + usuarioAlQuePertenece.id;
    return this.post(url,
      {
        ranking: 0,
        fecha: Date.now(),
        contenido: contenidoC
      },
      { withCredentials: true });
  }

  public updateComentario(comentario: Comentario) {
    const url = environment.foroServiceBaseUrl + '/comentarios/' + comentario.id;
    return this.put(url,
      {
        contenido: comentario.contenido,
      },
      { withCredentials: true });
  }

  public deleteComentario(comentario: Comentario) {
    const url = environment.foroServiceBaseUrl + '/comentarios/' + comentario.id;
    return this.http.delete(url, { withCredentials: true });
  }

  /*********/
  /* Login */
  /*********/

  login(usuario: string, contrasena: string) {
    const formHeaders = new HttpHeaders();
    formHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const formParams = new HttpParams()
      .set('username', usuario)
      .set('password', contrasena);

    return this.http.post('http://localhost:8080/login', null, {
      headers: formHeaders,
      params: formParams,
      withCredentials: true
    });
  }

  logout() {
    return this.http.post('http://localhost:8080/logout', '',
      { withCredentials: true });
  }

}
