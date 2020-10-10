package co.edu.javeriana.myapp.server.myappserver.service;

import co.edu.javeriana.myapp.server.myappserver.exceptions.NotFoundException;
import co.edu.javeriana.myapp.server.myappserver.model.Comentario;
import co.edu.javeriana.myapp.server.myappserver.model.ComentarioRepository;
import co.edu.javeriana.myapp.server.myappserver.model.Usuario;
import co.edu.javeriana.myapp.server.myappserver.model.UsuarioRepository;
import co.edu.javeriana.myapp.server.myappserver.model.Tema;
import co.edu.javeriana.myapp.server.myappserver.model.TemaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ComentarioService {

    @Autowired
    private ComentarioRepository repository;

    @Autowired
    private TemaRepository repositoryTema;

    @Autowired
    private UsuarioRepository repositoryUsuario;

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/comentarios")
    public Iterable<Comentario> getComentarios() {
        return repository.findAll();
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/comentarios/{id}")
    public Comentario getComentario(@PathVariable("id") Long comentarioId) {
        return repository.findById(comentarioId).orElseThrow(() -> new NotFoundException("Comentario no encontrado"));
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/comentarios/{id}/comentarios")
    public Iterable<Comentario> getAllComentariosFromComentario(@PathVariable("id") Long comentarioId) {
        if (repository.existsById(comentarioId)) {
            return repository.findById(comentarioId).get().getComentariosHijos();
        } else {
            throw new NotFoundException("Comentario no encontrado");
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PostMapping("/comentarios/c:{comentarioId}/u:{usuarioId}")
    Comentario createComentarioSecundario(@PathVariable("comentarioId") Long comentarioId, @PathVariable("usuarioId") Long usuarioId, @RequestBody Comentario comentario) {
        
        Comentario comentarioAlQuePertenece = repository.findById(comentarioId).get();
        Usuario usuarioAlQuePertenece = repositoryUsuario.findById(usuarioId).get();

        Comentario nuevoComentario = new Comentario();

        nuevoComentario.setComentarioAlQuePertenece(comentarioAlQuePertenece);
        nuevoComentario.setUsuarioAlQuePertenece(usuarioAlQuePertenece);

        nuevoComentario.setContenido(comentario.getContenido());
        nuevoComentario.setFecha(comentario.getFecha());
        nuevoComentario.setRanking(comentario.getRanking());
        
        return repository.save(nuevoComentario);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PostMapping("/comentarios/t:{temaId}/u:{usuarioId}")
    Comentario createComentarioPrincipal(@PathVariable("temaId") Long temaId, @PathVariable("usuarioId") Long usuarioId, @RequestBody Comentario comentario) {
        
        Tema temaAlQuePertenece = repositoryTema.findById(temaId).get();
        Usuario usuarioAlQuePertenece = repositoryUsuario.findById(usuarioId).get();

        Comentario nuevoComentario = new Comentario();

        nuevoComentario.setTemaAlQuePertenece(temaAlQuePertenece);
        nuevoComentario.setUsuarioAlQuePertenece(usuarioAlQuePertenece);

        nuevoComentario.setContenido(comentario.getContenido());
        nuevoComentario.setFecha(comentario.getFecha());
        nuevoComentario.setRanking(comentario.getRanking());
        
        return repository.save(nuevoComentario);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PutMapping("/comentarios/{id}")
    Comentario updateComentario(@PathVariable Long id, @RequestBody Comentario comentarioDatos) {
        Comentario comentario = getComentario(id);
        comentario.setContenido(comentarioDatos.getContenido());

        return repository.save(comentario);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PutMapping("/comentarios/i/{id}")
    Comentario increaseRankingComentario(@PathVariable Long id) {
        Comentario comentario = getComentario(id);
        comentario.setRanking(comentario.getRanking() + 1);
        return repository.save(comentario);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PutMapping("/comentarios/d/{id}")
    Comentario decreaseRankingComentario(@PathVariable Long id) {
        Comentario comentario = getComentario(id);
        if (comentario.getRanking() > 0) {
            comentario.setRanking(comentario.getRanking() - 1);
        }
        return repository.save(comentario);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @DeleteMapping("/comentarios/{id}")
    void deleteComentario(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }

}
