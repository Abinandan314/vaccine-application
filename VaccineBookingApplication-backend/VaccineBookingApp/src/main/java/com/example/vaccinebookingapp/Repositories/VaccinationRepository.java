package com.example.vaccinebookingapp.Repositories;

import com.example.vaccinebookingapp.Model.VaccinationCentre;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VaccinationRepository extends MongoRepository<VaccinationCentre, String> {
    List<Optional<VaccinationCentre>> findAllByAvailableDateAndAndAvailableMonth(int dayOfMonth,int Month);
    List<Optional<VaccinationCentre>> findAllByLocation(String location);
    Optional<VaccinationCentre> findByCentreNumber(String centreNumber);
    List<Optional<VaccinationCentre>> findAllByAvailableDateAndAndAvailableMonthAndAndLocation(int dayOfMonth,int Month,String location);
}
