
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Reservaciones from './pages/Reservaciones'
import Mozos from './pages/Mozos'
import Sectores from './pages/Sectores'
import Mesas from './pages/Mesas'
import Login from './components/Login'
import { useState } from 'react'

function App() {
  const [mostrar, setMostrar] = useState(false)
  const iniciar = () => {
    setMostrar(true)
  }

  return (
    <>
      {mostrar
        ?
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/reservaciones' element={<Reservaciones />} />
            <Route path='/mozos' element={<Mozos />} />
            <Route path='/sectores' element={<Sectores />} />
            <Route path='/mesas' element={<Mesas />} />
          </Routes>
        </BrowserRouter>
        :
        <Login iniciar={iniciar}/>  
      }
    </>
  )
}

export default App
