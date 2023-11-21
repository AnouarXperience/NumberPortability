package com.portability.PortabilityApp.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustompasswordEncoder {
	private PasswordEncoder passwordEncoder;
	
	public CustompasswordEncoder() {
		this.passwordEncoder = new BCryptPasswordEncoder();
		
		
	}

	public PasswordEncoder getPasswordEncoder() {
		return passwordEncoder;
	}
}
