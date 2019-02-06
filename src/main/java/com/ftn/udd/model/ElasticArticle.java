package com.ftn.udd.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import java.util.List;

@Document(indexName = "article", type = "default")
@Getter
@Setter
@NoArgsConstructor
public class ElasticArticle {

    @Id
    private String id;
    private String journalISSNnumber;
    private String journalTitle;
    private String title;
    private User author;
    private List<String> keywords;
    private String apstract;
    private AreaCode areaCode;
    private List<User> otherAuthors;
    private String filename;
    private String content;


    public ElasticArticle(Article article) {
        this.journalISSNnumber = article.getJournalISSNnumber();
        this.journalTitle = article.getJournalTitle();
        this.title = article.getTitle();
        this.author = article.getAuthor();
        this.keywords = article.getKeywords();
        this.apstract = article.getApstract();
        this.areaCode = article.getAreaCode();
        this.otherAuthors = article.getOtherAuthors();
        this.filename = article.getId();
        this.content = article.getContent();
    }
}
