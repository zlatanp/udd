package com.ftn.udd.repository;

import com.ftn.udd.model.Journal;
import com.ftn.udd.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface JournalRepository extends MongoRepository<Journal, String> {

    public Journal findByISSNNumber(String ISSNNumber);
    public Journal findByName(String name);
    public Journal findByChiefEditor(User chiefEditor);
}
