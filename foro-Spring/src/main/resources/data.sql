-- Programa

insert into usuario(id, user, password, rol) values (-1, 'user', 'contra', 'ROLE_USER');
insert into usuario(id, user, password, rol) values (-2, 'mod', 'contra',  'ROLE_MOD');
insert into usuario(id, user, password, rol) values (-3, 'admin', 'contra','ROLE_ADMIN');

insert into foro (id, moderador, titulo) values (-1, true, 'Foro #1');
insert into foro (id, moderador, titulo) values (-2, false, 'Foro #2');

insert into tema (id, ranking, fecha_publicacion, titulo, contenido, foro_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-1, 2, '2000-01-21', 'Tema #1', 'Este es el Tema #1', -1, -1);
insert into tema (id, ranking, fecha_publicacion, titulo, contenido, foro_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-2, 0, '2007-01-21', 'Tema #2', 'Este es el Tema #2', -1, -2);
insert into tema (id, ranking, fecha_publicacion, titulo, contenido, foro_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-3, 5, '2020-08-02', 'Tema #3', 'Este es el Tema #3', -1, -2);
insert into tema (id, ranking, fecha_publicacion, titulo, contenido, foro_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-4, 2, '2005-10-15', 'Tema #4', 'Este es el Tema #4', -2, -2);

insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-1, 0, '2000-05-23', 'Este es el comentario #1', -1, NULL, -1);
insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-2, 0, '2007-01-21', 'Este es el comentario #2', NULL, -1, -1);
insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-3, 0, '2008-08-02', 'Este es el comentario #3', NULL, -1, -1);
insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-4, 0, '2010-05-23', 'Este es el comentario #4', NULL, -3, -3);
insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-5, 5, '2002-05-23', 'Este es el comentario #5', -1, NULL, -3);
insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-6, 0, '2005-10-15', 'Este es el comentario #6', -2, NULL, -3);
insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-7, 0, '2000-05-23', 'Este es el comentario #7', -4, NULL, -3);
insert into comentario (id, ranking, fecha, contenido, tema_al_que_pertenece_id, comentario_al_que_pertenece_id, usuario_al_que_pertenece_id) values (-8, 0, '2005-10-15', 'Este es el comentario #8', -4, NULL, -3);


/*
•	normales
•	moderadores
•	administradores

/foros
/foros/{id}
/foros/{id}/temas

/temas
/temas/{id}
/temas/{id}/comentarios

/comentarios/{id}/comentarios

*/