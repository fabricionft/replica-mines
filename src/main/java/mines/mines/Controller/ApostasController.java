package mines.mines.Controller;

import mines.mines.DTO.Request.ApostaResquestDTO;
import mines.mines.DTO.Response.ApostaResponseDTO;
import mines.mines.Model.UsuarioModel;
import mines.mines.Service.ApostasService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/aposta")
public class ApostasController {

    @Autowired
    private ApostasService apostasService;

    @Autowired
    private ModelMapper modelMapper;

    public ApostaResponseDTO converterEntidadeEmDTO(UsuarioModel usuario){
        return  modelMapper.map(usuario, ApostaResponseDTO.class);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<?> listarApostasDeUmUsuario(@PathVariable Long codigo){
        return new ResponseEntity<>(converterEntidadeEmDTO(apostasService.listarApostasDeUmUsuario(codigo)), HttpStatus.OK);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<?> salvarAposta(@PathVariable Long codigo){
        return new ResponseEntity<>(apostasService.excluirApostasDeUmUsuario(codigo), HttpStatus.CREATED);
    }
}
