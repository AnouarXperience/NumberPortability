package com.portability.PortabilityApp.dto;

import com.portability.PortabilityApp.domain.Portability;
import com.portability.PortabilityApp.enums.PortabilityEnum;
import com.portability.PortabilityApp.enums.PortabilityStatus;

public class PortabilityResponseEnum {

	 private Portability portability;
	 private PortabilityEnum[] portabilityEnums = PortabilityEnum.values();
	 private PortabilityStatus[] statusEnums = PortabilityStatus.values();
	 
	 

	public PortabilityResponseEnum(Portability portability) {
		super();
		this.portability = portability;
	}



	public Portability getPortability() {
		return portability;
	}



	public void setPortability(Portability portability) {
		this.portability = portability;
	}

	

	public PortabilityEnum[] getPortabilityEnums() {
		return portabilityEnums;
	}



	public PortabilityStatus[] getStatusEnums() {
		return statusEnums;
	}

	
}
