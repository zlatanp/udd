package com.ftn.udd.controller;

import com.ftn.udd.model.ElasticArticle;
import com.ftn.udd.repository.ElasticArticleRepository;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/elastic")
public class ElasticController {

    @Autowired
    private ElasticArticleRepository elasticArticleRepository;

    @Autowired
    private ElasticsearchOperations es;

    //Pretraživanje radova po nazivu časopisa.

    @RequestMapping(value = "/getArticleByJournalTitle", method = RequestMethod.POST, produces = "application/json")
    public List<ElasticArticle> getArticleByJournalTitle(@RequestParam("journalTitle") String journalTitle, @RequestParam("pageFrom") int from){

        return elasticArticleRepository.findByJournalTitle(journalTitle, PageRequest.of(from,10));

    }

    //Pretraživanje radova po naslovu rada.

    @RequestMapping(value = "/getArticleByName", method = RequestMethod.POST, produces = "application/json")
    public List<ElasticArticle> getArticleByName(@RequestParam("articleName") String articleName){

        return elasticArticleRepository.findByTitle(articleName);

    }

    //Pretraživanje radova po imenima i prezimenima autora.

    @RequestMapping(value = "/getArticleByAuthors", method = RequestMethod.POST, produces = "application/json")
    public String getArticleByAuthors(@RequestParam("authors") String[] authors){
        Client client = es.getClient();

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.boolQuery().should(QueryBuilders.matchQuery("otherAuthors.firstName", Arrays.asList(authors))));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices("article").source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest).actionGet();

        return searchResponse.toString();
    }


    //Pretraživanje radova po ključnim pojmovima.

    @RequestMapping(value = "/getArticleByKeywords", method = RequestMethod.POST, produces = "application/json")
    public String getArticleByKeywords(@RequestParam("articleKeywords") String[] articleKeywords){
        Client client = es.getClient();

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        //sourceBuilder.query(QueryBuilders.matchQuery("keywords", "ELASTIC2"));

        sourceBuilder.query(QueryBuilders.boolQuery().should(QueryBuilders.matchQuery("keywords", Arrays.asList(articleKeywords))));


        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices("article").source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest).actionGet();

        return searchResponse.toString();
    }

    //Pretraživanje radova po sadržaju (iz PDF fajla).

    @RequestMapping(value = "/getArticleByContent", method = RequestMethod.POST, produces = "application/json")
    public String getArticleByContent(@RequestParam("articleContent") String articleContent){
        Client client = es.getClient();

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.boolQuery().must(QueryBuilders.matchQuery("content", articleContent)));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices("article").source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest).actionGet();

        return searchResponse.toString();
    }

    //Pretraživanje radova po naučnim oblastima.

    @RequestMapping(value = "/getArticleByArea", method = RequestMethod.POST, produces = "application/json")
    public String getArticleByArea(@RequestParam("areaName") String areaName){
        Client client = es.getClient();

        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();
        sourceBuilder.query(QueryBuilders.boolQuery().must(QueryBuilders.matchQuery("areaCode.name", areaName)));

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices("article").source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest).actionGet();

        return searchResponse.toString();
    }

    //Kombinacija prethodnih parametara pretrage (BooleanQuery, omogućiti i AND i OR operator između polja).
    //Obezbediti podršku i za zadavanje PhrazeQuery-a u svim poljima.

    @RequestMapping(value = "/getArticleCombined", method = RequestMethod.POST, produces = "application/json")
    public String getCombined(@RequestParam("journalTitle") String journalTitle, @RequestParam("articleName") String articleName, @RequestParam("authors") String[] authors, @RequestParam("articleKeywords") String[] articleKeywords, @RequestParam("articleContent") String articleContent, @RequestParam("areaName") String areaName, @RequestParam("operationType") String operationType, @RequestParam("fieldCount") String fieldCount){

        Client client = es.getClient();
        String shouldMatch;
        SearchSourceBuilder sourceBuilder = new SearchSourceBuilder();

        if (operationType.equals("AND")){
            shouldMatch = fieldCount.toString();
        }else {
            shouldMatch = "1";
        }

        sourceBuilder.query(QueryBuilders.boolQuery().should(QueryBuilders.matchPhraseQuery("journalTitle", journalTitle))
                                                        .should(QueryBuilders.matchPhraseQuery("title", articleName))
                                                        .should(QueryBuilders.matchQuery("otherAuthors.firstName", Arrays.asList(authors)))
                                                        .should(QueryBuilders.matchQuery("keywords", Arrays.asList(articleKeywords)))
                                                        .should(QueryBuilders.matchPhraseQuery("content", articleContent))
                                                        .should(QueryBuilders.matchPhraseQuery("areaCode.name", areaName)).minimumShouldMatch(shouldMatch)
                        );

        SearchRequest searchRequest = new SearchRequest();
        searchRequest.indices("article").source(sourceBuilder);

        SearchResponse searchResponse = client.search(searchRequest).actionGet();
        System.out.println(searchResponse.toString());

        return searchResponse.toString();
    }

    //Pretprocesirati upit pomoću SerbianAnalyzer-a.
}
