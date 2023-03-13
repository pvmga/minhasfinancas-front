import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';

import LancamentosTable from './lancamentosTable';

import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';

import * as messages from '../../components/toastr';

import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    // buscando lançamentos
    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.');
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            //tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
        .consultar(lancamentoFiltro)
        .then( resposta => {
            const lista = resposta.data;
            if (lista < 1) {
                messages.mensagemAlert('Nenhum resultado encontrado.');
            }
            this.setState({ lancamentos: lista })
        }).catch( error => {
            messages.mensagemErro(error.response.data);
        })
    }

    editar = (id) => {
        console.log('editando o lancamento', id);
        this.props.history.push(`/cadastro-lancamento/${id}`);

    }

    deletar = ( lancamento ) => {

        //console.log('deletando o lancamento', lancamento.id);
        this.service
            .deletar(lancamento.id)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);
                lancamentos.splice(index, 1);
                this.setState(lancamentos);

                messages.mensagemSucesso('Lançamento deletado com sucesso!');
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar deletar o lançamento.');
            });
    }

    confirm = (lancamento) => {
        confirmDialog({
            message: 'Deseja realmente continuar com a exclusão?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.deletar(lancamento),
            reject: () => false
        });
    }

    // cadastro-lancamento
    renderCadastroLancamento = () => {
        this.props.history.push('/cadastro-lancamento');
    }

    alterarStatus = (lancamento, status) => {
        this.service
            .alterarStatus(lancamento.id, status)
            .then( response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(lancamento);

                if (index !== -1) {
                    lancamento['status'] = status;
                    lancamentos[index] = lancamento;

                    this.setState( {lancamentos} );
                }

                messages.mensagemSucesso('Status atualizado com sucesso!');
            }).catch( error => {
                messages.mensagemErro('Erro ao tentar atualizar o lançamento.');
            });
    }

    render() {
        const meses = this.service.obterListaMeses();

        const tipos = this.service.obterListaTipos();

        /*const lancamentos = [
            { descricao: 'Salário', valor: 5000, mes: 1, tipo: 'Receita', status: 'Efetivado' }
        ]*/

        return (
            <Card title="Consulta Lançamentos">
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='bs-component'>
                            <FormGroup htmlFor="inputAno" label="Ano: ">
                                <input type="text" 
                                       className="form-control"
                                       id="inputAno"
                                       value={this.state.ano}
                                       onChange={ e => this.setState({ ano: e.target.value })}
                                       placeholder="Digite o Ano" />
                            </FormGroup>

                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu id="inputMes"
                                            className='form-control'
                                            value={this.state.mes}
                                            onChange={ e => this.setState({ mes: e.target.value })}
                                            lista={meses} />
                            </FormGroup>

                            <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                                <input type="text" 
                                       className="form-control"
                                       id="inputDescricao"
                                       value={this.state.descricao}
                                       onChange={ e => this.setState({descricao: e.target.value })}
                                       placeholder="Digite a Descrição" />
                            </FormGroup>

                            <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                                <SelectMenu id="inputTipo"
                                            className='form-control'
                                            value={this.state.tipo}
                                            onChange={ e => this.setState({ tipo: e.target.value })}
                                            lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} 
                                    type="button"
                                    className="btn btn-success">
                                    <i className='pi pi-search'></i>
                                    Buscar
                            </button>
                            <button onClick={this.renderCadastroLancamento} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className='pi pi-plus'></i>
                                    Cadastrar
                            </button>

                        </div>
                    </div>
                </div>
                
                <br />

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='bs-component'>
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              deleteAction={this.confirm}
                                              editAction={this.editar} 
                                              alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    {/* Referente ao dialog */}
                    <ConfirmDialog />
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);