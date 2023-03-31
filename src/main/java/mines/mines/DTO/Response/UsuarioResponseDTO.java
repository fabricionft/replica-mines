package mines.mines.DTO.Response;

import lombok.Getter;
import lombok.Setter;
import mines.mines.Model.ApostasModel;

import java.util.List;

@Getter
@Setter
public class UsuarioResponseDTO {

    private Long codigo;
    private String usuario;
    private Double saldo;
    private List<ApostasModel> apostas;
}