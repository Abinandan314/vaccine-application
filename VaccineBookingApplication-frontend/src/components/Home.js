import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

import './Home.css';

function Home() {
  return (
    <Container >
        <h2 className="text-center my-5">Welcome to the Official Vaccine Booking Application</h2>
      <Row className="justify-content-center">
        <Col xs={12} sm={4} className="my-3">
          <Card className="h-100 shadow rounded-lg p-4" style={{backgroundColor: '#8EA2FF'}}>
            <Card.Body>
              <Card.Title className="text-center text-white mb-4">View Open Vaccination Centres</Card.Title>
              <Card.Text className="text-center mb-5 text-white">
                View Open Vaccination Centres, sort them by Location, Available Date and Month
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} className="my-3">
          <Card className="h-100 shadow rounded-lg p-4" style={{backgroundColor: '#FFB6C1'}}>
            <Card.Body>
              <Card.Title className="text-center text-white mb-4">Book Vaccination Slots</Card.Title>
              <Card.Text className="text-center mb-5 text-white">
                Book suitable Vaccination slots, view type of dosage
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={4} className="my-3">
          <Card className="h-100 shadow rounded-lg p-4" style={{backgroundColor: '#90EE90'}}>
            <Card.Body>
              <Card.Title className="text-center text-white mb-4">Manage Vaccination Centres</Card.Title>
              <Card.Text className="text-center mb-5 text-white">
                As a third party Vaccination vendor, Add new Vaccination centres, adding details about vaccines.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
