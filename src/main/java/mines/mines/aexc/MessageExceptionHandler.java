package mines.mines.aexc;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MessageExceptionHandler {

    private Date data;
    private Integer status;
    private String erro;
    private String mensagem;
}
