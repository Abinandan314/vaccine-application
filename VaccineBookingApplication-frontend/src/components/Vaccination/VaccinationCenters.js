import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './VaccinationCenters.css'
const API_URL = "http://localhost:8080/user/vaccine/find";

const VaccinationCenters = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [date, setDate] = useState();
  const [month, setMonth] = useState();
  const [location, setLocation] = useState('');
  const [vaccinationCenters, setVaccinationCenters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date,
      month,
      location
    };
    // Make a GET request using axios to retrieve vaccination centers
    axios.post(API_URL,formData)
      .then((response) => {
        setVaccinationCenters(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleBooking = (centerId) => {
    // Make a POST request to book an appointment for a vaccination center
    
    const formData = {
      date,
      month,
      location
    };
    axios.post(`http://localhost:8080/user/vaccine/book/${centerId}`,user.username)
      .then((response) => {
        console.log(response.data);
        // Make a GET request using axios to retrieve vaccination centers
        axios.post(API_URL,formData)
          .then((response) => {
            console.log(response.data);
            setVaccinationCenters(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const VaccinationCenterItem = ({ center }) => {
    const handleBookAppointment = () => {
      if (center.slotsAvailable === 0) {
        return; // Don't execute further if slotsAvailable is 0
      }
      handleBooking(center.centreNumber);
    };
    const itemStyle = {
      backgroundColor: center.slotsAvailable === 0 ? 'lightcoral' : 'lightgreen',
    };
    return (
      <div className="vaccination-center-item" style={itemStyle}>
        <h4>{center.centreNumber}</h4>
        <p>Location: {center.location}</p>
        <p>Slots: {center.slotsAvailable}</p>
        <p>Vaccine: {center.vaccinesAvailable}</p>
        <p>Hours: {center.workingHours}</p>
        <button type='submit' onClick={handleBookAppointment}>Book Appointment</button>
      </div>
    );
  };
  return (
    <div className="vaccination-centers">
      <h2>Available Vaccination Centres</h2>
      <form onSubmit={handleSubmit} className='form-vaccine'>
        <label>Day of Month</label>
        <input
          type="number"
          placeholder="Enter Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          max={30}
        />
        <label>Month</label>
        <input
          type="number"
          placeholder="Enter Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
          max={12}
        />
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {vaccinationCenters.length > 0 ? (
        <div className="center-list">
          <h3>Vaccination Centers:</h3>
          {vaccinationCenters.map((center) => (
            <VaccinationCenterItem key={center.id} center={center} />
          ))}
        </div>
      ) : (
        <p>No vaccination centers found for the specified date and month.</p>
      )}
    </div>
  );
};

export default VaccinationCenters;
