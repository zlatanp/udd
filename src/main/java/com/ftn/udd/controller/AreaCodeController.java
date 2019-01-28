package com.ftn.udd.controller;

import com.ftn.udd.model.AreaCode;
import com.ftn.udd.repository.AreaCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/areacode")
public class AreaCodeController {

    @Autowired
    private AreaCodeRepository repository;

    @RequestMapping(value = "/init", method = RequestMethod.GET, produces = "application/json")
    public String init() {
        ArrayList<AreaCode> areaCodes = new ArrayList<AreaCode>();
        areaCodes.add(new AreaCode("1.01", "Bioloske nauke"));
        areaCodes.add(new AreaCode("1.02","Fizika"));
        areaCodes.add(new AreaCode("1.03","Geoloske nauke"));
        areaCodes.add(new AreaCode("1.04","Hemija" ));
        areaCodes.add(new AreaCode("1.05","Matematika"));
        areaCodes.add(new AreaCode("1.05","Zastita zivotne sredine"));
        areaCodes.add(new AreaCode("2.01","Arhitektura i urbanizam"));
        areaCodes.add(new AreaCode("2.02","Elektrotehnika"));
        areaCodes.add(new AreaCode("2.03","Geodezija"));
        areaCodes.add(new AreaCode("2.04","Gradjevinarstvo"));
        areaCodes.add(new AreaCode("2.05","Racunarstvo i informatika"));
        areaCodes.add(new AreaCode("2.06","Masinstvo"));
        areaCodes.add(new AreaCode("2.07","Saobracaj"));
        areaCodes.add(new AreaCode("2.08","Industrijsko inzenjerstvo"));
        areaCodes.add(new AreaCode("3.01","Medicinske nauke"));
        areaCodes.add(new AreaCode("4.01","Poljoprivreda"));
        areaCodes.add(new AreaCode("4.02","Sumarstvo"));
        areaCodes.add(new AreaCode("4.03","Veterinarstvo"));
        areaCodes.add(new AreaCode("5.01","Drustvene nauke"));
        areaCodes.add(new AreaCode("6.01","Umetnost"));
        areaCodes.add(new AreaCode("7.01","Sport"));

        for (AreaCode ac: areaCodes) {
            repository.save(ac);
        }

        return "ok";
    }

    @RequestMapping(value = "/getAll", method = RequestMethod.GET, produces = "application/json")
    public List<AreaCode> getAll(){

        return repository.findAll();
    }

}