import React from 'react';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';

import { withRouter } from 'react-router-dom';

import LancamentoService from '../../app/service/lancamentoService';

import * as messages from '../../components/toastr';

class CadastroLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value });
    }

    salvar = () => {
        console.log(this.state);
        messages.mensagemSucesso('Lançamento salvo com sucesso!');
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        return (
            <Card title="Cadastro Lançamento">
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
                        <button onClick={this.salvar} className='btn btn-success'>Salvar</button>
                        <button className='btn btn-danger'>Cancelar</button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamento);