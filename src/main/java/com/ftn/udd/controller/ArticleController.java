package com.ftn.udd.controller;

import com.ftn.udd.model.Article;
import com.ftn.udd.model.ElasticArticle;
import com.ftn.udd.model.Journal;
import com.ftn.udd.model.User;
import com.ftn.udd.repository.*;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AreaCodeRepository areaCodeRepository;

    @Autowired
    private JournalRepository journalRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private ElasticArticleRepository elasticArticleRepository;

    @PostMapping("/add")
    public void addArticleWitAuthors(HttpServletResponse response, @RequestParam("articleJournalISSN") String iSSNNumber, @RequestParam("dArticleTitle") String dArticleTitle, @RequestParam("dArticleAuthor") String dArticleAuthor, @RequestParam("dArticleKeywords") String[] dArticleKeywords, @RequestParam("dArticleAbstract") String dArticleAbstract, @RequestParam("dArticleAreaCodes") String dArticleAreaCodes, @RequestParam("file") MultipartFile file,
                                     @RequestParam("otherAuthors1Name") String otherAuthors1Name, @RequestParam("otherAuthors1Email") String otherAuthors1Email, @RequestParam("otherAuthors1City") String otherAuthors1City, @RequestParam("otherAuthors1Country") String otherAuthors1Country,
                                     @RequestParam("otherAuthors2Name") String otherAuthors2Name, @RequestParam("otherAuthors2Email") String otherAuthors2Email, @RequestParam("otherAuthors2City") String otherAuthors2City, @RequestParam("otherAuthors2Country") String otherAuthors2Country,
                                     @RequestParam("otherAuthors3Name") String otherAuthors3Name, @RequestParam("otherAuthors3Email") String otherAuthors3Email, @RequestParam("otherAuthors3City") String otherAuthors3City, @RequestParam("otherAuthors3Country") String otherAuthors3Country) {

        System.out.println(iSSNNumber + " " + dArticleTitle + " " + dArticleAuthor + " " + Arrays.toString(dArticleKeywords) + " " + dArticleAbstract + " " + dArticleAreaCodes);
        System.out.println(otherAuthors1Name + " " + otherAuthors1Email + " " + otherAuthors1City + " " +otherAuthors1Country);
        System.out.println(otherAuthors2Name + " " + otherAuthors2Email + " " + otherAuthors2City + " " +otherAuthors2Country);
        System.out.println(otherAuthors3Name + " " + otherAuthors3Email + " " + otherAuthors3City + " " +otherAuthors3Country);

        Journal journal = journalRepository.findById(iSSNNumber).get();

        Article article = new Article();
        article.setJournalISSNnumber(iSSNNumber);
        article.setJournalTitle(journal.getName());
        article.setTitle(dArticleTitle);
        article.setAuthor(userRepository.findByEmail(dArticleAuthor));
        article.setKeywords(Arrays.asList(dArticleKeywords));
        article.setApstract(dArticleAbstract);
        article.setAreaCode(areaCodeRepository.findByName(dArticleAreaCodes));
        article.setStatus("PENDING");


        ArrayList<User> otherAuthors = new ArrayList<User>();

        if(!otherAuthors1Name.equals("") && !otherAuthors1Email.equals("") && !otherAuthors1City.equals("") && !otherAuthors1Country.equals("")){
            User author1 = new User(otherAuthors1Email, otherAuthors1Name, otherAuthors1City, otherAuthors1Country);
            otherAuthors.add(author1);
        }

        if(!otherAuthors2Name.equals("") && !otherAuthors2Email.equals("") && !otherAuthors2City.equals("") && !otherAuthors2Country.equals("")){
            User author2 = new User(otherAuthors2Email, otherAuthors2Name, otherAuthors2City, otherAuthors2Country);
            otherAuthors.add(author2);
        }

        if(!otherAuthors3Name.equals("") && !otherAuthors3Email.equals("") && !otherAuthors3City.equals("") && !otherAuthors3Country.equals("")){
            User author3 = new User(otherAuthors3Email, otherAuthors3Name, otherAuthors3City, otherAuthors3Country);
            otherAuthors.add(author3);
        }

        article.setOtherAuthors(otherAuthors);

        try {
            article.setFile(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
        } catch (IOException e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
            response.setHeader("Location", "http://localhost:8080/");
        }

        articleRepository.save(article);

        response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
        response.setHeader("Location", "http://localhost:8080/");

    }

    @RequestMapping(value = "/getArticleForMagazine", method = RequestMethod.GET, produces = "application/json")
    public List<Article> getArticles(@RequestParam("ISSNNumber") String ISSNNumber){

        return articleRepository.getByJournalISSNnumber(ISSNNumber);

    }

    @RequestMapping(value = "/checkReview", method = RequestMethod.GET, produces = "application/json")
    public ArrayList<Article> getReviews(@RequestParam("email") String email){

        Journal journal = journalRepository.findByChiefEditor(userRepository.findByEmail(email));

        List<Article> articles = articleRepository.getByJournalISSNnumber(journal.getISSNNumber());
        ArrayList<Article> articleArrayList = new ArrayList<Article>();
        for (Article ar : articles) {
            if (ar.getStatus().equals("PENDING"))
                articleArrayList.add(ar);
        }

        return articleArrayList;

    }

    @RequestMapping(value = "/deleteArticle", method = RequestMethod.POST, produces = "application/json")
    public void deleteArticle(HttpServletResponse response, @RequestParam("id") String id){

        articleRepository.deleteById(id);

    }

    @RequestMapping(value = "/acceptArticle", method = RequestMethod.POST, produces = "application/json")
    public void acceptArticle(HttpServletResponse response, @RequestParam("id") String id){

        Article article = articleRepository.findById(id).get();
        article.setStatus("ACTIVE");
        articleRepository.save(article);

        //indexing stuff
        ElasticArticle elasticArticle = new ElasticArticle(article);
        elasticArticleRepository.save(elasticArticle);

    }
}
