package com.portability.PortabilityApp.domain;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

@Entity
public class Portability {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Integer number;
	private Long msisdn;
	@CreationTimestamp
	private LocalDateTime CDate; // Current Date
	private Date PDate; // Porting Date
	@Column(name = "CCode")
	private Long CCode; // Contract Code // // Contract Code based on id + offset
	private String Status;
	@ManyToOne(optional = false)
	private User user;
	// TODO: Create private User(admin) assignedTo Portability;

//    @PrePersist
//    protected void onCreate() {
//        if (id != null) {
//            CCode = id + 1000;
//        }
//    }
//    @PostPersist
//    private void onPersist() {
//        if (id != null) {
//           CCode = id + 1000; // Incrementing by 1000
//       }
//    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getMsisdn() {
		return msisdn;
	}

	public void setMsisdn(Long msisdn) {
		this.msisdn = msisdn;
	}

	public LocalDateTime getCDate() {
		return CDate;
	}

	public void setCDate(LocalDateTime cDate) {
		CDate = cDate;
	}

	public Date getPDate() {
		return PDate;
	}

	public void setPDate(Date pDate) {
		PDate = pDate;
	}

	public Long getCCode() {
		if (id != null) {
			CCode = id + 1000; // Incrementing by 1000
		}
		return CCode;
	}

	public void setCCode(Long cCode) {
		CCode = cCode;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}
}
