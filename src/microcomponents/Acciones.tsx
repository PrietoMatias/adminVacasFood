import { useState } from "react";


const Acciones = () => {
    const [mostrar, setMostrar] = useState(false)
  return (
  <>
  <a className='dropdown-trigger btn' onClick={()=>setMostrar(!mostrar)}>Acciones</a>
{mostrar &&
<ul id='dropdown1' className='dropdown-content'>
  <li><a href="#!">one</a></li>
  <li><a href="#!">two</a></li>
  <li className="divider" tabIndex={-1}></li>
  <li><a href="#!">three</a></li>
  <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
  <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
</ul>
}
  </>
  );
};

export default Acciones;