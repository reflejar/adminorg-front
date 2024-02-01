'use client'
import React, { useCallback, useState } from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { Table, Button } from "reactstrap";
// import { SiMicrosoftexcel } from "react-icons/si";
import { informesActions } from '@/redux/actions/informes';
import Spinner from "@/components/spinner/spinner";

// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import "./styles.scss";

const TableInforme = ({data, query, getExcelReporte}) => {

  const [loading, setLoading] = useState(false)
  
  const makeColumns = (columns) => {
    if (Array.isArray(columns[0])) {
      let colrows = [];
      Array.from(Array(columns[0].length).keys()).forEach((i) => {
        colrows.push(
          <tr>
            {columns.map((col, index) => {
              return <th key={index}>{col[i] === "" ? " - " : col[i]}</th>;
            })}
          </tr>
        );
      })

      return colrows;
    } else {
      return (
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col}</th>
          ))}
        </tr>
      );
    }
  };

  const handleExcelQuery = useCallback((event) => {
    setLoading(true)
    event.preventDefault();
    
    getExcelReporte(query, true)
      .then(() => {
        setLoading(false)
      })
      .catch((error) => {
        const { data } = error;
      })
  }, [getExcelReporte, query]);

  if (loading) {
    return <div className="loading-modal">
    <Spinner />
  </div>
  }

  return (
    <React.Fragment>
      <section className="bg-lighten-5 text-left">
        
      {/* <Button onClick={handleExcelQuery} className="btn-sm" outline>
          <SiMicrosoftexcel size={22} />
        </Button> */}
        <Button onClick={handleExcelQuery} className="btn-sm" outline >
          Libro Mayor
        </Button>
      </section>
      <Table responsive size="sm" className="fixed-rows" id="table-informe">
        <thead>{makeColumns(data.columns)}</thead>
        <tbody>
          {data.data.map((row, index) => (
            <tr key={index}>
              {row.map((cell, i) => (
                <td key={i}>
                  {cell === 0
                    ? "-"
                    : cell.toString().includes(".") === true
                    ? cell.toString().replace(".", ",")
                    : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </React.Fragment>
  );
};


const mapStateToProps = (state) => ({
  data: get(state, "informes.data", {}),
  query: get(state, "informes.query", {}),
});

const mapDispatchToProps = dispatch => ({
  getExcelReporte: (payload, excel) => dispatch(informesActions.get_data(payload, excel))
});


export default connect(mapStateToProps, mapDispatchToProps)(TableInforme);





