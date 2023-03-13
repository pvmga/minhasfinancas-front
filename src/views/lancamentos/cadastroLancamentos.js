import React from 'react';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';

import { withRouter } from 'react-router-dom';

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr';

class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    // Executado após chamar o render
    componentDidMount() {
        // imprimindo o id vindo pela rota
        const params = this.props.match.params;
        if (params.id) {
            this.service
                .obterPorId(params.id)
                .then( response => {
                    this.setState({ ...response.data, atualizando: true })
                }).catch( error => {
                    messages.mensagemErro(error.response.data);
                })
        }
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value });
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        
        // desistrituração
        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };
        
        try {
            this.service.validar(lancamento);
        }catch(erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }


        this.service
            .salvar(lancamento)
            .then(response => {
                console.log(response);
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
                this.renderConsultaLancamentos();
            }).catch( error => {
                messages.mensagemErro(error.response.data);
            })
    }

    atualizar = () => {        
        // desistrituração
        const { descricao, valor, mes, ano, tipo, status, id, usuario } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, status, id, usuario };

        this.service
            .atualizar(lancamento)
            .then(response => {
                console.log(response);
                messages.mensagemSucesso('Lançamento atualizado com sucesso!');
                this.renderConsultaLancamentos();
            }).catch( error => {
                messages.mensagemErro(error.response.data);
            })
    }

    renderConsultaLancamentos = () => {
        this.props.history.push('/consulta-lancamentos');
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return (
            <Card title={ this.state.atualizando ? 'Atualização de Lançamento' : 'Cadastro de Lançamento' }>
                <div className='row'>
                    <div className='col-md-12'>
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input type="text"
                                   id='inputDescricao'
                                   className="form-control"
                                   name='descricao'
                                   value={this.state.descricao}
                                   onChange={this.handleChange}
                                   placeholder="Digite uma descrição para o lançamento..." />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        <FormGroup id="inputAno" label="Ano: *">
                            <input type="number"
                                   id='inputAno'
                                   className="form-control" 
                                   name='ano'
                                   value={this.state.ano}
                                   onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className='col-md-6'>
                        <FormGroup id="inputMes" label="Mes: *">
                            <SelectMenu id="inputMes"
                                        className="form-control"
                                        lista={meses}
                                        name='mes'
                                        value={this.state.mes}
                                        onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-4'>
                        <FormGroup id="inputValor" label="Valor: *">
                            <input type="text"
                                   id='inputValor'
                                   className="form-control"
                                   name='valor'
                                   value={this.state.valor}
                                   onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"
                                        className="form-control"
                                        lista={tipos}
                                        name='tipo'
                                        value={this.state.tipo}
                                        onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className='col-md-4'>
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text"
                                   id="inputStatus"
                                   className="form-control"
                                   value={this.state.status}
                                   disabled />
                        </FormGroup>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6'>
                        {this.state.atualizando ?
                            (
                                <button onClick={this.atualizar} className='btn btn-primary'><i className="pi pi-refresh"></i>Atualizar</button>
                                ) : (
                                <button onClick={this.submit} className='btn btn-success'><i className="pi pi-save"></i>Salvar</button>
                            )
                        }
                        <button onClick={this.renderConsultaLancamentos} className='btn btn-danger'><i className="pi pi-times"></i>Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento);