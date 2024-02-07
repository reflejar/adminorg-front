import React, { Component } from "react";

import Titulo from "@/components/CRUDL/titulo/CU";
import BasicModal from '@/components/modal/basic';


class ModalTitulo extends Component {
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
          button={<i onClick={this.handleToggle} className="bi-clipboard-plus" ></i>}
          className={""}
          header={"Nuevo Titulo"}
          component={<Titulo onClose={() => this.handleToggle(false)} />}
          footer={false}
        />
      </>
    );
  }
}

export default ModalTitulo;