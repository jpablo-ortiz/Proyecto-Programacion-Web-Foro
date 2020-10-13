package co.edu.javeriana.myapp.server.myappserver.service;

import co.edu.javeriana.myapp.server.myappserver.exceptions.NotFoundException;
import co.edu.javeriana.myapp.server.myappserver.model.Comentario;
import co.edu.javeriana.myapp.server.myappserver.model.Tema;
import co.edu.javeriana.myapp.server.myappserver.model.Usuario;
import co.edu.javeriana.myapp.server.myappserver.model.UsuarioRepository;
import co.edu.javeriana.myapp.server.myappserver.model.Foro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@CrossOrigin(origins = "*")
public class UsuarioService {

    @Autowired
    private UsuarioRepository repository;

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/usuarios/{user}/{password}")
    public Usuario getComentario(@PathVariable("user") String user, @PathVariable("password") String password) {
        Usuario u = repository.findByUserAndPassword(user, password);
        return repository.findById(u.getId()).orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/usuario/{id}/temas")
    public Iterable<Tema> getTemasByUsuario(@PathVariable("id") Long usuarioId) {
        if (repository.existsById(usuarioId)) {
            return repository.findById(usuarioId).get().getTemas();
        } else {
            throw new NotFoundException("Temas no encontrados");
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/usuario/{id}/foros")
    public Iterable<Foro> getAllForosFromUsuario(@PathVariable("id") Long usuarioId) {
        if (repository.existsById(usuarioId)) {
            return repository.findById(usuarioId).get().getForos();
        } else {
            throw new NotFoundException("Foro no encontrado");
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/usuario/{id}/comentarios")
    public Iterable<Comentario> getComentariosByUsuario(@PathVariable("id") Long usuarioId) {
        if (repository.existsById(usuarioId)) {
            return repository.findById(usuarioId).get().getComentarios();
        } else {
            throw new NotFoundException("Temas no encontrados");
        }
    }

}