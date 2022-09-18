

import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { Spinner } from '../../components/Spinner';

export const Ver =()=>{
    const [cliente, setCliente] = useState({})
    const [loading, setLoading] = useState(true)
    const {id}= useParams();
    useEffect(() => {
      setLoading(!loading);
      const getClientesApi = async ()=>{
        try {
            const url = `http://localhost:3000/clientes/${id}`;
            const resp = await fetch(url);
            const result = await resp.json();
            setCliente(result)
        } catch (error) {
            console.log(error);
        }
        setLoading(!loading)
      }
      getClientesApi();
    }, [])
    
    return (
        loading?<Spinner/>:
        Object.keys(cliente).length=== 0? <p>No hay resultados</p>: (
            <div>
                <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
                <p className='mt-3'>Informácion del cliente</p>
                <p className='text-4xl text-gray-500 mt-10'>
                    <span className='text-gray-800 font-bold uppercase'>Cliente: </span>
                    {cliente.nombre}
                </p>
                <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 font-bold uppercase'>E-mail: </span>
                    {cliente.email}
                </p>
                <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 font-bold uppercase'>Teléfono: </span>
                    {cliente.telefono}
                </p>
                <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 font-bold uppercase'>Empresa: </span>
                    {cliente.empresa}
                </p>
                { cliente.notas && (
                    <p className='text-2xl text-gray-500 mt-4'>
                    <span className='text-gray-800 font-bold uppercase'>Notas: </span>
                    {cliente.notas}
                    </p>
                )}
            </div>
        )
    )
}