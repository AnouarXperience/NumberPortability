package com.portability.PortabilityApp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.portability.PortabilityApp.domain.User;
import com.portability.PortabilityApp.repository.UserRepository;
//import com.portability.PortabilityApp.util.CustompasswordEncoder;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

 /* @Autowired
	private CustompasswordEncoder passwordEncoder; */
	
	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		Optional<User> userOpt= userRepo.findByUsername(username);
		
		return userOpt.orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));
		
		/*User user= new User();
		user.setUsername(username);
		user.setPassword(passwordEncoder.getPasswordEncoder().encode("anouar"));
		user.setId(1L);
		return user;*/
		
	}

}
