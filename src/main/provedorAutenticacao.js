import React from 'react';

import AuthService from '../app/service/authService';

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component{

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.logar(usuario);
        this.setState({ isAutenticado: true, usuarioAutenticado: usuario });
        //console.log(this.state.usuarioAutenticado);
    }

    encerrarSessao = () => {
        AuthService.removerUsuarioAutenticado();
        this.setState({ isAutenticado: false, usuarioAutenticado: null });
    }

    render() {
        //console.log(AuthService.obterUsuarioAutenticado());
        // console.log(AuthService.isUsuarioAutenticado() === 1);

        // if (AuthService.isUsuarioAutenticado() === 1) {
        //     this.setState({ isAutenticado: true });
        // }
        
        const contexto = {
            usuarioAutenticado: ( AuthService.isUsuarioAutenticado() === 1 ) ? AuthService.obterUsuarioAutenticado() : this.state.usuarioAutenticado,
            isAutenticado: ( AuthService.isUsuarioAutenticado() === 1 ) ? true : this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        return(
            <AuthProvider value={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}

export default ProvedorAutenticacao;