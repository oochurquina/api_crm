import { BrowserRouter,Routes,Route } from "react-router-dom"
import { IniciarSession } from "./layout/IniciarSession"
import { Layout } from "./layout/Layout"
import { Editar } from "./paginas/clientes/Editar"
import { Inicio } from "./paginas/clientes/Inicio"
import { Nuevo } from "./paginas/clientes/Nuevo"
import { Ver } from "./paginas/clientes/Ver"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout/>}>
          <Route index element={<Inicio/>} />
          <Route path="nuevo" element={<Nuevo/>} />
          <Route path="editar/:id" element={<Editar/>} />
          <Route path=":id" element={<Ver/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
