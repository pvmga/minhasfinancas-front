import React from 'react';

import {
    Route, Switch, BrowserRouter
} from 'react-router-dom';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos';
import CadastroLancamentos from '../views/lancamentos/cadastroLancamentos';

function Rotas() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/"  component={Home}/>
                <Route exact path="/home"  component={Home}/>
                <Route exact path="/login"  component={Login}/>
                <Route exact path="/cadastro-usuario"  component={CadastroUsuario}/>
                <Route exact path="/consulta-lancamentos"  component={ConsultaLancamentos}/>
                <Route exact path="/cadastro-lancamento"  component={CadastroLancamentos}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Rotas;