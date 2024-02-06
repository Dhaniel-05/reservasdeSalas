// src/components/ListaReservas.js
import React from 'react';

const ListaReservas = ({ reservas }) => (
  <div>
    <h2>Listado de Reservas</h2>
    <ul>
      {reservas.map((reserva, index) => (
        <li key={index}>
          Sala: {reserva.salaId}, Hora de inicio: {reserva.startTime}, Hora de fin: {reserva.endTime}
        </li>
      ))}
    </ul>
  </div>
);

export default ListaReservas;
