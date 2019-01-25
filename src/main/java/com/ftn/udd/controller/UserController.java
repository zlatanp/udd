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
            }
        }
        return "nill";
    }

    @RequestMapping(value = "/add", method = RequestMethod.GET, produces = "application/json")
    public void add(){

        User u1 = new User("email@mail.com", "12345", "testime", "lastname","NS", "Srb",UserType.USER, null, null);
        repository.save(u1);

    }

    @RequestMapping(value = "/getByEmail", method = RequestMethod.POST, produces = "application/json")
    public User getAllFromCategory(@RequestParam("email") String email){

        return repository.findByEmail(email);
    }

}
