import React, { Fragment, useState, useEffect } from "react";
import Form from "./components/Form";
import Appointment from "./components/Appointment";

function App() {
  // Appointments in local storage
  let initialAppointments = JSON.parse(localStorage.getItem("appointments"));
  if (!initialAppointments) {
    initialAppointments = [];
  }

  // Array appointments
  const [appointments, setAppointments] = useState(initialAppointments);

  // Use Effect to realize some operations when the state changes.
  useEffect(() => {
    if (appointments) {
      localStorage.setItem("appointments", JSON.stringify(appointments));
    } else {
      localStorage.setItem("appointments", JSON.stringify([]));
    }
  }, [appointments]);

  // Function that takes the actual appointments and add the new one
  const createAppointment = (appointment) => {
    setAppointments([...appointments, appointment]);
  };

  // Function that delete appointment by ID

  const deleteAppointment = (id) => {
    const newAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );
    setAppointments(newAppointments);
  };

  // Conditional Message
  const title =
    appointments.length === 0 ? "No appointments" : "Manage your Appointments";

  return (
    <Fragment>
      <h1>Veterinary Patients Manager</h1>

      <div className="container">
        <div className="row container-content">
          <div className="one-half column">
            <Form createAppointment={createAppointment} />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {appointments.map((appointment) => (
              <Appointment
                key={appointment.id}
                appointment={appointment}
                deleteAppointment={deleteAppointment}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
