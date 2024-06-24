import React, {ReactNode} from "react"
import '../styles/header.css'
import { Link } from "react-router-dom";

interface FooterHomeProps {
    children?: ReactNode; 
  }

const FooterHome:React.FC<FooterHomeProps> = ({children}) => {
  return (
    <>
    <div>
    <nav className='header'>
    <div className="nav-wrapper #e8eaf6 indigo lighten-5">
      <a  className="brand-logo right"><img src="../../public/logo.jpeg" alt="vaca" className='logo'/></a>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><Link to={'/'} className='#f44336 blue-text'>Principal</Link></li>
        <li><Link to={'/mozos'} className='#f44336 blue-text'>Mozos</Link></li>
        <li><Link to={'/sectores'}className='#f44336 blue-text'>Sectores</Link></li>
        <li><Link to={'/reservaciones'}className='#f44336 blue-text'>Reservaciones</Link></li>
        <li><Link to={'/mesas'}className='#f44336 blue-text'>Mesas</Link></li>
      </ul>
    </div>
  </nav>
    </div>
    <div className="main">
    {children}
    </div>
    
            </>
  )
}

export default FooterHome