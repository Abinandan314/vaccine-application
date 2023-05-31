import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8080/admin/vaccine/{location}";

const AdminVaccinationCenters = () => {
  const [location, setCity] = useState('');
  const [vaccinationCenters, setVaccinationCenters] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a GET request using axios to retrieve vaccination centers by city
    axios.get(API_URL.replace('{location}', location))
      .then((response) => {
        console.log(response.data);
        setVaccinationCenters(response.data);
      })
      .catch((error) => {
        console.error(error);
        setVaccinationCenters([])
      });
  };
  

  const VaccinationCenterItem = ({ center }) => {
    const [toBeAddedSlots, setSlotsToUpdate] = useState();
    const handleUpdateSlots = () => {
      // Make a POST request to update the slots for a vaccination center
      const formData = {
        centreNumber : center.centreNumber,
        toBeAddedSlots,
      };
  
      axios.post(`http://localhost:8080/admin/vaccine/add`, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    const handleDeleteSlots = () => {
      axios.post(`http://localhost:8080/admin/vaccine/delete/${center.centreNumber}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    return (
      <div className="vaccination-center-item">
        <h4>{center.centreNumber}</h4>
        <p>Location: {center.location}</p>
        <p>Slots: {center.slotsAvailable}</p>
        <p>Vaccine: {center.vaccinesAvailable}</p>
        <p>Hours: {center.workingHours}</p>
        <div>
        <label>Update Slots:</label>
        <input
          type="number"
          value={toBeAddedSlots}
          onChange={(e) => setSlotsToUpdate(e.target.value)}
        />
        <button onClick={handleUpdateSlots}>Update</button>
        <button onClick={handleDeleteSlots}>Delete</button>
      </div>
      </div>
    );
  };

  return (
    <div className="admin-vaccination-centers">
      <h2>Search by Location</h2>
      <form onSubmit={handleSubmit} className='form-vaccine'>
        <label>Enter Location</label>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {vaccinationCenters.length > 0 ? (
        <div className="center-list">
          <h3>Vaccination Centers:</h3>
          {vaccinationCenters.map((center) => (
            <VaccinationCenterItem key={center.id} center={center} />
          ))}
        </div>
      ) : (
        <p>No vaccination centers found for the specified city.</p>
      )}
    </div>
  );
};

export default AdminVaccinationCenters;
