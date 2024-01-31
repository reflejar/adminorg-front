import React from 'react';
import moment from 'moment';
import CuentaTable from "@/components/board/tables/cuenta";
import {Numero} from "@/utility/formats";

import BasicModal from '@/components/modal/basic';

// Cosas de Clientes
import ClienteComprobante from '../../clientes/CRUDL/factura/CR';
import ClienteNotaCredito from '../../clientes/CRUDL/nota-credito/CR';
import ClienteReciboX from '../../clientes/CRUDL/recibo-x/CR';
import { 
  facturasTypes as clientesComprobantesTypes, 
  notasCreditoTypes as clientesNotasCreditoTypes, 
  notasDebitoTypes as clientesNotasDebitoTypes, 
  recibosTypes as clientesRecibosTypes 
} from '../../clientes/CRUDL/_options/receipt_types';

// Cosas de Proveedores
import ProveedorDocumento from '../../cuentas-a-pagar/CRUDL/documento/CU';
import ProveedorNotaCredito from '../../cuentas-a-pagar/CRUDL/nota-credito/CU';
import ProveedorOP from '../../cuentas-a-pagar/CRUDL/op/CU';
import { 
  documentosTypes as proveedoresDocumentosTypes, 
  notasCreditoTypes as proveedoresNotasCreditoTypes, 
  opTypes as proveedoresOpTypes
 } from '../../cuentas-a-pagar/CRUDL/_options/receipt_types';

// Cosas de Tesoreria
import TesoreriaTransferencia from '../CRUDL/transferencia/CU';
import { 
  transferenciasTypes as tesoreriaTransferenciasTypes, 
 } from '../CRUDL/_options/receipt_types';

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
    if (causante === "cliente") {
      clientesComprobantesTypes.forEach((type) => {
        documentos[type.nombre] = <ClienteComprobante
        onlyRead={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      clientesNotasDebitoTypes.forEach((type) => {
        documentos[type.nombre] = <ClienteComprobante
        onlyRead={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      clientesNotasCreditoTypes.forEach((type) => {
        documentos[type.nombre] = <ClienteNotaCredito
        destinatario={item.destinatario}
        onlyRead={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      clientesRecibosTypes.forEach((type) => {
        documentos[type.nombre] = <ClienteReciboX
        destinatario={item.destinatario}
        onlyRead={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      return documentos[type]
    }
    if (causante === "proveedor") {
      proveedoresDocumentosTypes.forEach((type) => {
        documentos[type.nombre] = <ProveedorDocumento
        destinatario={item.destinatario}
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      proveedoresNotasCreditoTypes.forEach((type) => {
        documentos[type.nombre] = <ProveedorNotaCredito
        destinatario={item.destinatario}
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      proveedoresOpTypes.forEach((type) => {
        documentos[type.nombre] = <ProveedorOP
        destinatario={item.destinatario}
        update={true}
        onClose={this.handleToggle}
        selected={item}
      />
      })
      return documentos[type]
    }
    if (causante === "caja") {
      tesoreriaTransferenciasTypes.forEach((type) => {
        documentos[type.nombre] = <TesoreriaTransferencia
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