package mines.mines.Service;

import mines.mines.DTO.Request.ApostaResquestDTO;
import mines.mines.Model.ApostasModel;
import mines.mines.Model.UsuarioModel;
import mines.mines.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;

@Service
public class ApostasService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    public UsuarioModel listarApostasDeUmUsuario(Long codigo){
        return usuarioService.isUserbyCode(codigo);
    }

    public String excluirApostasDeUmUsuario(Long codigo){
        UsuarioModel usuario = usuarioService.isUserbyCode(codigo);
        usuario.getApostas().clear();
        usuarioRepository.save(usuario);
        return "Seu histórico de apostas foi excluido!";
    }
}
