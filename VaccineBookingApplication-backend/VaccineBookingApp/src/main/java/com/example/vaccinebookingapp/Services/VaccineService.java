package com.example.vaccinebookingapp.Services;

import com.example.vaccinebookingapp.DTOs.BookingResponse;
import com.example.vaccinebookingapp.DTOs.VaccinationRequestBody;
import com.example.vaccinebookingapp.Model.Booking;
import com.example.vaccinebookingapp.Model.VaccinationCentre;
import com.example.vaccinebookingapp.Repositories.BookingRepository;
import com.example.vaccinebookingapp.Repositories.VaccinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VaccineService {
    @Autowired
    private VaccinationRepository vaccinationRepository;
    @Autowired
    private BookingRepository bookingRepository;
    public ResponseEntity<?> createVaccinationCentre(VaccinationCentre vaccinationCentre){
        if (vaccinationRepository.findByCentreNumber(vaccinationCentre.getCentreNumber()).isPresent()){
            return new ResponseEntity<>("Vaccination centre with given centre Number already exists",HttpStatus.NOT_ACCEPTABLE);
        }
        vaccinationRepository.save(vaccinationCentre);
        return new ResponseEntity<>("Vaccination Centre Added",HttpStatus.OK);
    }
    public ResponseEntity<?> deleteVaccinationCentre(String centreNumber){
        Optional<VaccinationCentre> vaccinationCentre = vaccinationRepository.findByCentreNumber(centreNumber);
        if(vaccinationCentre.isEmpty()){
            return new ResponseEntity<>("No vaccination Centres Found",HttpStatus.NOT_FOUND);
        }
        vaccinationRepository.delete(vaccinationCentre.get());
        return new ResponseEntity<>("Centre Deleted Successfully",HttpStatus.OK);
    }
    public ResponseEntity<?> getAllVaccinationCentres(){
        return new ResponseEntity<>(vaccinationRepository.findAll(), HttpStatus.OK);
    }
    public ResponseEntity<?> getAllVaccinationCentresByLocation(String location){
List<VaccinationCentre> vaccinationCentreList = vaccinationRepository.findAllByLocation(location)
        .stream().flatMap(Optional::stream).collect(Collectors.toList());
        if (vaccinationCentreList.size() == 0){
            return new ResponseEntity<>(vaccinationCentreList,HttpStatus.OK);
        }
        return new ResponseEntity<>(vaccinationCentreList,HttpStatus.OK);
    }
    public ResponseEntity<?> getRequiredVaccinationCentres(VaccinationRequestBody vaccine){
        List<Optional<VaccinationCentre>> vaccinationCentres = vaccinationRepository.findAllByAvailableDateAndAndAvailableMonthAndAndLocation(vaccine.getDate(),vaccine.getMonth(),vaccine.getLocation());
        List<VaccinationCentre> list = vaccinationCentres.stream().flatMap(Optional::stream).collect(Collectors.toList());
        if(list.isEmpty()){
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
        return new ResponseEntity<>(list,HttpStatus.OK);
    }
    public ResponseEntity<?> bookVaccinationCentre(String id,String username){
        Optional<VaccinationCentre> vaccinationCentre = vaccinationRepository.findByCentreNumber(id);
        if(vaccinationCentre.isEmpty()){
            return new ResponseEntity<>("Id Not Found",HttpStatus.NOT_FOUND);
        }
        int initialValue = vaccinationCentre.get().getSlotsAvailable();
        if (initialValue == 0){
            return new ResponseEntity<>("Slot already Filled",HttpStatus.NOT_ACCEPTABLE);
        }
        initialValue--;
        vaccinationCentre.get().setSlotsAvailable(initialValue);
        vaccinationRepository.save(vaccinationCentre.get());
        Booking booking = new Booking();
        booking.setCentreNumber(id);
        booking.setUsername(username.substring(0,username.length()-1));
        bookingRepository.save(booking);
        return new ResponseEntity<>("Vaccination Slot Booked",HttpStatus.OK);
    }
    public ResponseEntity<?> updateSlotsAvailable(String id,int toBeAddedSlots){
        Optional<VaccinationCentre> vaccinationCentre = vaccinationRepository.findByCentreNumber(id);
        if(vaccinationCentre.isEmpty()){
            return new ResponseEntity<>("Id Not Found",HttpStatus.NOT_FOUND);
        }
        vaccinationCentre.get().setSlotsAvailable(vaccinationCentre.get().getSlotsAvailable() + toBeAddedSlots);
        vaccinationRepository.save(vaccinationCentre.get());
        return new ResponseEntity<>("Successfully Updated",HttpStatus.OK);
    }
    public ResponseEntity<?> cancelBooking(String id){
        Optional<Booking> booking = bookingRepository.findById(id);
        Optional<VaccinationCentre> vaccinationCentre = vaccinationRepository.findByCentreNumber(booking.get().getCentreNumber());
        vaccinationCentre.get().setSlotsAvailable(vaccinationCentre.get().getSlotsAvailable() + 1);
        vaccinationRepository.save(vaccinationCentre.get());
        bookingRepository.delete(bookingRepository.findById(id).get());
        return new ResponseEntity<>("Successfully Updated",HttpStatus.OK);
    }
    public ResponseEntity<?> viewMyBookings(String id){
        List<Booking> bookingList = bookingRepository.findAllByUsername(id)
                .stream()
                .flatMap(Optional::stream)
                .collect(Collectors.toList());
        List<BookingResponse> bookingResponseList = new ArrayList<>();
        for (int i=0;i<bookingList.size();i++){
            BookingResponse bookingResponse = new BookingResponse();
            bookingResponse.setUsername(bookingList.get(i).getUsername());
            bookingResponse.setCentreNumber(bookingList.get(i).getCentreNumber());
            String location = vaccinationRepository.findByCentreNumber(bookingList.get(i).getCentreNumber()).get().getLocation();
            String workingHours = vaccinationRepository.findByCentreNumber(bookingList.get(i).getCentreNumber()).get().getWorkingHours();
            bookingResponse.setWorkingHours(workingHours);
            bookingResponse.setLocation(location);
            bookingResponse.setId(bookingList.get(i).getId());
            bookingResponseList.add(bookingResponse);
        }
        return new ResponseEntity<>(bookingResponseList,HttpStatus.OK);
    }
    
}
