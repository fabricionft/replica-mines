package mines.mines.Controller;

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

    @PostMapping
    public ResponseEntity<?> salvarUsuario(@RequestBody UsuarioModel usuario){
        return  new ResponseEntity<>(converterEmDto(usuarioService.salvarUsuario(usuario)), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login/{email}/{senha}")
    public ResponseEntity<?> fazerLogin(@PathVariable String email,
                                        @PathVariable String senha){
        return  new ResponseEntity<>(converterEmDto(usuarioService.fazerLogin(email, senha)), HttpStatus.CREATED);
    }

    @PutMapping(path = "descontar/{codigo}/{valor}")
    public ResponseEntity<?> descontarSaldoDoUSuario(@PathVariable Long codigo,
                                                     @PathVariable Double valor){
        return new ResponseEntity<>(converterEmDto(usuarioService.descontarSaldo(codigo, valor)), HttpStatus.OK);
    }

    @PutMapping(path = "cashout/{codigo}/{valor}")
    public ResponseEntity<?> fazerCashOut(@PathVariable Long codigo,
                                          @PathVariable Double valor){
        return new ResponseEntity<>(converterEmDto(usuarioService.fazerCashOut(codigo, valor)), HttpStatus.OK);
    }
}
