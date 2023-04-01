package mines.mines.Service;

import mines.mines.DTO.Request.ApostaResquestDTO;
import mines.mines.Exceptions.RequestExcpetion;
import mines.mines.Model.ApostasModel;
import mines.mines.Model.UsuarioModel;
import mines.mines.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Optional;

@Service
public class ApostasService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public UsuarioModel listarApostasDeUmUsuario(Long codigo){
        return isUserbyCode(codigo);
    }

    public Boolean iniciarAposta(Long codigo, Double valor){
        UsuarioModel usuario = isUserbyCode(codigo);
        if(valor > usuario.getSaldo()) throw new RequestExcpetion("Você não possui saldo suficienteb para uma aposta desse valor!");
        if(valor < 1) throw new RequestExcpetion("É necessário que você aposte ao menos 1 real!");
        return  true;
    }

    public UsuarioModel concluirAposta(ApostaResquestDTO aposta){
        UsuarioModel usuario = isUserbyCode(aposta.getCodigo());

        if(aposta.getAcao().equals("cashout")) usuario.setSaldo(usuario.getSaldo() + aposta.getRetorno());
        else usuario.setSaldo(usuario.getSaldo() - aposta.getValor());

        salvarAposta(aposta);
        return usuarioRepository.save(usuario);
    }

    public void salvarAposta(ApostaResquestDTO aposta){
        UsuarioModel usuario = isUserbyCode(aposta.getCodigo());
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Calendar calendar = Calendar.getInstance();

        String retorno = (aposta.getAcao().equals("cashout")) ? "+ R$ "+aposta.getRetorno() : "- R$ "+aposta.getRetorno();

        ApostasModel novaAposta = new ApostasModel(
                aposta.getCodigo(),
                formatter.format(calendar.getTime()),
                aposta.getQuantidadeDeBombas(),
                aposta.getValor(),
                retorno
        );

        usuario.addApostas(novaAposta);
    }

    public String excluirApostasDeUmUsuario(Long codigo){
        UsuarioModel usuario = isUserbyCode(codigo);
        usuario.getApostas().clear();
        usuarioRepository.save(usuario);
        return "Seu histórico de apostas foi excluido!";
    }

    public String excluirAPostasDeTodosUsuarios() {
        for(UsuarioModel usuario: usuarioRepository.findAll()){
            usuario.getApostas().clear();
            usuarioRepository.save(usuario);
        }
        return "Todos históricos foram excluidos";
    }

    //Validações
    protected UsuarioModel isUserbyCode(Long codigo){
        Optional<UsuarioModel> usuario = usuarioRepository.buscarPorCodigo(codigo);
        if(usuario.isEmpty()) throw  new RequestExcpetion("USuário inexistente!");
        else return  usuario.get();
    }
}
