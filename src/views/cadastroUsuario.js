import React from 'react';
import { withRouter } from 'react-router-dom';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import UsuarioService from '../app/service/usuarioService';
import { mensagemErro, mensagemSucesso } from '../components/toastr';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar() {
        const msgs = []

        if (!this.state.nome) {
            msgs.push('O campo Nome é obrigatório.');
        }

        if (!this.state.email) {
            msgs.push('O campo Email é obrigatório.');
        } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um Email válido.');
        }

        if (!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Digite a senha 2x.');
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas não batem');
        }

        return msgs;
    }

    cadastrar = () => {

        const msgs = this.validar();

        if (msgs.length > 0) {
            msgs.forEach( (msg, i) => {
                mensagemErro(msg);
            } );
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }

        this.service.salvarUsuario( usuario )
        .then( response => {
            mensagemSucesso('Usuário cadatrado com sucesso! Faça o login para acessar o sistema.');
            this.cancelar(); // para voltar a tela de login
        }).catch( erro => {
            mensagemErro(erro.response.data);
        });
    }

    cancelar = () => {
        this.props.history.push('/login');
    }

    render() {
        return(
            
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                        className='form-control' 
                                        id="inputNome"
                                        name="nome" 
                                        onChange={e => this.setState({ nome: e.target.value })}/>
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text"
                                        className='form-control' 
                                        id="inputEmail"
                                        name="email" 
                                        onChange={e => this.setState({ email: e.target.value })}/>
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                        className='form-control' 
                                        id="inputSenha"
                                        name="senha" 
                                        onChange={e => this.setState({ senha: e.target.value })}/>
                            </FormGroup>
                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                        className='form-control' 
                                        id="inputRepitaSenha"
                                        name="senha" 
                                        onChange={e => this.setState({ senhaRepeticao: e.target.value })}/>
                            </FormGroup>
                            
                            
                            <button onClick={this.cadastrar} type='button' className='btn btn-success'>Salvar</button>
                            
                            <button onClick={this.cancelar} type='button' className='btn btn-danger'>Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }
}

export default withRouter(CadastroUsuario);