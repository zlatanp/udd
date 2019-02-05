package com.ftn.udd.repository;


import com.ftn.udd.model.ElasticArticle;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ElasticArticleRepository extends ElasticsearchRepository<ElasticArticle, String > {
}
