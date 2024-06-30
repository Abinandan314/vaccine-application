# Vaccine Application
- This is a vaccine application that allows users to book slots for vaccination, cancel their bookings, view open slots, and allows third-party vendors to register their vaccination centers and update the dosage, vaccine details, and slot availability.
[Outcomes Overview](appDesign/Readme.md)

## Demo Video

[Demo Video](https://drive.google.com/file/d/1WfmOxt85IZGkNkjHwpJJ1pW77qLL6ltw/view?usp=drive_link)


## System Design

![System Design](design/System%20Design.PNG)

The system design diagram illustrates the architecture and flow of the vaccine application.

## Happy Path For User and Admin
![Happy Path For User](design/User%20Happy%20Path.PNG)

The system design diagram illustrates the User flow of the vaccine application.

![Happy Path for Admin](design/Admin%20Happy%20Path.PNG)

The system design diagram illustrates the Admin flow of the vaccine application.


## Technologies Used

- Front-end: React JS
- Back-end: Spring Framework
- Database: MongoDB

## Features

- User Registration and Login: Users can register and login to their accounts to access the application.
- Booking Slots: Users can view available slots and book appointments for vaccination.
- Cancel Bookings: Users can cancel their booked appointments.
- Open Slot View: Users can view available slots for vaccination without booking.
- Vendor Registration: Third-party vendors can register their vaccination centers.
- Update and Delete Center Details: Vendors can update the dosage, vaccine details, and slot availability for their centers.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd vaccine-application`
3. Install dependencies: `npm install`
4. Start the React development server: `npm start`
5. Open your browser and access the application at `http://localhost:3000`

## Backend Setup

1. Install Java Development Kit (JDK) and set up Java environment.
2. Install MongoDB and start the MongoDB server.
3. Import the backend project into your preferred IDE.
4. Configure the MongoDB connection in the `application.properties` file.
5. Build and run the Spring application.

