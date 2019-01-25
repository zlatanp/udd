package com.ftn.udd.controller;

import com.ftn.udd.enumeration.UserType;
import com.ftn.udd.model.User;
import com.ftn.udd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository repository;

    @RequestMapping(value = "/add", method = RequestMethod.GET, produces = "application/json")
    public void add(){

        User u1 = new User("ime", "prezime", "NS", "Srb", "email@mail.com", UserType.USER, null, null);
        repository.save(u1);

    }

    @RequestMapping(value = "/getByEmail", method = RequestMethod.POST, produces = "application/json")
    public User getAllFromCategory(@RequestParam("email") String email){

        return repository.findByEmail(email);
    }

}
