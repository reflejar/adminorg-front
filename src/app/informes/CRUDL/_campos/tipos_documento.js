'use client'
import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Input, Collapse } from "reactstrap";
import { ArrowDown, ArrowUp } from "react-feather"
import { receiptTypes } from '../_options/receipt_types';
// import './styles.scss'

const TiposDocumentos = ({ filtro, setFiltro, disableInOptions }) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [all, setAll] = useState(false)

  const SelectAll = () => {
    all ? 
    setSelection([]) :
    setSelection(receiptTypes.map(type => type.id))
    setAll(!all)
  }

  useEffect(() => {
    if (filtro.tipo !== 'pers') {
      setSelection(receiptTypes.map(type => type.id))
    }
  }, [filtro.tipo])  


  const SelectItem = (event) => {
    event.persist();
    const {value} = event.target;
    selection.some(selected => value === selected) ?
    setSelection(selection.filter(selected => selected !== value)) :
    setSelection([...selection, value])
    
  }  

  //Accordion controller
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setFiltro((state) => ({
      ...state,
      receiptTypes: selection
    }));
  }, [selection, setFiltro])

  return (
    <>
      <button 
        className="btn h4 btn-lg btn-primary container d-flex justify-content-between align-items-center"
        type="button"
        onClick={toggle}
        >
        Tipos de documentos
        {isOpen ? <ArrowUp /> : <ArrowDown /> }
      </button>
      <Collapse isOpen={isOpen}>
        <Row>
          <Col sm="12">
           
            <div className="Campo">
                     
              <div className="">
                <Table 
                  size="sm" 
                  responsive
                  >
                  <thead>
                    <tr>
                        <th>Tipo</th>
                        <td className="text-right">
                          <Input 
                            type="checkbox" 
                            disabled={filtro.tipo !== "pers" ? true : false}
                            onChange={() => SelectAll()} 
                            defaultChecked={all} />
                        </td>
                    </tr>
                  </thead>
                  <tbody>
                    {receiptTypes.map((type, key) => (
                      <tr key={key}>
                        <td>{type.full_name}</td>
                        <td className="text-right">
                          <Input 
                            type="checkbox" 
                            disabled={filtro.tipo !== "pers" ? true : false}
                            onChange={SelectItem}
                            value={type.id}
                            checked={selection.some(selected => type.id === selected)} />                  
                        </td>
                      </tr>
                    ))}
          
                  </tbody>
              </Table>

              </div>

            </div>
          </Col>
        </Row>
      </Collapse>
    </>
  );
};


export default TiposDocumentos;