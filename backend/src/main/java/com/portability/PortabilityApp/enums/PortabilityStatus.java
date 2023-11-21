package com.portability.PortabilityApp.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum PortabilityStatus {
	PENDING_SUBMISSION("Pending Submission", 1),
    SUBMITTED("Submitted", 2),
    IN_REVIEW("In Review", 3),  
    NEEDS_UPDATE("Needs Update", 4),
    CANCELED("Canceled", 5),
    COMPLETED("Completed", 6);

	private String status;
	private Integer step;

	PortabilityStatus(String status, Integer step) {
		this.status = status;
		this.step = step;
	}

	public String getStatus() {
		return status;
	}

	public Integer getStep() {
		return step;
	}
	
	
}
