import React from 'react';

import { Link } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';
//import LocalStorageService from '../app/service/localStorageService';
import { AuthContext } from '../main/provedorAutenticacao';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    // executa após o html ter carregado
    // https://pt-br.reactjs.org/docs/state-and-lifecycle.html
    componentDidMount() {
        //if (LocalStorageService.obterItem('_usuario_logado') !== null) {
            //const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
            const usuarioLogado = this.context.usuarioAutenticado;

            this.usuarioService
                .obterSaldoPorUsuario(usuarioLogado.id)
                .then(response => {
                    this.setState({ saldo: response.data })
                }).catch(error => {
                    console.log(error.response);
                });
        // } else {
        //     this.props.history.push('/login');
        // }

        /*axios.get(`http://localhost:8080/api/usuarios/${usuarioLogado.id}/saldo`)
            .then(response => {
                this.setState({ saldo: response.data })
            }).catch(error => {
                console.log(error.response);
            });*/
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <Link to="/cadastro-usuario">
                        <button type='button' className='btn btn-primary btn-lg'><i className="pi pi-users"></i>Cadastrar Usuário</button>
                    </Link>
                    
                    <Link to="/cadastro-lancamento">
                        <button type='button' className='btn btn-danger btn-lg'><i className="pi pi-money-bill"></i>Cadastrar Lançamento</button>
                    </Link>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext;

export default Home;