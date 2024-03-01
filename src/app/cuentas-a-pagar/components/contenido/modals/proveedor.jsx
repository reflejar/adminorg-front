import React, { Component } from "react";

import Proveedor from "@/components/CRUDL/proveedor/CU";
import BasicModal from '@/components/modal';


class ModalProveedor extends Component {
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
          header={"Nuevo Proveedor"}
          component={<Proveedor onClose={() => this.handleToggle(false)} />}
          footer={false}
        />
      </>
    );
  }
}

export default ModalProveedor;