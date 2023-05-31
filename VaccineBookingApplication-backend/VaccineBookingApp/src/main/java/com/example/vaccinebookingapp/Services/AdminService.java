package com.example.vaccinebookingapp.Services;

import com.example.vaccinebookingapp.Model.Admin;
import com.example.vaccinebookingapp.Model.User;
import com.example.vaccinebookingapp.Repositories.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {
    @Autowired
    private AdminRepository adminRepository;
    public ResponseEntity<?> createAdmin(Admin admin){
        if(adminRepository.findByUsername(admin.getUsername()).isPresent()){
            return new ResponseEntity<>("Admin already exists", HttpStatus.NOT_ACCEPTABLE);
        }
        adminRepository.save(admin);
        return new ResponseEntity<>("Admin Created",HttpStatus.OK);
    }
    public ResponseEntity<?> authenticateUser(Admin currentAdmin){
        List<Admin> adminList = adminRepository.findAll();
        Optional<Admin> optionalAdmin = adminList.stream().filter(admin -> {
             return admin.getUsername().equals(currentAdmin.getUsername()) && admin.getPassword().equals(currentAdmin.getPassword());
        }).findFirst();
        if(!optionalAdmin.isPresent()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Credentials");
        }
        return new ResponseEntity<>(adminRepository.findByUsername(currentAdmin.getUsername()),HttpStatus.OK);
    }
    public List<Admin> getAllAdmins(){
        return adminRepository.findAll();
    }
}
