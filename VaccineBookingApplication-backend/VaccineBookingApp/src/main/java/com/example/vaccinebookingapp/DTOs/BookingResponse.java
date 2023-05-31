package com.example.vaccinebookingapp.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingResponse{
    private String Id;
    private String username;
    private String location;
    private String centreNumber;
    private String workingHours;
}
