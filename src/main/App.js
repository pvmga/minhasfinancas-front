import React from 'react';

import Rotas from './rotas';
import NavBar from '../components/navbar';

import ProvedorAutenticacao from './provedorAutenticacao';

// template
import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css';

// notificações
import 'toastr/build/toastr.min.js';
import 'toastr/build/toastr.css';

// prime react
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

class App extends React.Component {

  render() {
    return (
      <ProvedorAutenticacao>
        <NavBar />
        <div className='container'>
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App;
