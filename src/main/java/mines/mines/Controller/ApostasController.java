package mines.mines.Controller;

import mines.mines.DTO.Request.ApostaResquestDTO;
import mines.mines.DTO.Response.ApostaResponseDTO;
import mines.mines.DTO.Response.UsuarioResponseDTO;
import mines.mines.Model.UsuarioModel;
import mines.mines.Service.ApostasService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/aposta")
public class ApostasController {

    @Autowired
    private ApostasService apostasService;

    @Autowired
    private ModelMapper modelMapper;

    public ApostaResponseDTO converterEmApostaResponseDTO(UsuarioModel usuario){
        return  modelMapper.map(usuario, ApostaResponseDTO.class);
    }

    public UsuarioResponseDTO converterEmUsuarioResponseDTO(UsuarioModel usuario){
        return modelMapper.map(usuario, UsuarioResponseDTO.class);
    }


    @GetMapping("/{codigo}")
    public ResponseEntity<?> listarApostasDeUmUsuario(@PathVariable Long codigo){
        return new ResponseEntity<>(converterEmApostaResponseDTO(apostasService.listarApostasDeUmUsuario(codigo)), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}/{valor}")
    public ResponseEntity<?> iniciarJogo(@PathVariable Long codigo,
                                      @PathVariable Double valor){
        return new ResponseEntity<>(apostasService.iniciarAposta(codigo, valor), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> concluirAposta(@RequestBody ApostaResquestDTO aposta){
        return new ResponseEntity<>(converterEmUsuarioResponseDTO(apostasService.concluirAposta(aposta)), HttpStatus.OK);
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<?> excluirHistorico(@PathVariable Long codigo){
        return new ResponseEntity<>(apostasService.excluirApostasDeUmUsuario(codigo), HttpStatus.CREATED);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirTodosHistoricos(){
        return new ResponseEntity<>(apostasService.excluirAPostasDeTodosUsuarios(), HttpStatus.OK);
    }
}
