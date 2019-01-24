package com.ftn.udd.model;

import com.ftn.udd.enumeration.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class User {

    private String firstName;
    private String lastName;
    private String city;
    private String country;
    private String email;
    private UserType title;
    private List<Journal> journals;
    private List<AreaCode> areaCodes;

    public User(String firstName, String lastName, String city, String country, String email, UserType title, List<Journal> journals, List<AreaCode> areaCodes) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.country = country;
        this.email = email;
        this.title = title;
        this.journals = journals;
        this.areaCodes = areaCodes;
    }
}
