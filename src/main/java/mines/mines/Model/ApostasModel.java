package mines.mines.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class ApostasModel {

    public Long codigo;
    public String dataAposta;
    public Integer quantidadeBombas;
    public Double valor;
    public String retorno;
}
