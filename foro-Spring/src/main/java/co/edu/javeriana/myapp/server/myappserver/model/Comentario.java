package co.edu.javeriana.myapp.server.myappserver.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comentario {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Long ranking;

    @NotNull
    private Date fecha;
    @NotNull
    private String contenido;

    @ManyToOne
    private Tema temaAlQuePertenece;

    @ManyToOne
    private Comentario comentarioAlQuePertenece;

    @ManyToOne
    @NotNull
    private Usuario usuarioAlQuePertenece;

    @OneToMany(mappedBy = "comentarioAlQuePertenece", orphanRemoval = true)
    @JsonIgnore
    private List<Comentario> comentariosHijos;

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

    public Date getFecha() {
        return this.fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getContenido() {
        return this.contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public Tema getTemaAlQuePertenece() {
        return this.temaAlQuePertenece;
    }

    public void setTemaAlQuePertenece(Tema temaAlQuePertenece) {
        this.temaAlQuePertenece = temaAlQuePertenece;
    }

    public Comentario getComentarioAlQuePertenece() {
        return this.comentarioAlQuePertenece;
    }

    public void setComentarioAlQuePertenece(Comentario comentarioAlQuePertenece) {
        this.comentarioAlQuePertenece = comentarioAlQuePertenece;
    }

    public List<Comentario> getComentariosHijos() {
        return this.comentariosHijos;
    }

    public void setComentariosHijos(List<Comentario> comentariosHijos) {
        this.comentariosHijos = comentariosHijos;
    }

    public Comentario id(Long id) {
        this.id = id;
        return this;
    }

    public Comentario ranking(Long ranking) {
        this.ranking = ranking;
        return this;
    }

    public Comentario fecha(Date fecha) {
        this.fecha = fecha;
        return this;
    }

    public Comentario contenido(String contenido) {
        this.contenido = contenido;
        return this;
    }

    public Comentario temaAlQuePertenece(Tema temaAlQuePertenece) {
        this.temaAlQuePertenece = temaAlQuePertenece;
        return this;
    }

    public Comentario comentarioAlQuePertenece(Comentario comentarioAlQuePertenece) {
        this.comentarioAlQuePertenece = comentarioAlQuePertenece;
        return this;
    }

    public Comentario comentariosHijos(List<Comentario> comentariosHijos) {
        this.comentariosHijos = comentariosHijos;
        return this;
    }

    public Usuario getUsuarioAlQuePertenece() {
        return this.usuarioAlQuePertenece;
    }

    public void setUsuarioAlQuePertenece(Usuario usuarioAlQuePertenece) {
        this.usuarioAlQuePertenece = usuarioAlQuePertenece;
    }

    public Comentario usuarioAlQuePertenece(Usuario usuarioAlQuePertenece) {
        this.usuarioAlQuePertenece = usuarioAlQuePertenece;
        return this;
    }

}