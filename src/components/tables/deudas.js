import React from 'react';
import ReactTable from 'react-table';
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import moment from 'moment';

import Comprobantes from 'views-admin/clientes/CRUDL/factura/CR';
import BasicModal from '../modal/basic';

// import "react-table/react-table.css";

const CheckboxTable = checkboxHOC(ReactTable);

export default class Table extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selection: [],
            selectAll: false,
            modal: {
                open: false,
                item: null
            }
          };

    }

    getColumns = (selected) => [{
      id: 'Portador',
      Header: 'Portador',
      accessor: () => `${selected.full_name}`
    }, {
      id: 'Documento',
      Header: 'Documento',
      accessor: (d) => `${d.documento.receipt.receipt_type} ${d.documento.receipt.formatted_number}`
    }, {
      Header: 'Ingreso',
      accessor: 'ingreso'
    }, {
      Header: 'Periodo',
      id: 'Periodo',
      accessor: (d) => moment(d.fecha).format('YYYY-MM')
    }, {
      Header: 'Monto',
      accessor: 'monto'
    }, {
      Header: 'Intereses/Descuentos',
      accessor: 'interes'
    }, {
      Header: 'Pagado',
      accessor: 'pago_capital'
    }, {
      Header: 'Saldo',
      accessor: 'saldo'
    }];    

  toggleAll = () => {
    /*
      'toggleAll' is a tricky concept with any filterable table
      do you just select ALL the records that are in your data?
      OR
      do you only select ALL the records that are in the current filtered data?

      The latter makes more sense because 'selection' is a visual thing for the user.
      This is especially true if you are going to implement a set of external functions
      that act on the selected information (you would not want to DELETE the wrong thing!).

      So, to that end, access to the internals of ReactTable are required to get what is
      currently visible in the table (either on the current page or any other page).

      The HOC provides a method call 'getWrappedInstance' to get a ref to the wrapped
      ReactTable and then get the internal state and the 'sortedData'.
      That can then be iterrated to get all the currently visible records and set
      the selection state.
    */
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach(item => {
        selection.push(item._original._id);
      });
    }
    this.setState({ selectAll, selection });
  };

  isSelected = key => {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  };

  handleToggle = (rowInfo) => {
    this.setState({
      ...this.state,
      modal: {
        open: !this.state.modal.open,
        item: rowInfo.original
      }
    });
  };

  render() {
    const { toggleSelection, toggleAll, isSelected } = this;
    const { selectAll } = this.state;
    const { data, selected } = this.props;

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
      getTdProps: (state, rowInfo, column, instance) => {
        return {
          onClick: () => {
            if (rowInfo && column.id === 'Documento') {
              this.handleToggle(rowInfo);
            }
          }
        }
      },
      getTrProps: (s, r) => {
        // someone asked for an example of a background color change
        // here it is...
        let selected;
        if (r) {
          selected = this.isSelected(r.original._id);
        }
        return {
          style: {
            backgroundColor: selected ? "lightgreen" : "inherit",
          }
        };
      }
    };

    return (
      <React.Fragment>
        <BasicModal
          open={this.state.modal.open}
          onToggle={this.handleToggle}
          header="Comprobante"
          footer={false}
          component={(
            <Comprobantes
              onlyRead
              onClose={this.handleToggle}
              item={this.state.modal.item}
            />
          )}
        />

        <CheckboxTable
          ref={r => (this.checkboxTable = r)}
          data={data}
          columns={this.getColumns(selected)}
          defaultPageSize={50}
          className="-striped -highlight"
          {...checkboxProps}
        />
      </React.Fragment>
    );
  }
}