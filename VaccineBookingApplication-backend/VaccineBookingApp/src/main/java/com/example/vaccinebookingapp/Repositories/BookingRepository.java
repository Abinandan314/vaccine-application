package com.example.vaccinebookingapp.Repositories;

import com.example.vaccinebookingapp.Model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends MongoRepository<Booking,String>{

    List<Optional<Booking>> findAllByUsername(String username);
}
