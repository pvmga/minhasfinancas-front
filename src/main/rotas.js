import React from 'react';

import { AuthConsumer } from '../main/provedorAutenticacao';

import {
    Route, Switch, BrowserRouter, Redirect
} from 'react-router-dom';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos';

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props } ) {
    return (
        <Route {...props} render={ (componentProps) => {
            //console.log(isUsuarioAutenticado);
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={ { pathname : '/login', state : { from: componentProps.location } } } />
                )
            }
        } } />
    )
}

function Rotas(props) {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/login"  component={Login}/>
                <Route exact path="/cadastro-usuario"  component={CadastroUsuario}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home"  component={Home}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos"  component={ConsultaLancamentos}/>
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamento/:id?"  component={CadastroLancamentos}/>
                {/* <RotaAutenticada exact path="/cadastro-lancamento"  component={CadastroLancamentos}/> */}
            </Switch>
        </BrowserRouter>
    )
}

export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
);