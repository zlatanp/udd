package com.ftn.udd.controller;

import com.ftn.udd.model.ElasticArticle;
import com.ftn.udd.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/elastic")
public class ElasticController {

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

    //Pretraživanje radova po nazivu časopisa.

    //Pretraživanje radova po naslovu rada.

    //Pretraživanje radova po imenima i prezimenima autora.

    //Pretraživanje radova po ključnim pojmovima.

    //Pretraživanje radova po sadržaju (iz PDF fajla).

    //Pretraživanje radova po naučnim oblastima.

    //Kombinacija prethodnih parametara pretrage (BooleanQuery, omogućiti i AND i OR operator između polja).

    //Obezbediti podršku i za zadavanje PhrazeQuery-a u svim poljima.

    //Pretprocesirati upit pomoću SerbianAnalyzer-a.

    //Prilikom prikaza rezultata kreirati dinamički sažetak (Highlighter).

    //Prilikom prikaza rezultata ponuditi i link za preuzimanje rada ako je objavljen u open-access časopisu, a ako nije onda taster za kupovinu članarine („dodaj u korpu“)

    @RequestMapping(value = "/getAll", method = RequestMethod.GET, produces = "application/json")
    public List<ElasticArticle> getAll(){
        Iterator<ElasticArticle> iter = elasticArticleRepository.findAll().iterator();
        List<ElasticArticle> ar = new ArrayList<ElasticArticle>();
        while (iter.hasNext()){
            ar.add(iter.next());
        }
        return ar;
    }
}