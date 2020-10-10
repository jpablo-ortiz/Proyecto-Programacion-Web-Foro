package co.edu.javeriana.myapp.server.myappserver.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByUserAndPassword(String user, String password);
}
