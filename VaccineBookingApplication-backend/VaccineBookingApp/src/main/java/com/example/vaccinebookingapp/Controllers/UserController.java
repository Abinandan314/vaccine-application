package com.example.vaccinebookingapp.Controllers;

import com.example.vaccinebookingapp.DTOs.VaccinationRequestBody;
import com.example.vaccinebookingapp.Model.User;
import com.example.vaccinebookingapp.Services.UserService;
import com.example.vaccinebookingapp.Services.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private VaccineService vaccineService;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody  User user){
        return userService.createUser(user);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        return userService.authenticateUser(user);
    }
    @GetMapping()
    public ResponseEntity<?> getAllUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    @GetMapping("/vaccine")
    public ResponseEntity<?> getAvailableVaccinationCentres(){
        return vaccineService.getAllVaccinationCentres();
    }
    @PostMapping("/vaccine/find")
    public ResponseEntity<?> getAvailableVaccinationCentresByDateAndMonth(@RequestBody VaccinationRequestBody vaccinationRequestBody){
        return vaccineService.getRequiredVaccinationCentres(vaccinationRequestBody);
    }
    @PostMapping("/vaccine/book/{centreNumber}")
    public ResponseEntity<?> bookVaccinationCentre(@PathVariable(name = "centreNumber")String centreNumber,@RequestBody String username){

        return vaccineService.bookVaccinationCentre(centreNumber,username);
    }
    @PostMapping("/vaccine/cancel/{centreNumber}")
    public ResponseEntity<?> cancelVaccinationBooking(@PathVariable(name = "centreNumber")String centreNumber){
        return vaccineService.cancelBooking(centreNumber);
    }
    @PostMapping("/vaccine/view/{username}")
    public ResponseEntity<?> viewAllMyBookings(@PathVariable(name = "username")String username){
        return vaccineService.viewMyBookings(username);
    }
}
