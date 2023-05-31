package com.example.vaccinebookingapp.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateSlotsDTO {
    private String centreNumber;
    private int toBeAddedSlots;
}
