import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Table,Button } from 'react-bootstrap';
const API_URL = "http://localhost:8080/user/vaccine/view/";
function Booking() {
  const [transactions, setTransactions] = useState([]);
  const { user: currentUser } = useSelector((state) => state.auth);
  const username = currentUser.username;
  useEffect(() => {
    axios.post(API_URL + `${username}`)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
      });
  }, [username]);

  const handleAction = (centreNumber) => {
    // Send Axios request for the desired action
    axios.post(`http://localhost:8080/user/vaccine/cancel/${centreNumber}`)
      .then(response => {
      })
      .catch(error => {
        console.error(error);
      });
  };
  


  return (
    <div>
      <h2 className="text-center my-5">Booking History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Booking User</th>
            <th>Location</th>
            <th>Working Hours</th>
            <th>Center Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.username}</td>
              <td>{transaction.location}</td>
              <td >
                 {transaction.workingHours}
                </td>
              <td>{transaction.centreNumber}</td>
              <td>
              <Button variant="primary" onClick={() => handleAction(transaction.id)}>
                  Perform Action
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Booking;
