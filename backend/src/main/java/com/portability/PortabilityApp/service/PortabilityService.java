package com.portability.PortabilityApp.service;


import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.portability.PortabilityApp.domain.Portability;
import com.portability.PortabilityApp.domain.User;
import com.portability.PortabilityApp.enums.PortabilityStatus;
import com.portability.PortabilityApp.repository.PortabilityRepository;

@Service
public class PortabilityService {
	@Autowired
	private PortabilityRepository portabilityRepo;
	
	public Portability save(User user) {
		Portability portability = new Portability();
		portability.setStatus(PortabilityStatus.PENDING_SUBMISSION.getStatus());
		Integer nextPortabilityToSubmit = findNextPortabilityToSubmit(user);
		portability.setNumber(nextPortabilityToSubmit);
		portability.setUser(user);
		
		
		// portability.setPDate(parseWeekFormat(portability.getPDate())); // Parse week format
        // Calculate and set the CCode based on id
        // portability.setCCode(portability.getCCode()); 
		
		return portabilityRepo.save(portability);
	}
	
	private Integer findNextPortabilityToSubmit(User user) {
        Set<Portability> portabilityByUser = portabilityRepo.findByUser(user);
        if (portabilityByUser == null) {
            return 1;
        }
        Optional<Integer> nextPortabilityNumOpt = portabilityByUser.stream().sorted((a1, a2) -> {
            if (a1.getNumber() == null)
                return 1;
            if (a2.getNumber() == null)
                return 1;
            return a2.getNumber().compareTo(a1.getNumber());
        }).map(portability -> {
            if (portability.getNumber() == null)
                return 1;
            return portability.getNumber() + 1;
        }).findFirst();
        return nextPortabilityNumOpt.orElse(1);
    }
	
	public Set<Portability> findBy (User user) {
		return portabilityRepo.findByUser(user);
	}

	public Optional<Portability> findById(Long portabilityId) {
		return portabilityRepo.findById(portabilityId);	
	}

	public Portability save(Portability portability) {
		return portabilityRepo.save(portability);		
	}
	
}
