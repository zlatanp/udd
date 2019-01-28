package com.ftn.udd.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Journal {

    private String name;
    private String ISSNNumber;
    private List<AreaCode> areaCodes;
    private User chiefEditor;
    private List<User> otherEditors;

    public Journal(String name, String ISSNNumber, List<AreaCode> areaCodes, User chiefEditor, List<User> otherEditors) {
        this.name = name;
        this.ISSNNumber = ISSNNumber;
        this.areaCodes = areaCodes;
        this.chiefEditor = chiefEditor;
        this.otherEditors = otherEditors;
    }
}
