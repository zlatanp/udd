package com.ftn.udd.controller;

import com.ftn.udd.model.AreaCode;
import com.ftn.udd.model.Journal;
import com.ftn.udd.model.User;
import com.ftn.udd.repository.AreaCodeRepository;
import com.ftn.udd.repository.JournalRepository;
import com.ftn.udd.repository.UserRepository;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/journal")
public class JournalController {

    @Autowired
    private JournalRepository journalRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AreaCodeRepository areaCodeRepository;

    @RequestMapping(value = "/getAll", method = RequestMethod.GET, produces = "application/json")
    public List<Journal> getAll(){

        return journalRepository.findAll();
    }

    @RequestMapping(value = "/deleteJournal", method = RequestMethod.POST, produces = "application/json")
    public void removeJournal(@RequestParam("ISSNNumber") String ISSNNumber){
        journalRepository.deleteById(ISSNNumber);
    }

    @RequestMapping(value = "/getJournal", method = RequestMethod.GET, produces = "application/json")
    public Journal getJournal(@RequestParam("ISSNNumber") String ISSNNumber){
        return journalRepository.findById(ISSNNumber).orElseGet(null);
    }

    @RequestMapping(value = "/checkJournal", method = RequestMethod.GET, produces = "application/json")
    public String checkJournal(@RequestParam("ISSNNumber") String ISSNNumber){
        if (journalRepository.findById(ISSNNumber).orElseGet(null) != null) {
            return "exists";
        }else{
            return "noExists";
        }
    }

    @PostMapping("/add")
    public void addJournal(HttpServletResponse response, @RequestParam("dissnNumber") String ISSNNumber, @RequestParam("dJournalName") String dName, @RequestParam("dchiefEditor") String dchiefEditor, @RequestParam("listAreaCodes") String[] listAreaCodes, @RequestParam("listEditors") String[] listEditors, @RequestParam("file") MultipartFile file) {
        if (ISSNNumber.isEmpty() || dName.isEmpty() || dchiefEditor.isEmpty() || Arrays.asList(listAreaCodes).isEmpty()){
            response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
            response.setHeader("Location", "http://localhost:8080/");
        }

        User chiefEditor = userRepository.findByEmail(dchiefEditor);

        ArrayList<AreaCode> areaCodes = new ArrayList<AreaCode>();
        for (String areaName: Arrays.asList(listAreaCodes)) {
            areaCodes.add(areaCodeRepository.findByName(areaName));
        }

        ArrayList<User> otherEditors = new ArrayList<User>();
        for (String editorEmail: Arrays.asList(listEditors)) {
            if (!editorEmail.equals(dchiefEditor)){
                otherEditors.add(userRepository.findByEmail(editorEmail));
            }
        }
        try {
            Journal j = new Journal();
            j.setISSNNumber(ISSNNumber);
            j.setName(dName);
            j.setAreaCodes(areaCodes);
            j.setChiefEditor(chiefEditor);
            j.setOtherEditors(otherEditors);
            if (file.isEmpty()){
                j.setImage(null);
            }else{
                j.setImage(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
            }
            journalRepository.save(j);
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
            response.setHeader("Location", "http://localhost:8080/");
        }

        response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
        response.setHeader("Location", "http://localhost:8080/");
    }
}
