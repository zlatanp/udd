package com.ftn.udd.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Article {

    @Id
    private String id;
    private String journalISSNnumber;
    private String title;
    private User author;
    private List<String> keywords;
    private String apstract;
    private AreaCode areaCode;
    private String status;
    private List<String> otherAuthors;
    private Binary file;
    // private PDF
    // private Final PDF


    public Article(String id, String journalISSNnumber, String title, User author, List<String> keywords, String apstract, AreaCode areaCode, String status, List<String> otherAuthors, Binary file) {
        this.id = id;
        this.journalISSNnumber = journalISSNnumber;
        this.title = title;
        this.author = author;
        this.keywords = keywords;
        this.apstract = apstract;
        this.areaCode = areaCode;
        this.status = status;
        this.otherAuthors = otherAuthors;
        this.file = file;
    }
}
