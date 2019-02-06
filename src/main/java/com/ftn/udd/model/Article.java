package com.ftn.udd.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Article {

    @Id
    private String id;
    private String journalISSNnumber;
    private String journalTitle;
    private String title;
    private User author;
    private List<String> keywords;
    private String apstract;
    private AreaCode areaCode;
    private String status;
    private List<User> otherAuthors;
    private Binary file;
    private String content;


    public Article(String journalISSNnumber, String journalTitle, String title, User author, List<String> keywords, String apstract, AreaCode areaCode, String status, List<User> otherAuthors, Binary file, String content) {
        this.journalISSNnumber = journalISSNnumber;
        this.journalTitle = journalTitle;
        this.title = title;
        this.author = author;
        this.keywords = keywords;
        this.apstract = apstract;
        this.areaCode = areaCode;
        this.status = status;
        this.otherAuthors = otherAuthors;
        this.file = file;
        this.content = content;
    }
}
