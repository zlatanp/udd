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
public class Journal {

    @Id
    private String ISSNNumber;
    private String name;
    private List<AreaCode> areaCodes;
    private User chiefEditor;
    private List<User> otherEditors;
    private Binary image;

    public Journal(String ISSNNumber, String name, List<AreaCode> areaCodes, User chiefEditor, List<User> otherEditors, Binary image) {
        this.ISSNNumber = ISSNNumber;
        this.name = name;
        this.areaCodes = areaCodes;
        this.chiefEditor = chiefEditor;
        this.otherEditors = otherEditors;
        this.image = image;
    }
}
