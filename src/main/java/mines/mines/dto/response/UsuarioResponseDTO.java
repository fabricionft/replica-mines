package mines.mines.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UsuarioResponseDTO {
    private Long codigo;
    private Boolean admin;
    private String usuario;
    private Double saldo;
}
