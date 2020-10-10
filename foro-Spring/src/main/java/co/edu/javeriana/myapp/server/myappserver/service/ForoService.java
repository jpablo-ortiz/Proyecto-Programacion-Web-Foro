package co.edu.javeriana.myapp.server.myappserver.service;

import co.edu.javeriana.myapp.server.myappserver.exceptions.NotFoundException;
import co.edu.javeriana.myapp.server.myappserver.model.Foro;
import co.edu.javeriana.myapp.server.myappserver.model.ForoRepository;
import co.edu.javeriana.myapp.server.myappserver.model.Tema;
import co.edu.javeriana.myapp.server.myappserver.model.TemaRepository;

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
    private TemaRepository repositoryTema;

    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @GetMapping("/foros")
    public Iterable<Foro> getForos() {
        return repository.findAll();
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
    
    @PreAuthorize("hasRole('USER') or hasRole('MOD') or hasRole('ADMIN')")
    @PostMapping("/foros/{id}/temas")
    Tema createTema(@PathVariable Long foroId, @RequestBody Tema tema) {
        Foro foro = repository.findById(foroId).get();
        foro.getTemas().add(tema);
        return repositoryTema.save(tema);
    }

}
