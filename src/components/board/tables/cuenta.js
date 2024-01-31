import React from 'react';
import ReactTable from 'react-table';
import ReactExport from "react-export-excel";
import { Button } from 'reactstrap';
import { SiMicrosoftexcel } from "react-icons/si";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const TableCuenta = ({data, columns, addProps}) => {
  
  return (
    <React.Fragment>
      <section className="bg-lighten-5 text-left">
        <ExcelFile
          element={
            <Button className="btn-sm" outline>
              <SiMicrosoftexcel size={22} />
            </Button>
          }
          filename="estado-cuenta"
        >
          <ExcelSheet data={data} name="estado-cuenta">
            {columns.map((column) => (
              <ExcelColumn label={column.Header} value={column.accessor} />
            ))}
          </ExcelSheet>
        </ExcelFile>
      </section>
      <ReactTable
        showPagination
        showPaginationTop
        defaultPageSize={50}
        data={data}
        columns={columns.map(c => {
          if (c.Header === "Comprobante") {
            return ({...c, Cell: rowData => (
              <div
                className={rowData.row._original.fecha_anulacion && "text-danger" }
                style={{
                  cursor:"pointer"
                }}
              >
                {rowData.value}
              </div>
            )   })
          }
          return ({...c})
          
        })}
        sortable={false}
        className="-striped -highlight"
        {...addProps}
      />
    </React.Fragment>
  );
};

export default TableCuenta;
