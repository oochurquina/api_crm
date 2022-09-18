import React from 'react'
import { Outlet } from 'react-router-dom'

export const IniciarSession = () => {
  return (
    <div>
      <h1>Desde iniciar session....</h1>
      <Outlet/>
    </div>
  )
}
