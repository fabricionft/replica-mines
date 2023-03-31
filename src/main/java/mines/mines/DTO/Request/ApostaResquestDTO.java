package mines.mines.DTO.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApostaResquestDTO {
    private Long codigo;
    private String acao;
    private Integer quantidadeDeBombas;
    private Double valor;
    private Double retorno;
}
