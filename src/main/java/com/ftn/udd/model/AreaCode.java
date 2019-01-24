package com.ftn.udd.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AreaCode {

    private String name;
    private String code;

    public AreaCode(String name, String code){
        this.name = name;
        this.code = code;
    }

}
