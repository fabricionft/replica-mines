package mines.mines.Controller;

import mines.mines.DTO.Request.UsuarioRequestDTO;
import mines.mines.DTO.Response.UsuarioResponseDTO;
import mines.mines.Model.UsuarioModel;
import mines.mines.Service.UsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

    private UsuarioModel converterRequestDTOEmUsuario(UsuarioRequestDTO usuarioRequestDTODTO){
        return  modelMapper.map(usuarioRequestDTODTO, UsuarioModel.class);
    }

    private UsuarioResponseDTO converterEmUsuarioResponseDTO(UsuarioModel usuario){
        return  modelMapper.map(usuario, UsuarioResponseDTO.class);
    }

    private List<UsuarioResponseDTO> converterListaEmDTO(List<UsuarioModel> usuarios){
        List<UsuarioResponseDTO> usuariosDTO = new ArrayList<>();
        for(UsuarioModel usuario: usuarios){
            usuariosDTO.add(converterEmUsuarioResponseDTO(usuario));
        }
        return  usuariosDTO;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UsuarioResponseDTO> listarUsuarios(){
        return  converterListaEmDTO(usuarioService.listarUsuarios());
    }

    @GetMapping(path = "/{username}")
    public ResponseEntity<?> buscarUsuarioPorId(@PathVariable String username){
        return  new ResponseEntity<>(converterEmUsuarioResponseDTO(usuarioService.buscarUsuarioPorUsername(username)), HttpStatus.OK);
    }

    @GetMapping(path = "/saldo/{codigo}")
    public ResponseEntity<?> buscarSaldoPorId(@PathVariable Long codigo){
        return  new ResponseEntity<>(usuarioService.buscarSaldoPorId(codigo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarUsuario(@RequestBody UsuarioRequestDTO usuarioRequestDTODTO){
        UsuarioModel usuario = usuarioService.salvarUsuario(converterRequestDTOEmUsuario(usuarioRequestDTODTO));
        return  new ResponseEntity<>(converterEmUsuarioResponseDTO(usuario), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login/{username}/{senha}")
    public ResponseEntity<?> fazerLogin(@PathVariable String username,
                                        @PathVariable String senha){
        return  new ResponseEntity<>(usuarioService.fazerLogin(username, senha), HttpStatus.CREATED);
    }

    @PutMapping("alterarTipo/{codigo}/{senha}")
    public ResponseEntity<?> alterarTipoUsuario(@PathVariable Long codigo,
                                                @PathVariable String senha){
        return  new ResponseEntity<>(converterEmUsuarioResponseDTO(usuarioService.alterarTipoDeUsuario(codigo, senha)), HttpStatus.OK);
    }

    @PutMapping(path = "/{codigo}/{valor}")
    public ResponseEntity<?> efetuarTransacao(@PathVariable Long codigo,
                                              @PathVariable Double valor){
        return new ResponseEntity<>(usuarioService.efetuarTransacao(codigo, valor), HttpStatus.OK);
    }

    @DeleteMapping("/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirUsuarioPorID(@PathVariable Long codigo){
        return new ResponseEntity<>(usuarioService.excluirUsuarioPorID(codigo), HttpStatus.OK);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirTodosUsuarios(){
        return new ResponseEntity<>(usuarioService.excluirTodosUsuarios(), HttpStatus.OK);
    }
}
