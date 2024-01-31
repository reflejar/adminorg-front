'use client'
import React, { useEffect, useState } from 'react'
import { Collapse, Label, Input, Row, Col } from 'reactstrap'
import { ArrowDown, ArrowUp } from "react-feather"
import Buttons from './buttons';
import {ANALIZAR_EN_FILAS, AGRUPAR_ENCOLUMNAR, TOTALIZAR} from '../_options/filtros'

const initialSelection = {
    analizar: [],
    agrupar_por: [],
    encolumnar: [],
    totalizar: [],
}

export const Analisis = ({filtro, setFiltro, title, buttons, open, setSelectedFilter}) => {
    // Aqui se deberian recibir los estados globales (ver los componentes de esta misma carpeta)

    const [isOpen, setIsOpen] = useState({open});
    const [selection, setSelection] = useState(initialSelection);


    useEffect(() => {
        switch(filtro.tipo) {
            case 'ecc':
                setSelection({
                    analizar: ['cliente'],
                    agrupar_por: ['concepto'],
                    encolumnar: ['periodo'],
                    totalizar: 'valor'
                });
                break;
            case 'ecp':
                setSelection({
                    analizar: ['proveedor'],
                    agrupar_por: [],
                    encolumnar: ['periodo'],
                    totalizar: 'valor'
                });   
                break;
            case 'sys':
                setSelection({
                    analizar: ['titulo'],
                    agrupar_por: [],
                    encolumnar: [],
                    totalizar: 'debe'
                });   
                break;
            case 'rdos':
                setSelection({
                    analizar: ['ingreso', 'gasto'],
                    agrupar_por: [],
                    encolumnar: ['periodo'],
                    totalizar: 'valor'
                });   
                break;                 
            case 'may':
                setSelection({
                    analizar: [],
                    agrupar_por: [],
                    encolumnar: [],
                    totalizar: 'valor'
                });   
                break;                                 
            default:
                setSelection(initialSelection)         
                break;
        }           
      }, [filtro.tipo])  
     
    
    //Accordion controller
    const toggle = () => setIsOpen(!isOpen);
    
    //This handlers save the selected filters and compare in both 
    const handleChangeAgrupar = (e)=> {
        const selected = [...e.target].filter(item => item.selected).map(item => item.value);
        setSelection(prev => ({...prev, agrupar_por: selected, encolumnar: prev['encolumnar'].filter(item => !selected.includes(item))}))
    }
    const handleChangeColumnas = (e)=> {
        const selected = [...e.target].filter(item => item.selected).map(item => item.value);
        setSelection(prev => ({...prev, encolumnar: selected, agrupar_por: prev['agrupar_por'].filter(item => !selected.includes(item))}))
    }
    
    const handleChangeAnalizar = (e) =>{
        const selected = [...e.target].filter(item => item.selected).map(item => item.value);
        setSelection(prev => ({...prev, analizar: selected}))
    }
    const handleChangeTotalizar = (e) =>{
        setSelection(prev => ({...prev, totalizar: e.target.value}))
    }
    
    //Se guardan los fltros seleccionados en el estado del componente padre

    useEffect(() => {
        setFiltro((state) => ({
            ...state,
            analisis: selection
        }));
    }, [selection, setFiltro])        

    return (
        <>
            {title &&
                <button 
                    className="btn h4 btn-lg btn-primary container d-flex justify-content-between align-items-center"
                    type="button"
                    onClick={toggle}
                    >
                    {title}
                    
                    {isOpen ? <ArrowUp /> : <ArrowDown /> }
                </button>
            }
            
            <Collapse isOpen={isOpen}>
                    <Row>
                        <Col>
                            <Label for="exampleSelectMulti">Analizar</Label>
                                <Input
                                    type="select"
                                    name="analizar"
                                    id="analizar"
                                    multiple
                                    disabled={filtro.tipo === 'pers' ? false: true}
                                    value={selection['analizar']}
                                    onChange={handleChangeAnalizar}
                                    >
                                        {ANALIZAR_EN_FILAS.map(op => (
                                        <option value={op.value} >
                                            {op.label}
                                        </option>
                                        ))}
                                </Input>
                        </Col>
                        <Col>
                            <Label for="exampleSelectMulti">Agrupar</Label>
                                <Input
                                    type="select"
                                    name="agrupar_por"
                                    id="agrupar_por"
                                    multiple
                                    disabled={filtro.tipo === 'pers' ? false: true}
                                    value={selection['agrupar_por']}
                                    onChange={handleChangeAgrupar}
                                    >
                                        {AGRUPAR_ENCOLUMNAR.filter(op => op.value !== null).map(op => (
                                        <option value={op.value} >
                                            {op.label}
                                        </option>
                                        ))}
                                </Input>
                        </Col>
                        <Col>
                            <Label for="exampleSelectMulti">Columnas</Label>
                                <Input
                                    type="select"
                                    name="encolumnar"
                                    id="encolumnar"
                                    disabled={filtro.tipo === 'pers' ? false: true}
                                    value={selection['encolumnar']}
                                    onChange={handleChangeColumnas}
                                    >
                                        {AGRUPAR_ENCOLUMNAR.map(op => (
                                        <option value={op.value} >
                                            {op.label}
                                        </option>
                                        ))}
                                </Input>
                        </Col>
                        <Col>
                            <Label for="exampleSelectMulti">Totalizar</Label>
                                <Input
                                    type="select"
                                    name="totalizar"
                                    id="totalizar"
                                    disabled={filtro.tipo === 'pers' ? false: true}
                                    value={selection['totalizar']}
                                    onChange={handleChangeTotalizar}
                                    >
                                        {TOTALIZAR.map(op => (
                                        <option value={op.value} >
                                            {op.label}
                                        </option>
                                        ))}
                                </Input>
                        </Col>
                    </Row>
                    {buttons &&
                    <Row className="justify-content-end container m-2">
                        <Buttons/>
                    </Row>
                    }
            </Collapse>
        </>
    )
}
