import React from 'react';
import ReactTable from 'react-table';
// import ReactExport from "react-export-excel";
import { Button, ButtonGroup } from 'reactstrap';
// import { SiMicrosoftexcel } from "react-icons/si";
import {Numero} from "@/utility/formats";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TableDeudas = ({data, columns, addProps}) => {

  return (
    <React.Fragment>
      <section className="bg-lighten-5 d-flex justify-content-between">
        {/* <ExcelFile element={<Button className="btn-sm" outline>
          <SiMicrosoftexcel size={22} />
          </Button>}
            filename="estado-deuda">
            <ExcelSheet data={data} name="estado-deuda" >
            {columns.map(column => <ExcelColumn label={column.Header} value={column.accessor}/>)}
            </ExcelSheet>
        </ExcelFile>
        <ButtonGroup>
          <div className="text-danger mr-2">
            <b>Total a pagar (+) a favor (-):</b>
          </div>
          <Button className="btn-sm btn-warning" disabled outline title="Saldo adeudado">
            {Numero(data.reduce((a,v) =>  a = a + v.saldo , 0 ))}
          </Button>            
        </ButtonGroup> */}
        aaa
      </section>

      <ReactTable
        showPagination
        showPaginationTop
        defaultPageSize={50}
        data={data}
        columns={columns.map(c => {
          if (c.Header === "Documento") {
            return ({...c, Cell: rowData => (
              <div
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
        className="-striped -highlight"
        {...addProps}
      />
    </React.Fragment>
  );
};

export default TableDeudas;
