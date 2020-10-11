package co.edu.javeriana.myapp.server.myappserver.service;

import co.edu.javeriana.myapp.server.myappserver.exceptions.NotFoundException;
import co.edu.javeriana.myapp.server.myappserver.model.Comentario;
import co.edu.javeriana.myapp.server.myappserver.model.ComentarioRepository;
import co.edu.javeriana.myapp.server.myappserver.model.ForoRepository;
import co.edu.javeriana.myapp.server.myappserver.model.Tema;
import co.edu.javeriana.myapp.server.myappserver.model.Foro;
import co.edu.javeriana.myapp.server.myappserver.model.Usuario;
import co.edu.javeriana.myapp.server.myappserver.model.TemaRepository;
import co.edu.javeriana.myapp.server.myappserver.model.UsuarioRepository;

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
public class TemaService {

    @Autowired
    private TemaRepository repository;

    @Autowired
    private ComentarioRepository repositoryComentario;

    @Autowired
    private UsuarioRepository repositoryUsuario;

    @Autowired
    private ForoRepository repositoryForo;

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/temas")
    public Iterable<Tema> getTemas() {
        return repository.findAll();
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/temas/{id}")
    public Tema getTema(@PathVariable("id") Long temaId) {
        return repository.findById(temaId).orElseThrow(() -> new NotFoundException("Tema no encontrado"));
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PostMapping("/temas/f:{foroId}/u:{usuarioId}")
    public Tema createTema(@PathVariable("foroId") Long foroId, @PathVariable("usuarioId") Long usuarioId, @RequestBody Tema tema) {

        Tema nuevoTema = new Tema();

        Foro foroAlQuePertenece = repositoryForo.findById(foroId).get();
        Usuario usuarioAlQuePertenece = repositoryUsuario.findById(usuarioId).get();

        nuevoTema.setForoAlQuePertenece(foroAlQuePertenece);
        nuevoTema.setUsuarioAlQuePertenece(usuarioAlQuePertenece);

        nuevoTema.setContenido(tema.getContenido());
        nuevoTema.setFechaPublicacion(tema.getFechaPublicacion());
        nuevoTema.setRanking(tema.getRanking());
        nuevoTema.setTitulo(tema.getTitulo());

        return repository.save(nuevoTema);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/temas/{id}/comentarios")
    public Iterable<Comentario> getAllComentariosFromTema(@PathVariable("id") Long temaId) {
        if (repository.existsById(temaId)) {
            return repository.findById(temaId).get().getComentarios();
        } else {
            throw new NotFoundException("Tema no encontrado");
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PutMapping("/temas/{id}")
    Tema updateTema(@PathVariable Long id, @RequestBody Tema temaDatos) {
        Tema tema = getTema(id);
        tema.setTitulo(temaDatos.getTitulo());
        tema.setContenido(temaDatos.getContenido());

        return repository.save(tema);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PutMapping("/temas/i/{id}")
    Tema increaseRankingTema(@PathVariable Long id) {
        Tema tema = getTema(id);
        tema.setRanking(tema.getRanking() + 1);
        return repository.save(tema);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PutMapping("/temas/d/{id}")
    Tema decreaseRankingTema(@PathVariable Long id) {
        Tema tema = getTema(id);
        if (tema.getRanking() > 0) {
            tema.setRanking(tema.getRanking() - 1);
        }
        return repository.save(tema);

    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @DeleteMapping("/temas/{id}")
    void deleteTema(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new NotFoundException();
        }
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PostMapping("/temas/{id}/comentarios")
    Comentario createComentarioPrincipal(@PathVariable Long temaId, @RequestBody Comentario comentario) {
        Tema tema = repository.findById(temaId).get();
        tema.getComentarios().add(comentario);
        return repositoryComentario.save(comentario);
    }

}
