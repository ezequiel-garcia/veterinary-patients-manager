import React, { Fragment, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const Form = ({ createAppointment }) => {
  //Create State for Appointments
  const [appointment, setAppointment] = useState({
    pet: "",
    owner: "",
    date: "",
    hour: "",
    symptoms: "",
  });

  const [error, setError] = useState(false);

  //Function to handle the form changes.

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAppointment({
      ...appointment,
      [name]: value,
    });
  };

  //extract values

  const { pet, owner, date, hour, symptoms } = appointment;

  //When the user press add appointment

  const submitAppointment = (e) => {
    e.preventDefault();

    //Validation
    if (
      pet.trim() === "" || //trim removes whitespace from both ends of a string
      owner.trim() === "" ||
      date.trim() === "" ||
      hour.trim() === "" ||
      symptoms.trim() === ""
    ) {
      setError(true);
      return;
    }
    //Delete the previous message
    setError(false);

    //Assing ID
    appointment.id = uuidv4();

    //Create Appointment
    createAppointment(appointment);

    //Restart the form
    setAppointment({
      pet: "",
      owner: "",
      date: "",
      hour: "",
      symptoms: "",
    });
  };

  return (
    <Fragment>
      <h2>Create Appointment</h2>

      {error ? <p className="alert-error">All fields are required</p> : null}

      <form onSubmit={submitAppointment}>
        <label>Pet Name</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Pet Name"
          onChange={handleChange}
          value={pet}
        />

        <label>Owner Name</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="pet owner's name"
          onChange={handleChange}
          value={owner}
        />

        <label>Date</label>
        <input
          type="date"
          name="date"
          className="u-full-width"
          onChange={handleChange}
          value={date}
        />

        <label>Hour</label>
        <input
          type="time"
          name="hour"
          className="u-full-width"
          onChange={handleChange}
          value={hour}
        />

        <label>Symptoms</label>
        <textarea
          name="symptoms"
          className="u-full-width"
          onChange={handleChange}
          value={symptoms}
        ></textarea>

        <button type="submit" className="u-full-width button-primary">
          Add Appointment
        </button>
      </form>
    </Fragment>
  );
};

Form.propTypes = {
  createAppointment: PropTypes.func.isRequired,
};

export default Form;
