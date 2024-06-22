import axios from 'axios';
import { URL } from '../constants/constants';
import { useState, useEffect } from 'react';
import '../styles/estilos.css';

interface ApiMozos {
  idMozo: number;
  nombreMozo: string;
  telefonoMozo: string;
  mailMozo: string;
  idSector: number;
}

const MainMozos = () => {
  const [datos, setDatos] = useState<ApiMozos[]>([
    { idMozo: 1, nombreMozo: 'Juan Perez', telefonoMozo: '123456789', mailMozo: 'juan.perez@example.com', idSector: 1 }
  ]);
  const [nuevoMozo, setNuevoMozo] = useState<ApiMozos>({
    idMozo: 0,
    nombreMozo: '',
    telefonoMozo: '',
    mailMozo: '',
    idSector: 0,
  });
  const [mostrarFormulario, setMostrarFormulario] = useState<boolean>(false);
  const [editando, setEditando] = useState<boolean>(false);

  const getData = async (): Promise<void> => {
    const response = await axios.get(`${URL}/leer/mozos`);
    const data = await response.data;
    setDatos(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevoMozo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editando) {
      await axios.put(`${URL}/editar/mozo/${nuevoMozo.idMozo}`, nuevoMozo);
      setDatos((prevDatos) =>
        prevDatos.map((mozo) =>
          mozo.idMozo === nuevoMozo.idMozo ? nuevoMozo : mozo
        )
      );
    } else {
      const response = await axios.post(`${URL}/agregar/mozo`, nuevoMozo);
      const mozoAgregado = await response.data;
      setDatos((prevDatos) => [...prevDatos, mozoAgregado]);
    }
    setMostrarFormulario(false);
    setNuevoMozo({
      idMozo: 0,
      nombreMozo: '',
      telefonoMozo: '',
      mailMozo: '',
      idSector: 0,
    });
    setEditando(false);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`${URL}/borrar/mozo/${id}`);
    setDatos((prevDatos) => prevDatos.filter((mozo) => mozo.idMozo !== id));
  };

  const handleEdit = (mozo: ApiMozos) => {
    setNuevoMozo(mozo);
    setMostrarFormulario(true);
    setEditando(true);
  };

  return (
    <>
      <table className="container">
        <thead>
          <tr>
            <th>IdMozos</th>
            <th>Nombre Completo</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>id sector</th>
            <th>Acciones</th>
            <th>
              <button
                className="icon-button-add"
                title="Agregar Mozo"
                onClick={() => {
                  setMostrarFormulario(true);
                  setEditando(false);
                  setNuevoMozo({
                    idMozo: 0,
                    nombreMozo: '',
                    telefonoMozo: '',
                    mailMozo: '',
                    idSector: 0,
                  });
                }}
              >
                <i className="fa-regular fa-square-plus fa-xl"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {datos.length > 0 ? (
            datos.map((d) => (
              <tr key={d.idMozo}>
                <td>{d.idMozo}</td>
                <td>{d.nombreMozo}</td>
                <td>{d.telefonoMozo}</td>
                <td>{d.mailMozo}</td>
                <td>{d.idSector}</td>
                <td>
                  <button onClick={() => handleEdit(d)} title="Editar">
                    <i className="fa-solid fa-pen-to-square fa-lg"></i>
                  </button>
                  <button onClick={() => handleDelete(d.idMozo)} title="Borrar">
                    <i className="fa-solid fa-delete-left fa-lg"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No hay Mozos registrados</td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="mozo-form">
          <input
            type="text"
            name="nombreMozo"
            value={nuevoMozo.nombreMozo}
            onChange={handleChange}
            placeholder="Nombre Completo"
            required
            autoComplete='off'
          />
          <input
            type="text"
            name="telefonoMozo"
            value={nuevoMozo.telefonoMozo}
            onChange={handleChange}
            placeholder="Teléfono"
            required
            autoComplete='off'
          />
          <input
            type="email"
            name="mailMozo"
            value={nuevoMozo.mailMozo}
            onChange={handleChange}
            placeholder="Correo"
            required
            autoComplete='off'
          />
          <input
            type="number"
            name="idSector"
            value={nuevoMozo.idSector}
            onChange={handleChange}
            placeholder="ID Sector"
            required
            autoComplete='off'
          />
          <button type="submit">{editando ? 'Guardar Cambios' : 'Agregar Mozo'}</button>
          <button type="button" onClick={() => setMostrarFormulario(false)}>
            Cancelar
          </button>
        </form>
      )}
    </>
  );
};

export default MainMozos;
