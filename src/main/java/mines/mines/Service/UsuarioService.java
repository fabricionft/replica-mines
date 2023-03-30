package mines.mines.Service;

import mines.mines.Exceptions.RequestExcpetion;
import mines.mines.Model.UsuarioModel;
import mines.mines.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<UsuarioModel> listarUsuarios(){
        return  usuarioRepository.findAll();
    }

    public Double buscarSaldoPorId(Long codigo){
        UsuarioModel usuario = isUserbyCode(codigo);
        return  usuario.getSaldo();
    }

    public Boolean iniciarJogo(Long codigo, double valor){
        UsuarioModel usuario = isUserbyCode(codigo);
        if(valor > usuario.getSaldo()) throw new RequestExcpetion("Você não possui saldo suficienteb para uma aposta desse valor!");
        if(valor < 1) throw new RequestExcpetion("É necessário que você aposte ao menos 1 real!");
        return  true;
    }

    public UsuarioModel salvarUsuario(UsuarioModel usuario){

        for(UsuarioModel user: usuarioRepository.findAll()){
            if(user.getUsuario().equals(usuario.getUsuario())) throw  new RequestExcpetion("Este usuário ja existe, por favor digite outro!");
        }

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return  usuarioRepository.save(usuario);
    }

    public UsuarioModel fazerLogin(String email, String senha){
        if(validarSenha(email, senha)) return isUserbyEmail(email);
        return  null;
    }

    public boolean validarSenha(String email,  String senha) {
        UsuarioModel usuario = isUserbyEmail(email);
        if(passwordEncoder.matches(senha, usuario.getSenha())) return  true;
        else throw  new RequestExcpetion("Credenciais incorretas!");
    }

    public UsuarioModel descontarSaldo(Long codigo, Double valor){
        UsuarioModel usuario = isUserbyCode(codigo);
        usuario.setSaldo(usuario.getSaldo() - valor);
        return usuarioRepository.save(usuario);
    }

    public UsuarioModel fazerCashOut(Long codigo, Double valorInicial, Double valorFinal){
        UsuarioModel usuario = isUserbyCode(codigo);
        usuario.setSaldo(usuario.getSaldo() + (valorFinal - valorInicial));
        return usuarioRepository.save(usuario);
    }

    public String excluirTodosUsuarios(){
        usuarioRepository.deleteAll();;
        return "Todos usuários foram excluidos com sucesso!";
    }

    //Validações
    public UsuarioModel isUserbyEmail(String email){
        Optional<UsuarioModel> usuario = usuarioRepository.buscarPorEmail(email);
        if(usuario.isEmpty()) throw  new RequestExcpetion("USuário inexistente!");
        else return  usuario.get();
    }

    public UsuarioModel isUserbyCode(Long codigo){
        Optional<UsuarioModel> usuario = usuarioRepository.buscarPorCodigo(codigo);
        if(usuario.isEmpty()) throw  new RequestExcpetion("USuário inexistente!");
        else return  usuario.get();
    }
}
