import { useState } from "react";


const Acciones = () => {
    const [mostrar, setMostrar] = useState(false);

    return (
        <>
           <button onClick={() => setMostrar(!mostrar)}>Mostrar/Ocultar</button>
        </>
    );
};


export default Acciones;