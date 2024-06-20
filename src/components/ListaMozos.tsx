import axios from 'axios'
import { URL } from '../constants/constants'
import { useState, useEffect } from 'react';

interface ApiMozos{
    idMozo:number;
    nombreMozo:string;
    apellidoMozo:string;
    telefonoMozo:string;
    mailMozo:string;
    idSector:number
}
const MainMozos = () => {
    const [datos, setDatos] = useState<ApiMozos[]>([])

    const getData = async ():Promise<void>=>{
        const response = await axios.get(`${URL}/leer/mozos`)
        const data = await response.data
        setDatos(data)
    }   
useEffect(()=>{
    getData()
},[])
  return (
    <>
    <table className='container'>
        <thead>
            <tr>
                <th>IdMozos</th>
                <th>Nombre Completo</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>id sector</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {datos.length > 0 ? (
            datos.map((d) => (
              <tr key={d.idMozo}>
                <td>{d.idMozo}</td>
                <td>{d.nombreMozo} {d.apellidoMozo}</td>
                <td>{d.mailMozo}</td>
                <td>{d.telefonoMozo}</td>
                <td>{d.idSector}</td>
                <td><button>Acciones</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay reservaciones por ahora</td>
            </tr>
          )}
        </tbody>
    </table>
    </>
  )
}

export default MainMozos