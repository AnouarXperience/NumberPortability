package com.portability.PortabilityApp.repository;

//import java.time.LocalDateTime;
//import java.util.Date;
//import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portability.PortabilityApp.domain.Portability;
import com.portability.PortabilityApp.domain.User;

public interface PortabilityRepository extends JpaRepository<Portability, Long> {
	
	Set<Portability> findByUser(User user);
//	List<Portability> findByDateCreateBetween(LocalDateTime CDate, Date PDate);

}
