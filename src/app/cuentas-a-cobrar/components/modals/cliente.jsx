import React, { Component } from "react";

import Cliente from "@/components/CRUDL/cliente/CU";
import BasicModal from '@/components/modal/basic';


class ModalCliente extends Component {
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
      <>
        <BasicModal
          open={this.state.modal}
          onToggle={this.handleToggle}
          button={<i onClick={this.handleToggle} className="bi-person-plus" ></i>}
          className={""}
          header={"Nuevo Cliente"}
          component={<Cliente onClose={() => this.handleToggle(false)} />}
          footer={false}
        />
      </>
    );
  }
}

export default ModalCliente;