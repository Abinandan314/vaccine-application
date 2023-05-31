import React from 'react';
import './App.css';
import Register from './components/Register';
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback } from "react";
import { logout } from "./slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Booking from './components/Bookings/Booking';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import VaccinationForm from './components/Vaccination/VaccinationForm';
import VaccinationCenters from './components/Vaccination/VaccinationCenters';
import AdminVaccinationCenters from './components/Vaccination/AdminVaccinationCenters';

function RouterComponent(){
    const { user: currentUser } = useSelector((state) => state.auth);
    const {admin:currentAdmin} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);
    return(
        <Router>
      <div data-testid="router-component">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
             Vaccine Application
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>
          {currentUser &&
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/bookSlot"} className="nav-link">
                  Book Vaccination Slot
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/viewBooking"} className="nav-link">
                  View Bookings
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          }
          {currentAdmin && 
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/vaccination"} className="nav-link">
                  Add New Vaccination
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/viewcentres"} className="nav-link">
                  View Added Centres
                </Link>
              </li>
              <li className="nav-item">
                <a href="/adminLogin" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
}{ (!currentUser && !currentAdmin) &&
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/adminLogin"} className="nav-link">
                  Admin Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/adminRegister"} className="nav-link">
                  Admin Signup
                </Link>
              </li>
            </div>
            
          }
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/adminRegister" element={<AdminRegister />} />
            <Route path="/vaccination" element={<VaccinationForm />} />
            <Route path="/viewcentres" element={<AdminVaccinationCenters/>} />
            <Route path="/bookSlot" element={<VaccinationCenters/>} />
            <Route path="/viewBooking" element={<Booking/>} />
          </Routes>
        </div>
      </div>
    </Router>
    )
}
export default RouterComponent;