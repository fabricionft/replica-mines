package mines.mines.adt.response;

import lombok.Getter;
import lombok.Setter;
import mines.mines.amo.ApostasModel;

import java.util.List;

@Getter
@Setter
public class ApostaResponseDTO {
    private List<ApostasModel> apostas;
}

