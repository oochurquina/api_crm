import React, { useEffect, useState } from 'react'
import { Cliente } from '../../components/Cliente';

export const Inicio = () => {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const getClientes = async() => {
       try {
          const url = `http://localhost:3000/clientes`;
          const resp = await fetch(url)
          const resultado = await resp.json();
          setClientes(resultado);
       } catch (error) {
         console.log(error);
       }
    }
    getClientes();
  }, [])
  const handleDeleteClient = async (id) => {
      const confirmar = confirm('¿Desea eliminar este cliente?')
      if (confirmar){
        try {
          const url = `http://localhost:3000/clientes/${id}`;
          await fetch(url,{
            method:'DELETE'
          });
          const arrayClients = clientes.filter(client=>client.id!==id);
          setClientes(arrayClients)

        } catch (error) {
          console.log(error)
        }
      }
  }
  
  return (
    <>
          <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
          <p className='mt-3'>Administra tus clientes</p>
          <table className='w-full mt-5 table-auto shadow bg-white'>
              <thead className='bg-blue-800 text-white'>
                  <tr>
                    <th className='p-2'>Nombre</th>
                    <th className='p-2'>Contacto</th>
                    <th className='p-2'>Empresa</th>
                    <th className='p-2'>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                {
                    clientes.map(cliente=>(
                      <Cliente key={cliente.id} cliente={cliente} handleDeleteClient={handleDeleteClient}/>
                    ))
                }
              </tbody>

          </table>
    
    </>
  )
}
