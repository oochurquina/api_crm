import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Formulario} from '../../components/Formulario'

export const Editar = () => {
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
  const {id}= useParams();
  useEffect(() => {
    const getClienteApi = async()=>{
      try {
        const url = `http://localhost:3000/clientes/${id}`;
        const resp = await fetch(url);
        const result = await resp.json();
        setCliente(result)
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando)
    }
    getClienteApi();
  }, [])
  
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Editar datos del cliente</p>
      {cliente?.nombre ? (
        <Formulario cliente ={cliente}
        cargando={cargando}/>
      ):<p>Cliente ID no valido</p>}
  </>
  )
}
