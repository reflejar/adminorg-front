import React, { Component, useState } from "react";
import BasicModal from '@/components/modal/basic';

// import Clientes from '@/components/CRUDL/cliente/L';
import Documentos from "@/components/CRUDL/comprobante/L";
import CHOICES from "@/components/CRUDL/comprobante/components/choices";
import Listado from '@/components/listados';
import { useClientes } from "@/utility/hooks/dispatchers";

const Registros = () => {

  const [type, setType] = useState('')
  const [clientes] = useClientes()

  const renderContent = () => {
    switch (type) {
      case 'cliente':
        return <Listado items={clientes} columns={[
          { label: "Nombre", key: "perfil.nombre" },
          { label: "Apellido", key: "perfil.apellido" },
          { label: "Razon social", key: "perfil.razon_social" },
          { label: "Tipo de documento", key: "perfil.tipo_documento" },
          { label: "Numero", key: "perfil.numero_documento" },
          { label: "Mail", key: "perfil.mail" },
          { label: "Telefono", key: "perfil.telefono" },
        ]} />
      case 'comprobante':
        return <Documentos causante={"cliente"} documentosTypes={CHOICES.receiptTypes['cliente']} />
      default:
        return 
    }
  }

  return (
    <div className="registration">
      {type === '' && (
        <div className="registration__type">
          <div className='row'>
            <div className="col-md-6 my-2 px-2">
              <div className='card'>
                  <div className="card-body text-center px-3 py-3 pointer" onClick={() => setType('cliente')}>
                    <h3 className="mb-1"><i className="bi-person fs-1" /> Clientes</h3>
                  </div>
              </div>                
            </div>
            <div className="col-md-6 my-2 px-1">
              <div className='card'>
                  <div className="card-body text-center px-3 py-3 pointer" onClick={() => setType('comprobante')}>
                    <h3 className="mb-1"><i className="bi-file-text fs-1" /> Comprobantes</h3>
                  </div>
              </div>                
            </div>              
          </div>
        </div>
      )}

      {renderContent()}
      <hr />
      <div className='btn btn-warning' onClick={() => setType('')} disabled={!type} >
        Volver
      </div>
    </div>
  );
}

export default function Modal ({selected}) {

  const [modal, setModal] = useState(false)

  const handleToggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <BasicModal
        open={modal}
        onToggle={handleToggle}
        button={(<button className="btn btn-outline-danger mx-1 shadow" onClick={handleToggle}> Registros </button>)}
        header="Registros"
        component={<Registros onClose={() => this.handleToggle(false)} />}
        footer={false}
      />
    </>
  );
}