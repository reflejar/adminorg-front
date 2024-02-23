import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";

import Comprobante from "@/components/CRUDL/comprobante/CU";
// import ReciboX from "../CRUDL/recibo-x/CR";
import BasicModal from '@/components/modal/basic';

class ModalComprobante extends Component {
  constructor(props) {
    super(props);
    this.state = {modal: false};
  }

  handleToggle = () => {
      this.setState({
        modal: !this.state.modal,
      });
  };


  render() {
    const { modal } = this.state;

    return (
      <Fragment>
        <BasicModal
          button={(
            <Button
              outline
              color="primary" 
              className="mx-1 shadow"
              disabled={this.props.selected === undefined ? true : false}
              onClick={() => this.handleToggle(true)}
            >
              + Comprobante
            </Button>
          )}
          open={modal}
          onToggle={() => this.handleToggle(false)}
          header="Nuevo Comprobante"
          component={<Comprobante moduleHandler={'cliente'} destinatario={this.props.selected} onClose={() => this.handleToggle()}/>}
          footer={false}
        />
      </Fragment>
    );
  }
}

export default ModalComprobante;