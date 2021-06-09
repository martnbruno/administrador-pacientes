import React from "react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Formulario = ({ crearCita }) => {
  //Crear State de Citas:
  const [cita, actualizarCita] = useState({
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  });

  // Crear state de error de validación. Tambien podria comenzar como null en vez de false.
  const [error, actualizarError] = useState(false);

  // Funcion que se ejecuta cada vez que el usuario escribe en un input. Se le pasa un evento cada vez que cambia el input:
  const actualizarState = (e) => {
    actualizarCita({
      // Usando el spread operator se evita que cada vez que se escriba un value en otro input se reemplace lo escrito en el anterior, y en lugar de eso se acumulen:
      ...cita,
      // Actualiza el state haciendo que el atributo name del input sea igual a lo escrito por el usuario:
      [e.target.name]: e.target.value,
    });
  };

  //   Extraer los valores, cada uno corresponde a un atributo value:

  const { mascota, propietario, fecha, hora, sintomas } = cita;

  // Cuando el usuario envia el formulario presionando agregar cita:
  const submitCita = (e) => {
    // Previene la accion por default (enviar el query string generado por metodo GET)
    e.preventDefault();
    // Primero validar que el usuario llene todos los campos. El metodo .trim() elimina los espacios de lo escrito para hacer una validacion mas exacta.
    if (
      mascota.trim() === "" ||
      propietario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      actualizarError(true);
      return;
    }
    // En caso que pase la validacion, actualizarError vuelve a false aunque en algun momento haya sido true:
    actualizarError(false);

    // Asignar un ID. Al mostrar registros repetidos es necesario darle a cada uno una key que suele ser igual al id. No es buena practica usar el index de cada elemento en el arreglo, por eso se toma el id. Se usa npm i uuid o npm i shortid para generar ids de prueba ante la ausencia de base de datos.
    cita.id = uuidv4();

    // Crear la cita (colocarla en el state principal). Se le pasa la funcion crearCita creada en App.js.
    crearCita(cita);

    // Reiniciar el form.
    actualizarCita({
      mascota: "",
      propietario: "",
      fecha: "",
      hora: "",
      sintomas: ""
    });
  };

  return (
    <>
      <h2>Crear Cita</h2>

      {error ? (
        <p className="alerta-error">Todos los campos son obligatorios</p>
      ) : null}

      <form onSubmit={submitCita}>
        <label htmlFor="">Nombre mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre de la mascota"
          onChange={actualizarState}
          value={mascota}
        />
        <label htmlFor="">Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño de la mascota"
          onChange={actualizarState}
          value={propietario}
        />
        <label htmlFor="">Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />
        <label htmlFor="">Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />
        <label htmlFor="">Sintomas</label>
        <textarea
          name="sintomas"
          className="u-full-width"
          placeholder="Describir síntomas.."
          onChange={actualizarState}
          value={sintomas}
        ></textarea>
        <button type="submit" className="u-full-width button-primary">
          Agregar Cita
        </button>
      </form>
    </>
  );
};

export default Formulario;
