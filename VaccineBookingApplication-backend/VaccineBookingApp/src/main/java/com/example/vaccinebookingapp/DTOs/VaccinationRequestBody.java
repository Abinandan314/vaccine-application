package com.example.vaccinebookingapp.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VaccinationRequestBody {
    private int date;
    private int month;
    private String location;
}
