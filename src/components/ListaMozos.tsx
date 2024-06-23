import axios from 'axios'
import { URL } from '../constants/constants'
import { useState, useEffect } from 'react';

interface ApiMozos {
    idMozo: number;
    nombreMozo: string;
    apellidoMozo: string;
    telefonoMozo: string;
    mailMozo: string;
    idSector: number;
}

const MainMozos = () => {
    const [datos, setDatos] = useState<ApiMozos[]>([
      {
        idMozo: 1,
        nombreMozo: 'nombre1',
        apellidoMozo: 'apellido1',
        telefonoMozo: 'telefono1',
        mailMozo: 'mail1',
        idSector: 1
      }
    ]);
    const [filtro, setFiltro] = useState<string>('');

    const getData = async (): Promise<void> => {
        const response = await axios.get(`${URL}/leer/mozos`)
        const data = await response.data
        setDatos(data)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltro(event.target.value);
    }

    const datosFiltrados = datos.filter((d) => {
        return (
            d.nombreMozo.toLowerCase().includes(filtro.toLowerCase()) ||
            d.idMozo.toString().includes(filtro.toLowerCase())
        );
    });

    const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

    return (
        <>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Buscar por nombre o idMozo"
                    value={filtro}
                    onChange={handleFiltroChange}
                />
            </div>
            <table className='container'>
                <thead>
                    <tr>
                        <th>IdMozos</th>
                        <th>Nombre Completo</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>id sector</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datosFiltrados.length > 0 ? (
                        datosFiltrados.map((d) => (
                            <tr key={d.idMozo}>
                                <td>{tab}{d.idMozo}</td>
                                <td>{d.nombreMozo} {d.apellidoMozo}</td>
                                <td>{d.mailMozo}</td>
                                <td>{d.telefonoMozo}</td>
                                <td>{tab}{d.idSector}</td>
                                <td><button>Acciones</button></td>
                            </tr>
                        ))
                    ) : (
                            <tr>
                                <td colSpan={6}>No hay mozos por ahora</td>
                            </tr>
                        )}
                </tbody>
            </table>
        </>
    )
}

export default MainMozos;