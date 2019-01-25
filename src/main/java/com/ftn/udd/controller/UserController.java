package com.ftn.udd.controller;

import com.ftn.udd.enumeration.UserType;
import com.ftn.udd.model.User;
import com.ftn.udd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository repository;

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public String login(@RequestParam("email") String email, @RequestParam("password") String password){

        System.out.println(email + password);
        if(email.isEmpty() || password.isEmpty())
            return "nill";

        User u = repository.findByEmail(email);
        if(u == null) {
            return "nouser";
        }else{
            if(!u.getPassword().equals(password)){
                return "badpass";
            }else{
                if(u.getUserType().equals(UserType.USER))
                    return "ok";
                if(u.getUserType().equals(UserType.AUTHOR))
                    return "author";
                if(u.getUserType().equals(UserType.CHIEF_EDITOR))
                    return "chiefeditor";
                if(u.getUserType().equals(UserType.ADMIN))
                    return "admin";
            }
        }
        return "nill";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
    public String register(@RequestParam("email") String email, @RequestParam("pass") String pass, @RequestParam("passRepeat") String passRepeat, @RequestParam("firstName") String firstname, @RequestParam("lastName") String lastName, @RequestParam("city") String city, @RequestParam("country") String country, @RequestParam("type") String type){

        System.out.println(type);
        if(email.isEmpty() || pass.isEmpty() || passRepeat.isEmpty() || firstname.isEmpty() || lastName.isEmpty() || city.isEmpty() || country.isEmpty())
            return "nill";

        if(!pass.equals(passRepeat))
            return "passwordmatch";

        User u = repository.findByEmail(email);
        if(u != null) {
            return "used";
        }else {
            if (type.equals("USER") || type.equals("Author")) {
                User user = new User(email, pass, firstname, lastName, city, country, UserType.USER, null);
                repository.save(user);
            }else{
                //Area codes iz sifarnika
                User user = new User(email, pass, firstname, lastName, city, country, UserType.USER, null);
                repository.save(user);
            }
            return "ok";
        }
    }

}
