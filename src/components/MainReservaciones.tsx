import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL, dateParser } from '../constants/constants'
import Acciones from '../microcomponents/Acciones';

interface ApiReservaciones{
    idReservacion:number;
    nombreReservacion:string;
    apellidoReservacion:string;
    mailReservacion:string;
    telefonoReservacion:string;
    fechaReservacion:string;
    horaReservacion:string;
    cantidadReservacion:number;
}

const MainReservaciones = () => {
    const [datos, setDatos] = useState<ApiReservaciones[]>([])
    const getData = async():Promise<void> =>{
        const response = await axios.get(`${URL}/leer/reservaciones`)
        const data = await response.data
        setDatos(data)
    }
    useEffect(()=>{
        getData();

    },[])
  return (
    <>
    <table className='container'>
        <thead>
            <tr>
                <th>IdReservaciones</th>
                <th>Nombre Reservacion</th>
                <th>Correo</th>
                <th>Telefono</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cantidad</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
        {datos.length > 0 ? (
            datos.map((d) => (
              <tr key={d.idReservacion}>
                <td>{d.idReservacion}</td>
                <td>{d.nombreReservacion} {d.apellidoReservacion}</td>
                <td>{d.mailReservacion}</td>
                <td>{d.telefonoReservacion}</td>
                <td>{dateParser(d.fechaReservacion)}</td>
                <td>{d.horaReservacion}</td>
                <td>{d.cantidadReservacion}</td>
                <td><Acciones/></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay reservaciones registradas</td>
            </tr>
          )}
        </tbody>
    </table>
    </>
  )
}

export default MainReservaciones