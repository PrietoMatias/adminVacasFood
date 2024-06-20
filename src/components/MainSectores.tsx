import axios from 'axios'
import { URL } from '../constants/constants'
import { useEffect, useState } from 'react';

interface ApiMozoSector{
    nombreMozo:string;
    apellidoMozo:string;
    nombreSector:string;

}

const MainSectores = () => {
    const [datos, setDatos] = useState<ApiMozoSector[]>([])
    const getData = async ():Promise<void>=>{
        const response = await axios.get(`${URL}/leer/mozos/sector`)
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
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Sector</th>
            </tr>
        </thead>
        <tbody>
        {datos.length > 0 ? (
            datos.map((d) => (
              <tr key={d.nombreMozo}>
                <td>{d.nombreMozo}</td>
                <td>{d.apellidoMozo}</td>
                <td>{d.nombreSector}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay Mozos asignados</td>
            </tr>
          )}
        </tbody>
    </table>

    </>
  )
}

export default MainSectores