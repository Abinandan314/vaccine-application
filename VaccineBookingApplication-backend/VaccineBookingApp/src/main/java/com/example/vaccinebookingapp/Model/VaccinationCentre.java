package com.example.vaccinebookingapp.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "vaccinationCentres")
public class VaccinationCentre {
    @Id
    private String id;
    private String centreNumber;
    private int slotsAvailable;
    private String location;
    private String vaccinesAvailable;
    private int availableDate;
    private int availableMonth;
    private String workingHours;
}
