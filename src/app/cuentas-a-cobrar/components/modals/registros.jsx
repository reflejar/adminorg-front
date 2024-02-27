import React, { Component, useState } from "react";
import { Button } from "reactstrap";

import BasicModal from '@/components/modal/basic';

import Clientes from '@/components/CRUDL/cliente/L';
import Documentos from "@/components/CRUDL/documento/L";
import CHOICES from "@/components/CRUDL/comprobante/components/choices";

const Registros = () => {

  const [type, setType] = useState('')

  const renderContent = () => {
    switch (type) {
      case 'cliente':
        return <Clientes />
      case 'comprobante':
        return <Documentos causante={"cliente"} documentosTypes={CHOICES.receiptTypes['cliente']} />
      default:
        return 
    }
  }

  return (
    <div className="registration">
      {type === '' && (
        <div className="registration__type">
          <div className='row'>
            <div className="col-md-6 my-2 px-2">
              <div className='card'>
                  <div className="card-body text-center px-3 py-3 pointer" onClick={() => setType('cliente')}>
                    <h3 className="mb-1"><i className="bi-person fs-1" /> Clientes</h3>
                  </div>
              </div>                
            </div>
            <div className="col-md-6 my-2 px-1">
              <div className='card'>
                  <div className="card-body text-center px-3 py-3 pointer" onClick={() => setType('comprobante')}>
                    <h3 className="mb-1"><i className="bi-file-text fs-1" /> Comprobantes</h3>
                  </div>
              </div>                
            </div>              
          </div>
        </div>
      )}

      {renderContent()}
      <hr />
      <div className='btn btn-warning' onClick={() => setType('')} disabled={!type} >
        Volver
      </div>
    </div>
  );
}


class ModalRegistros extends Component {
  state = {
    modal: false
  }

  handleToggle = (isOpen) => {
    this.setState({
      modal: typeof isOpen === 'boolean' ? isOpen : !this.state.modal
    });
  };

  render() {
    return (
      <BasicModal
        open={this.state.modal}
        onToggle={this.handleToggle}
        header="Registros"
        component={<Registros onClose={() => this.handleToggle(false)} />}
        button={(
          <Button
            outline
            color="danger"
            className="mx-1 shadow"
            onClick={this.handleToggle}
          >
            Registros
          </Button>
        )}
      />
    );
  }
}

export default ModalRegistros;