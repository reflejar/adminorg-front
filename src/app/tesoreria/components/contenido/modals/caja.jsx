import React, { Component } from "react";

import Caja from "@/components/CRUDL/caja/CU";
import BasicModal from '@/components/modal';


class ModalCaja extends Component {
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
          header={"Nuevo Caja"}
          component={<Caja onClose={() => this.handleToggle(false)} />}
          footer={false}
        />
      </>
    );
  }
}

export default ModalCaja;