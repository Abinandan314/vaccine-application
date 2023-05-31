package com.example.vaccinebookingapp.Services;

import com.example.vaccinebookingapp.Model.User;
import com.example.vaccinebookingapp.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
    public ResponseEntity<?> createUser(User user){
        if(userRepository.findByUsername(user.getUsername()).isPresent()){
            return new ResponseEntity<>("Already Exists", HttpStatus.NOT_ACCEPTABLE);
        }
        userRepository.save(user);
        return new ResponseEntity<>("User created",HttpStatus.OK);
    }
    public ResponseEntity<?> authenticateUser(User currentUser){
        List<User> userList = userRepository.findAll();
        Optional<User> optionalUser = userList.stream().filter(user -> {
            return user.getUsername().equals(currentUser.getUsername()) && user.getPassword().equals(currentUser.getPassword());
        }).findFirst();
        if(!optionalUser.isPresent()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid Credentials");
        }
        return new ResponseEntity<>(userRepository.findByUsername(currentUser.getUsername()),HttpStatus.OK);
    }
    public List<User> getAllUsers(){return userRepository.findAll();}
}
