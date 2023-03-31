package mines.mines.Repository;

import mines.mines.Model.UsuarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<UsuarioModel, Long> {

    @Query(value = "select * from usuarios where usuario = ?", nativeQuery = true)
    Optional<UsuarioModel> buscarPorEmail(String email);

    @Query(value = "select * from usuarios where codigo = ?", nativeQuery = true)
    Optional<UsuarioModel> buscarPorCodigo(Long codigo);
}
