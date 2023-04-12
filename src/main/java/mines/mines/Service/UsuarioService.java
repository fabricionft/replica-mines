package mines.mines.Service;

import mines.mines.DTO.Response.LoginResponseDTO;
import mines.mines.Exceptions.RequestExcpetion;
import mines.mines.Model.UsuarioModel;
import mines.mines.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    @Autowired
    private TokenService tokenService;

    @Value("${senha.sistema}")
    private String senhaSistema;


    public List<UsuarioModel> listarUsuarios(){
        return  usuarioRepository.findAll();
    }

    public UsuarioModel buscarUsuarioPorUsername(String username){
        return isUserbyUsername(username);
    }

    public Double buscarSaldoPorId(Long codigo){
        UsuarioModel usuario = isUserbyCode(codigo);
        return  usuario.getSaldo();
    }

    public UsuarioModel salvarUsuario(UsuarioModel usuario){
        if(usuarioRepository.buscarPorUsuario(usuario.getUsuario()).isPresent())
            throw  new RequestExcpetion("Este usuário ja existe, por favor digite outro!");

        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        return  usuarioRepository.save(usuario);
    }

    public LoginResponseDTO fazerLogin(String username, String senha){
        if(validarSenha(username, senha)){
            UsuarioModel usuario = isUserbyUsername(username);
            return new LoginResponseDTO(usuario.getCodigo(), tokenService.gerarToekn(usuario));
        }
        return  null;
    }

    public UsuarioModel alterarTipoDeUsuario(Long codigo, String senha){
        UsuarioModel usuario = isUserbyCode(codigo);
        if(passwordEncoder.matches(senha, senhaSistema)){
            usuario.setAdmin(true);
            usuario.setRole("ROLE_ADMIN");
            return  usuarioRepository.save(usuario);
        }
        throw  new RequestExcpetion("Senha do sistema incorreta!");
    }

    public Double efetuarTransacao(Long codigo, Double valor){
        UsuarioModel usuario = isUserbyCode(codigo);

        if(valor < 0 && (valor * -1) > usuario.getSaldo()) throw  new RequestExcpetion("Você não possui saldo suficeiente para um saque de tal valoe!");
        usuario.setSaldo(usuario.getSaldo() + valor);

        usuarioRepository.save(usuario);
        return  usuario.getSaldo();
    }

    public String excluirUsuarioPorID(Long codigo) {
        isUserbyCode(codigo);
        usuarioRepository.deleteById(codigo);
        return "Usuário excluido com sucesso!";
    }

    public String excluirTodosUsuarios(){
        usuarioRepository.deleteAll();;
        return "Todos usuários foram excluidos com sucesso!";
    }

    //Validações
    protected UsuarioModel isUserbyUsername(String username){
        Optional<UsuarioModel> usuario = usuarioRepository.buscarPorUsuario(username);
        if(usuario.isEmpty()) throw  new RequestExcpetion("USuário inexistente!");
        else return  usuario.get();
    }

    protected UsuarioModel isUserbyCode(Long codigo){
        Optional<UsuarioModel> usuario = usuarioRepository.buscarPorCodigo(codigo);
        if(usuario.isEmpty()) throw  new RequestExcpetion("USuário inexistente!");
        else return  usuario.get();
    }

    public boolean validarSenha(String email,  String senha) {
        UsuarioModel usuario = isUserbyUsername(email);
        if(passwordEncoder.matches(senha, usuario.getSenha())) return  true;
        else throw  new RequestExcpetion("Credenciais incorretas!");
    }
}
