import React, { useState } from 'react';
import '../styles/login.css';

interface LoginProps {
    iniciar: () => void;
}

const Login: React.FC<LoginProps> = ({ iniciar }) => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const response = await fetch('URL_DEL_SERVIDOR/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usuario,
                password: contrasena
            })
        });

        if (response.ok) {
            iniciar();
        } else {
            console.error('Error en la autenticación');
        }
    };

    return (
        <div className='containerForm'>
            <form className='formLogin' onSubmit={handleSubmit}>
                <h1>Vaca's Food</h1>
                <div className='usuario'>
                    <i className="fa-solid fa-user"></i>
                    <input
                        type="text"
                        placeholder='Usuario'
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                <br />
                <div className='contra'>
                    <i className="fa-solid fa-lock"></i>
                    <input
                        type="password"
                        placeholder='Contraseña'
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <div className='sesion'>
                    <button type="submit">Iniciar Sesión</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
