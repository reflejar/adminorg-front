'use client'
import React, { useCallback, useState, useEffect } from "react";

// import "react-table/react-table.css";
import ReactTable from 'react-table';
import { Button } from 'reactstrap';
// import ReactExport from "react-export-excel";
// import { SiMicrosoftexcel } from "react-icons/si";

import Chance from "chance";

import Spinner from "@/components/spinner/spinner";

const chance = new Chance();

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const TableParametro = ({ titles, items, loadingItems, selectItem, toggle, causante }) => {
 
  const getColumns = useCallback(() => {
    const columns = [];
    titles.forEach(key => {
      columns.push(key);
    });
    columns.push(
      {
        Header: '',
        Cell: row => (
          ""          
          // <Edit
          //   size={18}
          //   className="mr-2"
          //   onClick={() => {
          //     selectItem({...row.original, causante});
          //     toggle(true)
          //   }}
          //   cursor='pointer'
          // />
        )
      }
    )
    return columns;
  }, [titles, selectItem, causante, toggle])


  const [columns] = useState(getColumns())
  const [data, setData] = useState([])

  useEffect(() => {

    setData(items.map(item => {
      const _id = chance.guid();
      return {
        _id,
        ...item
      };
    }))

  }, [items])

  if (loadingItems) {
    return <Spinner />
  }

  return (
    <React.Fragment>
      {/* <section className="bg-lighten-5 text-left">
        <ExcelFile
          element={
            <Button className="btn-sm" outline>
              <SiMicrosoftexcel size={22} />
            </Button>
          }
          filename="parametros"
        >
          <ExcelSheet data={data} name="parametros">
            {columns.map((column) => (
              <ExcelColumn label={column.Header} value={column.accessor} />
            ))}
          </ExcelSheet>
        </ExcelFile>
      </section> */}
      <ReactTable
        data={data}
        columns={columns}
        className="-striped -highlight"
      />
    </React.Fragment>    
  );

}

export default TableParametro;
