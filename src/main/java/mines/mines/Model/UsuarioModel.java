package mines.mines.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Table(name = "usuarios")
@Entity
public class UsuarioModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long codigo;

    private String usuario;
    private String senha;
    private Double saldo = 100.0;

    @ElementCollection
    private List<ApostasModel> apostas = null;

    public void addApostas(ApostasModel aposta) {
        this.apostas.add(aposta);
    }
}
