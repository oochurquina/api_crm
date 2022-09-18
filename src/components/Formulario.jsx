import React from 'react'
import {Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import { Alert } from './Alert';
import { useNavigate } from 'react-router-dom';
import { Spinner } from './Spinner';
export const Formulario = ({cliente,cargando}) => {
  const navigate= useNavigate();
  const initialValues= {
    nombre : cliente?.nombre ?? "",
    empresa: cliente?.empresa ?? "",
    email  : cliente?.email ?? "",
    telefono:cliente?.telefono ?? "",
    notas  : cliente?.notas ?? ""
  }
  const schemaCliente= Yup.object().shape({
    nombre: Yup.string()
               .min(3,'El nombre es muy corto')
               .max(20,'El nombre es muy largo')
               .required('El nombre del cliente es obligatorio.'),
    empresa: Yup.string()
                .required('El nombre de la empresa es obligatorio.'),
    email: Yup.string()
              .email('Email no valido')
              .required('El email es obligatorio'),
    telefono: Yup.number().typeError('No es un numero.')
                 .positive('Número no valido') 
                 .integer('Solo se permite números enteros') 
  })

  const handleSubmit = async (values) => { 
    const options = {
      method: cliente.id?'PUT':'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type':'application/json'
      }
    }
    let resp;
    try {
        if (cliente.id){
          // editando regisro
          const url = `http://localhost:3000/clientes/${cliente.id}`;
          resp = await fetch(url,options);
        } else {
          // Nuevo registro
          const url = `http://localhost:3000/clientes`;
          resp = await fetch(url,options);
        }
        await resp.json();
        navigate('/clientes') 

    } catch (error) {
      console.log(error)
    }
  }
  return (
    cargando? <Spinner/>:(
      <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre? 'Editar cliente':'Agregar Cliente'}</h1>
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={async (values,{resetForm})=>{
            await handleSubmit(values);
            resetForm();
          }}
          validationSchema={schemaCliente}
        >
          {/* ingresamos un arrayfunction  */}
          {({errors,touched})=>{
            return (
            <Form 
            className='mt-10'
            >
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor="nombre">Nombre: </label>
                <Field 
                  id='nombre'
                  name="nombre"
                  type='text' 
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder='Ingrese un Nombre'/>
                  {errors.nombre && touched.nombre?<Alert>{errors.nombre}</Alert>:null}
              </div>
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor="empresa">Empresa: </label>
                <Field 
                  id='empresa'
                  name="empresa"
                  type='text' 
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder='Ingrese Empresa'/>
                   {errors.empresa && touched.empresa?<Alert>{errors.empresa}</Alert>:null}
              </div>
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor="email">E-mail: </label>
                <Field 
                  id='email'
                  name="email"
                  type='text' 
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder='Email del cliente'/>
                  {errors.email && touched.email? <Alert>{errors.email}</Alert>:null}
              </div>
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor="telefono">Teléfono: </label>
                <Field 
                  id='telefono'
                  name="telefono"
                  type='tel' 
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder='Telefono del cliente.'/>
                  {errors.telefono && touched.telefono? <Alert>{errors.telefono}</Alert>:null}

              </div>
              <div className='mb-4'>
                <label className='text-gray-800' htmlFor="notas">Notas: </label>
                <Field 
                  as ="textarea"              
                  id='notas'
                  name="notas"
                  type='text' 
                  className="h-40 mt-2 block w-full p-3 bg-gray-50"
                placeholder='Notas del cliente'/>
              </div>
              <input 
                type="submit"
                value={cliente?.nombre?'Editar Cliente': 'Nuevo cliente'}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                />
            </Form>
          )}}
        </Formik>
      </div>
  ))
}

Formulario.defaultProps = {
   cliente: {},
   cargando: false
}
