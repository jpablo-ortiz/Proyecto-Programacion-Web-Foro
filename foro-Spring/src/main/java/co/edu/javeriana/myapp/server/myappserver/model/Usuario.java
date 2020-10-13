package co.edu.javeriana.myapp.server.myappserver.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Usuario {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String user;

    @NotNull
    private String password;

    @NotNull
    private String rol;

    @OneToMany(mappedBy = "usuarioAlQuePertenece")
    @JsonIgnore
    private List<Tema> temas;

    @OneToMany(mappedBy = "usuarioAlQuePertenece")
    @JsonIgnore
    private List<Comentario> comentarios;

    @OneToMany(mappedBy = "usuarioAlQuePertenece")
    @JsonIgnore
    private List<Foro> foros;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUser() {
        return this.user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Tema> getTemas() {
        return this.temas;
    }

    public void setTemas(List<Tema> temas) {
        this.temas = temas;
    }

    public List<Comentario> getComentarios() {
        return this.comentarios;
    }

    public void setComentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
    }

    public Usuario id(Long id) {
        this.id = id;
        return this;
    }

    public Usuario user(String user) {
        this.user = user;
        return this;
    }

    public Usuario password(String password) {
        this.password = password;
        return this;
    }

    public Usuario temas(List<Tema> temas) {
        this.temas = temas;
        return this;
    }

    public Usuario comentarios(List<Comentario> comentarios) {
        this.comentarios = comentarios;
        return this;
    }

    public String getRol() {
        return this.rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Usuario rol(String rol) {
        this.rol = rol;
        return this;
    }

    public List<Foro> getForos() {
        return this.foros;
    }

    public void setForos(List<Foro> foros) {
        this.foros = foros;
    }

    public Usuario foros(List<Foro> foros) {
        this.foros = foros;
        return this;
    }

}
