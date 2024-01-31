import React from 'react';
import moment from 'moment';
import CuentaTable from "@/components/board/tables/cuenta";
import {Numero} from "@/utility/formats";

import BasicModal from '@/components/modal/basic';
import Documento from '../CRUDL/documento/CU';
import NotaCredito from '../CRUDL/nota-credito/CU';
import OP from '../CRUDL/op/CU';
import { documentosTypes, notasCreditoTypes, opTypes } from '../CRUDL/_options/receipt_types';

// Cosas de Tesoreria
import Transferencia from '../../tesoreria/CRUDL/transferencia/CU';
import { transferenciasTypes } from '../../tesoreria/CRUDL/_options/receipt_types';

 // Cosas de Contabilidad
import Asiento from '../../contabilidad/CRUDL/asiento/CU';
import { asientosTypes } from '../../contabilidad/CRUDL/_options/receipt_types';

// import "react-table/react-table.css";

const getColumns = () => [{
  Header: 'Fecha',
  id: 'Fecha',
  accessor: (d) => moment(d.fecha).format('DD/MM/YYYY')
}, {
  Header: 'Comprobante',
  id: 'Comprobante',
  accessor: 'nombre'
}, {
  Header: 'Monto',
  accessor: 'total',
  Cell: row => (
    <div
      style={{
        width: '100%',
        textAlign: "right"
      }}
    >
      {Numero(row.value)}
    </div>
  )   
}, {
  Header: 'Saldo',
  accessor: 'saldo',
  Cell: row => (
    <div
      style={{
        width: '100%',
        textAlign: "right"
      }}
    >
      {Numero(row.value)}
    </div>
  )   
}];

export default class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: getColumns(),
      modal: {
        open: false,
        item: null
      }
    };
  }

  handleToggle = (rowInfo) => {
    this.setState({
      ...this.state,
      modal: {
        open: !this.state.modal.open,
        item: rowInfo.original
      }
    });
  };

  selectDocument = (causante, type) => {
    const { item } = this.state.modal;
    let documentos = {};
    if (causante === "proveedor") {
      documentosTypes.forEach((type) => {
        documentos[type.nombre] = <Documento
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      notasCreditoTypes.forEach((type) => {
        documentos[type.nombre] = <NotaCredito
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      opTypes.forEach((type) => {
        documentos[type.nombre] = <OP
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      return documentos[type]
    }
    if (causante === "caja") {
      transferenciasTypes.forEach((type) => {
        documentos[type.nombre] = <Transferencia
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      return documentos[type]
    }    
    if (causante === "asiento") {
      asientosTypes.forEach((type) => {
        documentos[type.nombre] = <Asiento
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      return documentos[type]
    }    
  }

  renderModal = () => {
    const { item } = this.state.modal;
    if (item) {
      const { receipt } = item
      return (
          <BasicModal
            open={this.state.modal.open}
            onToggle={this.handleToggle}
            header={`${receipt.receipt_type} - ${receipt.formatted_number}`}
            footer={false}
            component={this.selectDocument(item.causante, item.receipt.receipt_type)}
          />          
        )
    } 
  }

  render() {
    const { data } = this.props;

    const addProps = {
      getTdProps: (state, rowInfo, column, instance) => {
        return {
          onClick: () => {
            if (rowInfo && column.id === 'Comprobante') {
              this.handleToggle(rowInfo);
            }
            
          }
        }
      }
    };
        

    return (
      <React.Fragment>
        {this.state.modal && this.state.modal.item && this.renderModal()}

        <CuentaTable
          data={data}
          columns={getColumns()}
          addProps={addProps}
        />       
      </React.Fragment>
    );
  }
}