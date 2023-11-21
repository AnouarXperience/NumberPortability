package com.portability.PortabilityApp.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum PortabilityEnum {
	portability_1(1, "Anouar portability"),
    portability_2(2, "Hiba portability"),
    portability_3(3, "Raed portability"),
    portability_4(4, "Manel portability"),
    portability_5(5, "Farouk portability"),
    portability_6(6, "Aya portability"),
    portability_7(7, "Rania portability"),
    portability_8(8, "Sadek portability"),
    portability_9(9, "Ala portability"),
    portability_10(10, "Chaka portability"),
    portability_11(11, "Sara portability"),
    portability_12(12, "Amira portability"),
    portability_13(13, "Rawend portability"),
    portability_14(14, "Feryel portability"),
    FINAL_PROJECT(15, "chouchene portability");
	
	   private int portabilityNum;
	   private String portabilityName;
	   
	   PortabilityEnum(int portabilityNum, String portabilityName) {
	        this.portabilityNum = portabilityNum;
	        this.portabilityName = portabilityName;
	    }

	public int getPortabilityNum() {
		return portabilityNum;
	}

	public String getPortabilityName() {
		return portabilityName;
	}
	
}
