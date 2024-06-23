import axios from 'axios';
import { URL } from '../constants/constants';
import { useEffect, useState } from 'react';

interface ApiMozoSector {
  nombreMozo: string;
  apellidoMozo: string;
  nombreSector: string; 
}

const MainSectores = () => {
  const [datos, setDatos] = useState<ApiMozoSector[]>([]);
  const [filtro, setFiltro] = useState<string>("");

  const getData = async (): Promise<void> => {
    const response = await axios.get(`${URL}/leer/mozos/sector`);
    const data = await response.data;
    setDatos(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleFiltroChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const datosFiltrados = datos.filter((d) => {
    return (
      d.nombreSector.toLowerCase().includes(filtro.toLowerCase()) ||
      d.nombreMozo.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  const tab = <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>;

  return (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre o sector"
          value={filtro}
          onChange={handleFiltroChange}
        />
      </div>
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
            datosFiltrados.map((d) => (
              <tr key={d.nombreMozo}>
                <td>{d.nombreMozo}</td>
                <td>{d.apellidoMozo}</td>
                <td>{tab}{d.nombreSector}</td>
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
  );
};

export default MainSectores;
