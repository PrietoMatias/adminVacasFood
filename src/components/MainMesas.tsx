import { useEffect, useState } from 'react';
import { URL } from '../constants/constants';
import axios from 'axios';

interface ApiMesa {
  idMesas: number;
  cantidadMesas: number;
  estadoMesas: string;
  idSectores: number;
  idReservacion: number | null;
}

const MainMesas = () => {
  const [datos, setDatos] = useState<ApiMesa[]>([]);
  const [mesaAsignando, setMesaAsignando] = useState<number | null>(null); // Estado para la mesa en modo de asignación
  const [idReservacionInput, setIdReservacionInput] = useState<string>(''); // Estado para el input de idReservacion

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    try {
      const response = await axios.get(`${URL}/leer/mesas`);
      const data = response.data;
      setDatos(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const asignarMesa = async (idMesa: number, idReservacion: number | null): Promise<void> => {
    try {
      const mesaAsignada = {
        idMesa,
        idReservacion
      }
      await axios.put(`${URL}/asignar/mesas`, mesaAsignada);
      const updatedMesas = datos.map((mesa) => {
        if (mesa.idMesas === idMesa) {
          return { ...mesa, idReservacion }
        }
        return mesa;
      });
      setDatos(updatedMesas)
      setMesaAsignando(null) // Desactivar modo de asignación después de confirmar
      setIdReservacionInput('') // Limpiar input de idReservacion después de confirmar
    } catch (error) {
      console.error('Error al asignar mesa:', error)
    }
  };

  const handleAsignar = (idMesa: number): void => {
    setMesaAsignando(idMesa) // Activar modo de asignación para la mesa seleccionada
  };

  const handleCancelar = (): void => {
    setMesaAsignando(null) // Cancelar modo de asignación
    setIdReservacionInput('') // Limpiar input de idReservacion al cancelar
  };

  const handleIdReservacionChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIdReservacionInput(e.target.value)
  }

  return (
    <>
      <table className='container'>
        <thead>
          <tr>
            <th>IdMesas</th>
            <th>Cantidad Mesas</th>
            <th>Estado Mesas</th>
            <th>idReservacion</th>
            <th>idSectores</th>
            <th>Accciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.length > 0 ? (
            datos.map((d) => (
              <tr key={d.idMesas}>
                <td>{d.idMesas}</td>
                <td>{d.cantidadMesas}</td>
                <td>{d.estadoMesas}</td>
                <td>
                  {mesaAsignando === d.idMesas ? (
                    <input
                      type='number'
                      name='idReservacion'
                      placeholder='idReservacion'
                      value={idReservacionInput}
                      onChange={handleIdReservacionChange}
                    />
                  ) : d.idReservacion === null ? (
                    'Sin Asignar'
                  ) : (
                    d.idReservacion
                  )}
                </td>
                <td>{d.idSectores}</td>
                <td>
                  {mesaAsignando === d.idMesas ? (
                    <>
                      <button onClick={() => asignarMesa(d.idMesas, parseInt(idReservacionInput) || null)}>Confirmar</button>
                      <button onClick={handleCancelar}>Cancelar</button>
                    </>
                  ) : (
                    <button onClick={() => handleAsignar(d.idMesas)}>Asignar</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay mesas registradas</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default MainMesas;
