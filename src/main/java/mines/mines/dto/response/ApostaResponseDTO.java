package mines.mines.dto.response;

import lombok.Getter;
import lombok.Setter;
import mines.mines.model.ApostasModel;

import java.util.List;

@Getter
@Setter
public class ApostaResponseDTO {
    private List<ApostasModel> apostas;
}

