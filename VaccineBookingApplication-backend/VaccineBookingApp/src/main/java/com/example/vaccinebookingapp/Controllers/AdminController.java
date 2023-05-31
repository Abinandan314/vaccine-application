package com.example.vaccinebookingapp.Controllers;

import com.example.vaccinebookingapp.DTOs.UpdateSlotsDTO;
import com.example.vaccinebookingapp.Model.Admin;
import com.example.vaccinebookingapp.Model.VaccinationCentre;
import com.example.vaccinebookingapp.Services.AdminService;
import com.example.vaccinebookingapp.Services.VaccineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private VaccineService vaccineService;
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Admin admin){
        return adminService.createAdmin(admin);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin){
        return adminService.authenticateUser(admin);
    }
    @GetMapping()
    public ResponseEntity<?> getAllAdmins(){
        return new ResponseEntity<>(adminService.getAllAdmins(), HttpStatus.OK);
    }
    @PostMapping("/vaccine")
    public ResponseEntity<?> createVaccinationCentre(@RequestBody VaccinationCentre vaccinationCentre){
        return vaccineService.createVaccinationCentre(vaccinationCentre);
    }
    @GetMapping("/vaccine")
    public ResponseEntity<?> getAllVaccinationCentres(){
        return vaccineService.getAllVaccinationCentres();
    }
    @GetMapping("/vaccine/{location}")
    public ResponseEntity<?> getAllVaccinationCentresByLocation(@PathVariable(name = "location") String location){
        return vaccineService.getAllVaccinationCentresByLocation(location);
    }
    @PostMapping("/vaccine/add")
    public ResponseEntity<?> addMoreSlots(@RequestBody UpdateSlotsDTO updateSlotsDTO){
        System.out.println(updateSlotsDTO.getCentreNumber());
        System.out.println(updateSlotsDTO.getToBeAddedSlots());
        return vaccineService.updateSlotsAvailable(updateSlotsDTO.getCentreNumber(),updateSlotsDTO.getToBeAddedSlots());
    }
    @PostMapping("/vaccine/delete/{centreNumber}")
    public ResponseEntity<?> deleteVaccinationCentres(@PathVariable(name = "centreNumber") String centreNumber){
        return vaccineService.deleteVaccinationCentre(centreNumber);
    }
}
