package co.edu.javeriana.myapp.server.myappserver.service;

import co.edu.javeriana.myapp.server.myappserver.exceptions.NotFoundException;
import co.edu.javeriana.myapp.server.myappserver.model.Foro;
import co.edu.javeriana.myapp.server.myappserver.model.ForoRepository;
import co.edu.javeriana.myapp.server.myappserver.model.Tema;
import co.edu.javeriana.myapp.server.myappserver.model.Usuario;
import co.edu.javeriana.myapp.server.myappserver.model.UsuarioRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class ForoService {

    @Autowired
    private ForoRepository repository;

    @Autowired
    private UsuarioRepository repositoryUsuario;

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/foros")
    public Iterable<Foro> getForos() {
        return repository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/foros/u:{usuarioId}")
    Foro createForo(@PathVariable Long usuarioId, @RequestBody Foro foro) {

        Foro nuevoForo = new Foro();
        Usuario usuarioAlQuePertenece = repositoryUsuario.findById(usuarioId).get();

        nuevoForo.setTitulo(foro.getTitulo());
        nuevoForo.setModerador(foro.getModerador());
        nuevoForo.setUsuarioAlQuePertenece(usuarioAlQuePertenece);

        return repository.save(nuevoForo);
    }

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/foros/{id}")
    public Foro getForo(@PathVariable("id") Long foroId) {
        return repository.findById(foroId).orElseThrow(() -> new NotFoundException("Foro no encontrado"));
    }



    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/foros/{id}/temas")
    public Iterable<Tema> getAllTemasFromForo(@PathVariable("id") Long foroId) {
        if (repository.existsById(foroId)) {
            return repository.findById(foroId).get().getTemas();
        } else {
            throw new NotFoundException("Foro no encontrado");
        }
    }

}
