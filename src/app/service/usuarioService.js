import ApiService from "../apiservice";

import ErroValidacao from "../exception/erroValidacao";

class UsuarioService extends ApiService {
    
    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    salvarUsuario(usuario) {
        return this.post('/', usuario);
    }

    obterSaldoPorUsuario(id) {
        return this.get(`/${id}/saldo`);
    }

    validar(usuario) {
        const erros = []

        if (!erros.nome) {
            erros.push('O campo Nome é obrigatório.');
        }

        if (!erros.email) {
            erros.push('O campo Email é obrigatório.');
        } else if (!erros.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um Email válido.');
        }

        if (!erros.senha || !erros.senhaRepeticao) {
            erros.push('Digite a senha 2x.');
        } else if (erros.senha !== erros.senhaRepeticao) {
            erros.push('As senhas não batem');
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;