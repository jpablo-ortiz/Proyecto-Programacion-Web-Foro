package co.edu.javeriana.myapp.server.myappserver.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Foro {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private boolean moderador;

    @NotNull
    private String titulo;

    @OneToMany(mappedBy = "foroAlQuePertenece")
    @JsonIgnore
    private List<Tema> temas;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isModerador() {
        return this.moderador;
    }

    public boolean getModerador() {
        return this.moderador;
    }

    public void setModerador(boolean moderador) {
        this.moderador = moderador;
    }

    public String getTitulo() {
        return this.titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public List<Tema> getTemas() {
        return this.temas;
    }

    public void setTemas(List<Tema> temas) {
        this.temas = temas;
    }

    public Foro id(Long id) {
        this.id = id;
        return this;
    }

    public Foro moderador(boolean moderador) {
        this.moderador = moderador;
        return this;
    }

    public Foro titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public Foro temas(List<Tema> temas) {
        this.temas = temas;
        return this;
    }

}
