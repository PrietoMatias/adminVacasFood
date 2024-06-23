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
    <div className="nav-wrapper color #ede7f6 deep-purple lighten-5 ">
      <a  className="brand-logo right"><img src="https://i.ibb.co/xG9B56t/vaca.jpg" alt="vaca" className='logo'/></a>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><Link to={'/'} className='#f44336 red-text'>Principal</Link></li>
        <li><Link to={'/mozos'} className='#f44336 red-text'>Mozos</Link></li>
        <li><Link to={'/sectores'}className='#f44336 red-text'>Sectores</Link></li>
        <li><Link to={'/reservaciones'}className='#f44336 red-text'>Reservaciones</Link></li>
        <li><Link to={'/mesas'}className='#f44336 red-text'>Mesas</Link></li>
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