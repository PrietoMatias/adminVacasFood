import axios from 'axios'
import {useState, useEffect} from 'react'
import {URL, dateParser} from '../constants/constants.ts'

interface ApiResponse{
    nombreReservacion:string;
    apellidoReservacion:string;
    fechaReservacion:string;
    idMesas:number;
    nombreSector:string;
}
const MainHome = () => {
    const [datos, setDatos] = useState<ApiResponse[]>([])

    const getData = async ():Promise<void>=>{
        const response = await  axios.get(`${URL}/leer/reservaciones/sector`)
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
                <th>IdMesa</th>
                <th>Sector</th>
                <th>Reservacion</th>
                <th>Fecha</th>
                <th>Acciones</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {datos.length > 0 ? (
            datos.map((d) => (
              <tr key={d.idMesas}>
                <td>{d.idMesas}</td>
                <td>{d.nombreSector}</td>
                <td>{d.nombreReservacion} {d.apellidoReservacion}</td>
                <td>{dateParser(d.fechaReservacion)}</td>
                <td><button>Editar</button></td>
                <td><button>Desocupar</button></td>
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

export default MainHome