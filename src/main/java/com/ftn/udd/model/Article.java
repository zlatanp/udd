package com.ftn.udd.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Article {

    private String title;
    private User author;
    private List<String> otherAuthors;
    private List<String> keywords;
    private String apstract;
    private AreaCode areaCode;
    // private PDF
    // private Final PDF

    public Article(String title, User author, List<String> otherAuthors, List<String> keywords, String apstract, AreaCode areaCode) {
        this.title = title;
        this.author = author;
        this.otherAuthors = otherAuthors;
        this.keywords = keywords;
        this.apstract = apstract;
        this.areaCode = areaCode;
    }
}
