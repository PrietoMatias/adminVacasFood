import { useState, useEffect } from 'react'
import axios from 'axios'
import { URL, dateParser } from '../constants/constants'

interface ApiReservaciones {
  idReservacion: number;
  nombreReservacion: string;
  apellidoReservacion: string;
  mailReservacion: string;
  telefonoReservacion: string;
  fechaReservacion: string;
  horaReservacion: string;
  cantidadReservacion: number;
}

const MainReservaciones = () => {
  const [datos, setDatos] = useState<ApiReservaciones[]>([]);

  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');

  const getData = async (): Promise<void> => {
    const response = await axios.get(`${URL}/leer/reservaciones`)
    const data = await response.data
    setDatos(data)
  }

  const deleteReservacion = async (id: number) => {
    try {
      await axios.delete(`${URL}/reservaciones/${id}`);
      setDatos(datos.filter((d) => d.idReservacion !== id));
    } catch (error) {
      console.error("Error deleting reservation", error);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleFiltroNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroNombre(event.target.value);
  }

  const handleFiltroFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltroFecha(event.target.value);
  }

  const datosFiltrados = datos.filter((d) => {
    return (
      d.nombreReservacion.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      (filtroFecha === '' || d.fechaReservacion === filtroFecha)
    );
  });

  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
  const tab1 = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;
  return (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={handleFiltroNombre}
        />
        <input
          type="date"
          placeholder="Filtrar por fecha"
          value={filtroFecha}
          onChange={handleFiltroFecha}
        />
      </div>
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
          {datosFiltrados.length > 0 ? (
            datosFiltrados.map((d) => (
              <tr key={d.idReservacion}>
                <td>{tab1}{d.idReservacion}</td>
                <td>{d.nombreReservacion} {d.apellidoReservacion}</td>
                <td>{d.mailReservacion}</td>
                <td>{d.telefonoReservacion}</td>
                <td>{dateParser(d.fechaReservacion)}</td>
                <td>{d.horaReservacion}</td>
                <td>{tab}{d.cantidadReservacion}</td>
                <td>
                  <button id='btnElimReserv' onClick={() => deleteReservacion(d.idReservacion)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8}>No hay reservaciones por ahora</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

export default MainReservaciones;
