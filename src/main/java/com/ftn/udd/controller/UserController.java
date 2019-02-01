package com.ftn.udd.controller;

import com.ftn.udd.enumeration.UserType;
import com.ftn.udd.model.AreaCode;
import com.ftn.udd.model.User;
import com.ftn.udd.repository.AreaCodeRepository;
import com.ftn.udd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AreaCodeRepository areaCodeRepository;

    @RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
    public String login(@RequestParam("email") String email, @RequestParam("password") String password){

        System.out.println(email + password);
        if(email.isEmpty() || password.isEmpty())
            return "nill";

        User u = userRepository.findByEmail(email);
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
    public String register(@RequestParam("email") String email, @RequestParam("pass") String pass, @RequestParam("passRepeat") String passRepeat, @RequestParam("firstName") String firstname, @RequestParam("lastName") String lastName, @RequestParam("city") String city, @RequestParam("country") String country, @RequestParam("type") String type, @RequestParam("area[]") String[] area){

        System.out.println(type);
        if(email.isEmpty() || pass.isEmpty() || passRepeat.isEmpty() || firstname.isEmpty() || lastName.isEmpty() || city.isEmpty() || country.isEmpty())
            return "nill";

        if(!pass.equals(passRepeat))
            return "passwordmatch";

        User u = userRepository.findByEmail(email);
        if(u != null) {
            return "used";
        }else {
            if (type.equals("User")) {
                User user = new User(email, pass, firstname, lastName, city, country, UserType.USER, null);
                userRepository.save(user);
            }else if (type.equals("Author")) {
                User user = new User(email, pass, firstname, lastName, city, country, UserType.AUTHOR, null);
                userRepository.save(user);
            }else{
                ArrayList<AreaCode> areaCodes = new ArrayList<AreaCode>();
                for (String a : Arrays.asList(area)) {
                    AreaCode acObject = areaCodeRepository.findByName(a);
                    areaCodes.add(acObject);
                }

                User user = new User(email, pass, firstname, lastName, city, country, UserType.CHIEF_EDITOR, areaCodes);
                userRepository.save(user);
            }
            return "ok";
        }
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET, produces = "application/json")
    public List<User> getAll(){

        return userRepository.findAll();
    }

    @RequestMapping(value = "/init", method = RequestMethod.GET, produces = "application/json")
    public void initUsers(){
        ArrayList<AreaCode> areaCodes1 = new ArrayList<AreaCode>();
        AreaCode a1 = areaCodeRepository.findByName("Arhitektura i urbanizam");
        areaCodes1.add(a1);
        User u1 = new User("zaha@mail.com", "zahahadid", "Zaha", "Hadid", "Baghdad", "Iraq", UserType.CHIEF_EDITOR, areaCodes1);
        userRepository.save(u1);

        ArrayList<AreaCode> areaCodes2 = new ArrayList<AreaCode>();
        AreaCode a2 = areaCodeRepository.findByName("Bioloske nauke");
        areaCodes2.add(a2);
        User u2 = new User("jukka@mail.com", "jukkafinne", "Jukka", "Finne", "Helsinki", "Finland", UserType.CHIEF_EDITOR, areaCodes2);
        userRepository.save(u2);

        ArrayList<AreaCode> areaCodes3 = new ArrayList<AreaCode>();
        AreaCode a3 = areaCodeRepository.findByName("Umetnost");
        areaCodes3.add(a3);
        User u3 = new User("genevieve@mail.com", "genevieve", "Genevieve", "Fussell", "Pasadena", "United States", UserType.CHIEF_EDITOR, areaCodes3);
        User u4 = new User("dustin@mail.com", "ddrankoski", "Dustin", "Drankoski", "New York", "United States", UserType.CHIEF_EDITOR, areaCodes3);
        User u5 = new User("ilaria@mail.com", "ilaria1234", "Ilaria", "Cianchetta", "Rome", "Italy", UserType.CHIEF_EDITOR, areaCodes3);
        User u6 = new User("fenglin@mail.com", "fenglin1", "Fenglin", "Liao", "Shanghai", "China", UserType.CHIEF_EDITOR, areaCodes3);
        userRepository.save(u3);
        userRepository.save(u4);
        userRepository.save(u5);
        userRepository.save(u6);

        ArrayList<AreaCode> areaCodes7 = new ArrayList<AreaCode>();
        AreaCode a7 = areaCodeRepository.findByName("Fizika");
        areaCodes7.add(a7);
        User u7 = new User("barry@mail.com", "barrysanders", "Barry", "Sanders", "Wichita", "United States", UserType.CHIEF_EDITOR, areaCodes7);
        userRepository.save(u7);

        ArrayList<AreaCode> areaCodes8 = new ArrayList<AreaCode>();
        AreaCode a8 = areaCodeRepository.findByName("Hemija");
        areaCodes8.add(a8);
        User u8 = new User("robert@mail.com", "robert1234", "Robert", "Eagling", "Newcastle", "England", UserType.CHIEF_EDITOR, areaCodes8);
        userRepository.save(u8);

        ArrayList<AreaCode> areaCodes9 = new ArrayList<AreaCode>();
        AreaCode a9 = areaCodeRepository.findByName("Sport");
        areaCodes9.add(a9);
        User u9 = new User("imhoff@mail.com", "imhoff1234", "Juan", "Imhoff", "Munich", "Germany", UserType.CHIEF_EDITOR, areaCodes9);
        User u10 = new User("walter@mail.com", "walter1234", "Walter", "Herzog", "Calgary", "Canada", UserType.CHIEF_EDITOR, areaCodes9);
        userRepository.save(u9);
        userRepository.save(u10);

        ArrayList<AreaCode> areaCodes11 = new ArrayList<AreaCode>();
        AreaCode a11 = areaCodeRepository.findByName("Medicinske nauke");
        areaCodes11.add(a11);
        User u11 = new User("antoni@mail.com", "antoni1234", "Antoni", "Torres", "Barcelona", "Spain", UserType.CHIEF_EDITOR, areaCodes11);
        userRepository.save(u11);

        ArrayList<AreaCode> areaCodes12 = new ArrayList<AreaCode>();
        AreaCode a12 = areaCodeRepository.findByName("Masinstvo");
        areaCodes12.add(a12);
        User u12 = new User("simone@mail.com", "simone1234", "Simone", "Beninati", "Rome", "Italy", UserType.CHIEF_EDITOR, areaCodes12);
        userRepository.save(u12);

        ArrayList<AreaCode> areaCodes13 = new ArrayList<AreaCode>();
        AreaCode a13 = areaCodeRepository.findByName("Racunarstvo i informatika");
        areaCodes13.add(a13);
        User u13 = new User("wei@mail.com", "weii1234", "Wei", "Duan", "Victoria", "Australia", UserType.CHIEF_EDITOR, areaCodes13);
        userRepository.save(u13);

        ArrayList<AreaCode> areaCodes14 = new ArrayList<AreaCode>();
        AreaCode a14 = areaCodeRepository.findByName("Drustvene nauke");
        areaCodes14.add(a14);
        User u14 = new User("ashley@mail.com", "ashley1234", "Ashley", "Grossman", "Oxford", "England", UserType.CHIEF_EDITOR, areaCodes14);
        User u15 = new User("hungyun@mail.com", "hungyun1234", "Hung-Yun", "Lin", "Taipei", "Taiwan", UserType.CHIEF_EDITOR, areaCodes14);
        userRepository.save(u14);
        userRepository.save(u15);
    }


}
