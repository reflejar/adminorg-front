import React, { Component, Fragment } from "react";
import { Button } from "reactstrap";

import NotaCredito from "../components/CRUDL/nota-credito/CU";
import BasicModal from '@/components/modal/basic';

class ModalNotaCredito extends Component {
  state = {
    modal: false
  }

  handleToggle = (isOpen) => {
    this.setState({
      modal: typeof isOpen === 'boolean' ? isOpen : !this.state.modal
    });
  };

  render() {
    const { isDisabled } = this.props;

    return (
      <Fragment>
        <BasicModal
          open={this.state.modal}
          onToggle={this.handleToggle}
          button={(
            <Button
              outline
              color="primary"
              disabled={isDisabled}
              onClick={this.handleToggle}
            >
              + Nota de credito
            </Button>
          )}
          header="Nueva Nota de credito"
          component={<NotaCredito onClose={this.handleToggle} />}
          footer={false}
        />
      </Fragment>
    );
  }
}

export default ModalNotaCredito;
