import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { IDeteccion } from './interfaces/IDeteccion';
import { ChartData } from './interfaces/IChartData';
import axios from 'axios'
//Importar estilo
import './styles/servicios.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Deteccion(){
  const [detecciones, setDetecciones] = useState<IDeteccion[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtroFecha, setFiltroFecha] = useState('');
  const elementosPorPagina = 20;
  const deteccionesFiltradas = detecciones.filter(deteccion =>
    deteccion.fechahoraDeteccion.includes(filtroFecha)
  );
  const indiceUltimoElemento = paginaActual * elementosPorPagina;
  const indicePrimerElemento = indiceUltimoElemento - elementosPorPagina;
  const elementosActuales = deteccionesFiltradas.slice(indicePrimerElemento, indiceUltimoElemento);



  const navigate = useNavigate();
  const handleAtras = ()=>{
    navigate("/");
  }

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Valor de Señal',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  });

  const cambiarPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };
  
  const paginaSiguiente = () => {
    setPaginaActual(paginaActual + 1);
  };
  
  const paginaAnterior = () => {
    setPaginaActual(paginaActual - 1);
  };  

  const exportarCSV = async () => {
    const datosParaExportar = detecciones.slice(0, 10000);
    let csvContent = "data:text/csv;charset=utf-8," 
      + ["ID", "Fecha y Hora", "Nombre", "Latitud", "Longitud", "Valor", "Descripcion"].join(",") 
      + "\n" 
      + datosParaExportar.map(d => [d._id, d.fechahoraDeteccion, d.nombreDeteccion, d.latitudDeteccion, d.longitudDeteccion, d.valorDeteccion, d.descripcionDeteccion].join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "detecciones.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "detecciones.csv".
  };


  /*const options = {
    scales: {
      x: {
        ticks: {
          color: '#ffffff' // Cambia el color de los ticks (números/fechas) del eje X
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)' // Cambia el color de las líneas de la cuadrícula del eje X
        }
      },
      y: {
        ticks: {
          color: '#ffffff' // Cambia el color de los ticks del eje Y
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)' // Cambia el color de las líneas de la cuadrícula del eje Y
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff' // Cambia el color de las leyendas
        }
      },
      tooltip: {
        titleColor: '#ffffff', // Cambia el color del título del tooltip
        bodyColor: '#ffffff' // Cambia el color del cuerpo del tooltip
      }
    }
  };*/

  useEffect(() => {
    const httpAxios = axios.create({
      baseURL: `http://localhost:8080`
    });

    const cargarDetecciones = async () => {
      const res = await httpAxios.get<IDeteccion[]>('/Deteccion');
      const ordenadoRes = res.data.sort((a, b) => new Date(a.fechahoraDeteccion).getTime() - new Date(b.fechahoraDeteccion).getTime());
      const datosRecientes = ordenadoRes.slice(-20);
      const ordenado2 = res.data.sort((a, b) => new Date(b.fechahoraDeteccion).getTime() - new Date(a.fechahoraDeteccion).getTime());
      setDetecciones(ordenado2);

      const labels = datosRecientes.map(d => d.fechahoraDeteccion);
      const data = datosRecientes.map(d => d.valorDeteccion);

      setChartData({
        labels: labels,
        datasets: [{ ...chartData.datasets[0], data: data }]
      });
    };

    cargarDetecciones();

    const intervalo = setInterval(() => {
      cargarDetecciones(); // Actualizar datos cada X segundos
    }, 10000); // 10000 ms = 10 segundos
  
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    setPaginaActual(1);
  }, [filtroFecha]);

  return(
      <div className="principal">
        <header className="header">
          <div className="logo">
            <div className="imagen-logo">
            </div>
            <div className="contenedor-letras-logo">
              <h1>Dashboard</h1>
              <p>Trabajo Autónomo 2P - Tecnologías de Información Emergentes</p>
            </div>
            <i className="list material-icons bar-active">list</i>
          </div>
          <nav className="nadvar" id="nadvar">
            <ul id='opMenu'>
              <li>
              <Link to={'/'} className='cs'>Cerrar sesión</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="main container">
          <div className="content">
            <div className="graph-container">
              <h2>Gráfica de Oscilación</h2>
              <div className='chart-container'>
                <Line data={chartData} />
              </div>
            </div>
            <div className="description-container">
              <h2 className='descripciont'>Integración de Sensor PIR, ESP32 y Protocolo MQTT</h2>
              <p>Texto que describe cada lectura del sensor. Hay dos descripciones únicas correspondientes a 
                los valores del sensor: </p>
                <ul>
                  <li>'No hay movimiento.' </li>
                  <li>'Movimiento detectado!'</li>
                </ul>
              <img src="../public/circuito.jpeg" alt="Descripción de la imagen" />
            </div>
          </div>
          <input
          className="styled-input"
            type="text"
            placeholder="Filtrar (DD-MM-YYYY HH:MM:SS)"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
          <button className="expo-boton" onClick={exportarCSV} style={{ float: 'right' }}>Exportar CSV</button>
          <h2>Monitoreo de Sensores de Movimiento (PIR)</h2>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Fecha y Hora</td>
                <td>Nombre</td>
                <td>Latitud</td>
                <td>Longitud</td>
                <td>Valor</td>
                <td>Descripción</td>
              </tr>
            </thead>
            <tbody>
              {elementosActuales.map(deteccion => (
                <tr key={deteccion._id}>
                  <td>{deteccion._id}</td>
                  <td>{deteccion.fechahoraDeteccion}</td>
                  <td>{deteccion.nombreDeteccion}</td>
                  <td>{deteccion.latitudDeteccion}</td>
                  <td>{deteccion.longitudDeteccion}</td>
                  <td>{deteccion.valorDeteccion}</td>
                  <td>{deteccion.descripcionDeteccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {paginaActual > 1 && (
              <button onClick={paginaAnterior}>Anterior</button>
            )}
            {detecciones.length > indiceUltimoElemento && (
              <button onClick={paginaSiguiente}>Siguiente</button>
            )}
          </div>
        </main>
        <footer className="footer">
          <p>Tecnologías de la Información Emergentes</p>
          <p>© 2023 Todos los derechos reservados. <a href="#" className='letrafooter'>  Larissa López & Winter Meza </a></p>
          <p>Contacto: LopezLarissa.WinterMeza@gmail.com</p>
        </footer>
      </div>
  );
}
export default Deteccion