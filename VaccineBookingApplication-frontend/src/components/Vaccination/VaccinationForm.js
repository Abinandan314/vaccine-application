import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

import './VaccinationForm.css';
const API_URL = "http://localhost:8080/admin/vaccine";

const VaccinationForm = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [centreNumber, setCenterNumber] = useState('');
  const [location, setLocation] = useState('');
  const [availableDate, setDate] = useState(0);
  const [availableMonth, setMonth] = useState(0);
  const [vaccinesAvailable, setVaccineDosage] = useState('');
  const [slotsAvailable, setSlotsAvailable] = useState(0);
  const [workingHours, setAdditionalInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      centreNumber,
      slotsAvailable,
      location,
      vaccinesAvailable,
      availableDate,
      availableMonth,
      workingHours,
    };

    // Make a POST request using axios
    axios.post(API_URL, formData)
      .then((response) => {
        console.log(response.data);
        // Reset the form
        setCenterNumber('');
        setLocation('');
        setDate(0);
        setMonth(0);
        setVaccineDosage('');
        setSlotsAvailable(0);
        setAdditionalInfo('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='vaccination-form-center'>
    <div className="vaccination-form-container">
      <Typography variant="h4" component="h2" align="center" className="form-title">
        Vaccination Form
      </Typography>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          label="Centre Number"
          variant="outlined"
          value={centreNumber}
          onChange={(e) => setCenterNumber(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          required
        />
        <Box display="flex">
          <TextField
            label="Date"
            variant="outlined"
            value={availableDate}
            type='number'
            inputProps={{max : 30}}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <TextField
            label="Month"
            variant="outlined"
            type='number'
            inputProps={{max : 12}}
            value={availableMonth}
            onChange={(e) => setMonth(e.target.value)}
            required
          />
        </Box>
        <TextField
          label="Vaccine Dosage"
          variant="outlined"
          value={vaccinesAvailable}
          onChange={(e) => setVaccineDosage(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Slots Available"
          variant="outlined"
          type='number'
          value={slotsAvailable}
          onChange={(e) => setSlotsAvailable(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Working Hours"
          variant="outlined"
          multiline
          rows={4}
          value={workingHours}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className="submit-button"
        >
          Submit
        </Button>
      </form>
    </div>
    </div>
  );
};

export default VaccinationForm;
