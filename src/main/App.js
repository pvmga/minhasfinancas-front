import React from 'react';

import Rotas from './rotas';
import NavBar from '../components/navbar';
import LocalStorageService from '../app/service/localStorageService';

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

  state = {
    exibeNaveBar: 'hidden'
  }

  componentDidMount() {

    if (LocalStorageService.obterItem('_usuario_logado') !== null) {
      this.setState({ exibeNaveBar: '' })
    } else {
      this.setState({ exibeNaveBar: 'hidden' })
    }
  }

  render() {
    return (
      <>
        <NavBar exibeNaveBar={this.state.exibeNaveBar} />
        <div className='container'>
          <Rotas />
        </div>
      </>
    )
  }
}

export default App;
