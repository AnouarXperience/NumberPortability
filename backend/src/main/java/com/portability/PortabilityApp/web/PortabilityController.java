package com.portability.PortabilityApp.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portability.PortabilityApp.domain.Portability;
import com.portability.PortabilityApp.domain.User;
import com.portability.PortabilityApp.dto.PortabilityResponseEnum;
import com.portability.PortabilityApp.service.PortabilityService;

@RestController
@RequestMapping("/api/portability")
public class PortabilityController {
	
	@Autowired
	private PortabilityService portabilityService;
	
	@PostMapping("")
	public  ResponseEntity<?> createPortability (@AuthenticationPrincipal User user){
		Portability newPortability = portabilityService.save(user);
		
		return ResponseEntity.ok(newPortability);
		
	}
	
	@GetMapping("")
	public ResponseEntity<?> getPortability (@AuthenticationPrincipal User user){
		Set<Portability> portabilityByUsser = portabilityService.findBy(user);
		return ResponseEntity.ok(portabilityByUsser);
	}
	
	@GetMapping("{portabilityId}")
	public ResponseEntity<?> getPortability (@PathVariable Long portabilityId,@AuthenticationPrincipal User user){
		Optional<Portability> portabilityOpt = portabilityService.findById(portabilityId);
//		return ResponseEntity.ok(portabilityOpt.orElse(new Portability()));
		return ResponseEntity.ok(new PortabilityResponseEnum(portabilityOpt.orElse(new Portability())));
	}
	
	@PutMapping("{portabilityId}")
	public ResponseEntity<?> updatePortability (@PathVariable Long portabilityId,@RequestBody Portability portability,@AuthenticationPrincipal User user){
		Portability updatePortability = portabilityService.save(portability);
		return ResponseEntity.ok(updatePortability); 
	}
	
}
