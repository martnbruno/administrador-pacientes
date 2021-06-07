import React from "react";
import PropTypes from "prop-types";

const Cita = ({ cita, eliminarCita }) => {
  return (
    <div className="cita">
      <p>
        Mascota: {cita.mascota}
        <span></span>
      </p>
      <p>
        Dueño: {cita.propietario}
        <span></span>
      </p>
      <p>
        Fecha: {cita.fecha}
        <span></span>
      </p>
      <p>
        Hora: {cita.hora}
        <span></span>
      </p>
      <p>
        Sintomas: {cita.sintomas}
        <span></span>
      </p>
      <button
        className="button eliminar u-full-width"
        onClick={() => eliminarCita(cita.id)}
      >
        Eliminar &times;
      </button>
    </div>
  );
};

Cita.propTypes = {
  cita: PropTypes.object.isRequired,
  eliminarCita: PropTypes.func.isRequired,
};

export default Cita;
