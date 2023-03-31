package mines.mines.Controller;

import mines.mines.DTO.Request.ApostaResquestDTO;
import mines.mines.DTO.Response.UsuarioResponseDTO;
import mines.mines.Model.UsuarioModel;
import mines.mines.Service.UsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ModelMapper modelMapper;

    private UsuarioResponseDTO converterEmDto(UsuarioModel usuario){
        return  modelMapper.map(usuario, UsuarioResponseDTO.class);
    }

    private List<UsuarioResponseDTO> converterListaEmDTO(List<UsuarioModel> usuarios){
        List<UsuarioResponseDTO> usuariosDTO = new ArrayList<>();
        for(UsuarioModel usuario: usuarios){
            usuariosDTO.add(converterEmDto(usuario));
        }
        return  usuariosDTO;
    }

    @GetMapping
    public List<UsuarioResponseDTO> listarUsuarios(){
        return  converterListaEmDTO(usuarioService.listarUsuarios());
    }

    @GetMapping(path = "/saldo/{codigo}")
    public ResponseEntity<?> buscarSaldoPorId(@PathVariable Long codigo){
        return  new ResponseEntity<>(usuarioService.buscarSaldoPorId(codigo), HttpStatus.OK);
    }

    @GetMapping(path = "/iniciar/{codigo}/{valor}")
    public ResponseEntity iniciarJogo(@PathVariable Long codigo,
                                      @PathVariable double valor){
        return new ResponseEntity<>(usuarioService.iniciarJogo(codigo, valor), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarUsuario(@RequestBody UsuarioModel usuario){
        return  new ResponseEntity<>(converterEmDto(usuarioService.salvarUsuario(usuario)), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login/{email}/{senha}")
    public ResponseEntity<?> fazerLogin(@PathVariable String email,
                                        @PathVariable String senha){
        return  new ResponseEntity<>(converterEmDto(usuarioService.fazerLogin(email, senha)), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<?> concluirAposta(@RequestBody ApostaResquestDTO aposta){
        return new ResponseEntity<>(converterEmDto(usuarioService.concluirAposta(aposta)), HttpStatus.OK);
    }

    @PutMapping(path = "/{codigo}/{valor}")
    public ResponseEntity<?> efetuarTransacao(@PathVariable Long codigo,
                                              @PathVariable Double valor){
        return new ResponseEntity<>(usuarioService.efetuarTransacao(codigo, valor), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> excluirTodosUsuarios(){
        return new ResponseEntity<>(usuarioService.excluirTodosUsuarios(), HttpStatus.OK);
    }
}
