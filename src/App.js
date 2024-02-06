// src/App.js
import React, { useState } from 'react';
import Sala from './components/Salas';
import ReservaForm from './components/ReservasFormulario';
import './App.css';

const App = () => {
  const [salas, setSalas] = useState([
    { id: 1, nombre: "Sala Juntas", capacidadTotal: 5, capacidadDisponible: 5, reservas: [] },
    { id: 2, nombre: "Sala Consejo", capacidadTotal: 6, capacidadDisponible: 6, reservas: [] },

  ]);
  const [selectedSala, setSelectedSala] = useState(null);
  const [reservas, setReservas] = useState([]);

  const selectSala = (sala) => {
    setSelectedSala(sala);
  };

  const reservarSala = (reserva) => {
    const salaSeleccionada = salas.find((s) => s.id === reserva.salaId);
  
    if (salaSeleccionada && salaSeleccionada.capacidadDisponible > 0) {
      // Actualiza la capacidad disponible de la sala
      const updatedSalas = salas.map((s) => {
        if (s.id === reserva.salaId) {
          return {
            ...s,
            capacidadDisponible: s.capacidadDisponible - 1,
            reservas: [...s.reservas, reserva],
          };
        } else {
          return s;
        }
      });
  
      setSalas(updatedSalas);
      setReservas([...reservas, reserva]);
    } else {
      alert('Las reservas para esta sala, alcanzaron el cupo máximo. Por favor selecciona otra sala.');
    }
  };

  return (
    <div>
      <h1>Reservas de Salas</h1>

      {/* Visualización de Salas */}
      {salas.map((sala) => (
        <Sala key={sala.id} sala={sala} onSelectSala={selectSala} />
      ))}

      {/* Reserva de Salas */}
      {selectedSala && <ReservaForm sala={selectedSala} onReservar={reservarSala} />}

      {/* Listado de Reservas */}
      <div>
        <h2>Listado de Reservas</h2>
        <ul>
          {reservas.map((reserva, index) => (
            <li key={index}>
              {salas.find((s) => s.id === reserva.salaId)?.nombre}, Hora de inicio: {reserva.startTime}, Hora de fin: {reserva.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
