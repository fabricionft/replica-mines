package mines.mines.DTO.Response;

import lombok.Getter;
import lombok.Setter;
import mines.mines.Model.ApostasModel;

import java.util.List;

@Getter
@Setter
public class ApostaResponseDTO {
    private List<ApostasModel> apostas;
}

