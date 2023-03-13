import React from 'react';
import { withRouter  } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuarioService';
// import LocalStorageService from '../app/service/localStorageService';
import { mensagemErro } from '../components/toastr';

import { AuthContext } from '../main/provedorAutenticacao';

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();

    }

    entrar = async () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            /*LocalStorageService.adicionarItem('_usuario_logado', response.data)*/
            // mensagemSucesso('Login realizado com sucesso!');
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home');
        }).catch( erro => {
            mensagemErro(erro.response.data);
        });
    }
    
    // TRABALHANDO DE FORMA ASSINCRONA, NÃO AGUARDA RESPONDER
    /*entrar = async () => {
        // console.log('Email: ', this.state.email);
        // console.log('Senha: ', this.state.senha);

        axios.post('http://localhost:8080/api/usuarios/autenticar', {
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            //console.log(response);
            localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
            this.props.history.push('/home');
        }).catch( erro => {
            console.log(erro.response.data);
            this.setState({ mensagemErro: erro.response.data });
        })

        console.log('executando a requisição.');
    }*/

    // TRABALHANDO DE FORMA SINCRONA. AGUARDANDO A REQUEST RESPONDER PARA SEGUIR COM O FLUXO.
    /*entrar = async () => {

        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/autenticar', {
                email: this.state.email,
                senha: this.state.senha
            });

            console.log('resposta:', response);
            console.log('executando a requisição.');
        }catch( erro ) {
            console.log(erro.response);
        }
    }*/

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuario');
    }

    render() {
        return(
            <div className='row'>
                <div className='col-md-6' style={ {position: 'relative', left: '300px'} }>
                    <div className='bs-docs-section'>
                        <Card title='Login'>
                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='bs-component'>
                                        <fieldset>
                                            <FormGroup label='Email: *' htmlFor='exampleInputEmail1'>
                                                <input type="email" 
                                                    value={this.state.email}
                                                    onChange={ e => this.setState({email: e.target.value})}
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                                <input type="password"
                                                        value={this.state.senha}
                                                        onChange={ e => this.setState({senha: e.target.value})}
                                                        className="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="Password" />
                                            </FormGroup>

                                            {/* <button onClick={ () => this.entrar } className="btn btn-success">Entrar</button> */}
                                            <button onClick={ this.entrar } className="btn btn-success" type='button'><i className="pi pi-sign-in"></i>Entrar</button>
                                            
                                            
                                            <button onClick={this.prepareCadastrar} className="btn btn-danger" type='button'><i className="pi pi-plus"></i>Cadastrar</button>
                                            
                                            
                                            {/* Para utilizar desta maneira a baixo, necessita adicionar o withRouter do react-router-dom e mudar export default */}
                                            {/* <button onClick={ this.prepareCadastrar } className="btn btn-danger" type='button'>Cadastrar</button> */}
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext;

export default withRouter(Login);