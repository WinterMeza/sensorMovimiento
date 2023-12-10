import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//Importar estilo
import './styles/principal.css';

function Principal(){
  const navigate = useNavigate();

  const handleAtras = ()=>{
    navigate("/");
  }

  const handleIngreso = ()=>{
    navigate("/deteccion");
  }

  useEffect(()=>
    {
        const ingreso = document.querySelector<HTMLButtonElement>('#ingreso')!
        const correo = document.querySelector<HTMLInputElement>('#correo')!
        const contrasena = document.querySelector<HTMLInputElement>('#pass')!
        ingreso.addEventListener('click', async()=>{
        if(correo.value=="admin" && contrasena.value=="admin"){
          alert(`Sesión iniciada. Bienvenido Usuario! :D`);
          handleIngreso()
        }
        else{
          alert(`Datos incorrectos. Vuelva a intentarlo...`);
        }
      })
    }
  );
  return(
      <div className="principal">
          <header className="header">
            <div className="logo">
              <div className="imagen-logo">
              </div>
              <div className="contenedor-letras-logo">
                <h1>Dashboard</h1>
                <p>Trabajo Autónomo 2P - Tecnologías de Información Emergentes</p>
                <p>Facultad Ciencias de la Vida y Tecnología</p>
              </div>
              <i className="list material-icons bar-active">list</i>
            </div>
          </header>
          <section className="seccion-formulario">
          <div className="contenedor-formulario">
          <form method="post">
          <h2>Iniciar Sesión</h2><br></br>
          <label htmlFor="correo">Correo electrónico</label><br></br>
          <input type="email" name="correo" id="correo"></input><br></br>
          <label htmlFor="pass">Contraseña</label>
          <input type="password" name="pass" id="pass"></input><br></br>
          </form>
          <button className="acceder" id='ingreso'>Acceder</button><br></br>
          </div>
          </section>
          <footer className="footer">
          <p>Tecnologías de la Información Emergentes</p>
          <p>© 2023 Todos los derechos reservados. <a href="#" className="letrafooter"> Larissa López & Winter Meza</a></p>
          <p>Contacto: LopezLarissa.WinterMeza@gmail.com</p>
          </footer>
      </div>
  )
}
export default Principal