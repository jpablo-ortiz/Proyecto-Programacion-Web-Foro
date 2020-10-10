package co.edu.javeriana.myapp.server.myappserver.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Date;

@Entity
public class Tema {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Long ranking;

    @NotNull
    private Date fechaPublicacion;

    @NotNull
    private String titulo;

    private String contenido;

    @ManyToOne
    @NotNull
    private Foro foroAlQuePertenece;

    @ManyToOne
    @NotNull
    private Usuario usuarioAlQuePertenece;

    @OneToMany(mappedBy = "temaAlQuePertenece", orphanRemoval = true)
    @JsonIgnore
    private List<Comentario> comentarios;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRanking() {
        return this.ranking;
    }

    public void setRanking(Long ranking) {
        this.ranking = ranking;
    }

    public Date getFechaPublicacion() {
        return this.fechaPublicacion;
    }

    public void setFechaPublicacion(Date fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return this.contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Foro getForoAlQuePertenece() {
        return this.foroAlQuePertenece;
    }

    public void setForoAlQuePertenece(Foro foroAlQuePertenece) {
        this.foroAlQuePertenece = foroAlQuePertenece;
    }

    public List<Comentario> getComentarios() {
        return this.comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public Tema id(Long id) {
        this.id = id;
        return this;
    }

    public Tema ranking(Long ranking) {
        this.ranking = ranking;
        return this;
    }

    public Tema fechaPublicacion(Date fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
        return this;
    }

    public Tema titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public Tema contenido(String contenido) {
        this.contenido = contenido;
        return this;
    }

    public Tema foroAlQuePertenece(Foro foroAlQuePertenece) {
        this.foroAlQuePertenece = foroAlQuePertenece;
        return this;
    }

    public Tema comentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
        return this;
    }

    public Usuario getUsuarioAlQuePertenece() {
        return this.usuarioAlQuePertenece;
    }

    public void setUsuarioAlQuePertenece(Usuario usuarioAlQuePertenece) {
        this.usuarioAlQuePertenece = usuarioAlQuePertenece;
    }

    public Tema usuarioAlQuePertenece(Usuario usuarioAlQuePertenece) {
        this.usuarioAlQuePertenece = usuarioAlQuePertenece;
        return this;
    }

}
