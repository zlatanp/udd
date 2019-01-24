package com.ftn.udd.model;

import com.ftn.udd.enumeration.PayTypeEnum;
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
    private PayTypeEnum payType;
    private User chiefEditor;
    private List<String> otherEditors;
    private List<User> revisionEditors;

    public Journal(String name, String ISSNNumber, List<AreaCode> areaCodes, PayTypeEnum payType, User chiefEditor, List<String> otherEditors, List<User> revisionEditors) {
        this.name = name;
        this.ISSNNumber = ISSNNumber;
        this.areaCodes = areaCodes;
        this.payType = payType;
        this.chiefEditor = chiefEditor;
        this.otherEditors = otherEditors;
        this.revisionEditors = revisionEditors;
    }
}
