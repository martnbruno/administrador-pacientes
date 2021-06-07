import { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {
  // Citas en localstorage. Para usarlo se hace localStorage.getItem(debe almacenarse en una let). Localstorage solo almacena strings por eso para usarlo se usa JSON.parse y stringify para poder manipularlo. Si no hay citas iniciales, entonces estas seran igual a un arreglo vacio:
  let citasIniciales = JSON.parse(localStorage.getItem("citas"));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas traidas desde el formulario. El valor de inicio del state sera lo almacenado en el localstorage.
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia. Si hay citas iniciales las almacena y las coloca en el state. Si no queda ninguna cita devuelve un arreglo vacio:
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem("citas", JSON.stringify(citas));
    } else {
      localStorage.setItem("citas", JSON.stringify([]));
    }
  }, [citas, citasIniciales]);

  // Funcion que toma las citas actuales y agregua la nueva
  const crearCita = (cita) => {
    // Siempre tomar una copia del state primero antes de agregar la nueva.
    guardarCitas([...citas, cita]);
  };

  // Funcion que elimina una cita por su id. Se crea un nuevo arreglo (nuevasCitas) a partir de aplicar filter a citas. Filter devuelve todas las id que sean distintas a las que se clickea por eso el !==
  const eliminarCita = (id) => {
    const nuevasCitas = citas.filter((cita) => cita.id !== id);
    guardarCitas(nuevasCitas);
  };

  // Mensaje condicional. Antes del return se puede escribir condicionales con if. Despues de él solo se pueden usar ternarios.
  const titulo = citas.length === 0 ? "No hay citas" : "Administra tus citas";

  return (
    <>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario crearCita={crearCita} />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map((cita) => (
              <Cita key={cita.id} cita={cita} eliminarCita={eliminarCita} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Formulario.propTypes={
  crearCita: PropTypes.func.isRequired
}

export default App;
