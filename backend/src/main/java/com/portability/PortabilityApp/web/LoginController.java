package com.portability.PortabilityApp.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portability.PortabilityApp.domain.User;
import com.portability.PortabilityApp.dto.AuthCredentialsRequest;
import com.portability.PortabilityApp.util.JwtUtil;

import io.jsonwebtoken.ExpiredJwtException;

@RestController
@RequestMapping("/api/log")
public class LoginController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("login")
	public ResponseEntity<?> login (@RequestBody AuthCredentialsRequest request){
		try {
			Authentication authenticate = authenticationManager
					.authenticate(
							new UsernamePasswordAuthenticationToken(
									request.getUsername(), request.getPassword()
									)
							);
			User user = (User) authenticate.getPrincipal();
			user.setPassword(null);
		 // Setting user password null because the secret password appear in POST
			return ResponseEntity.ok().header(
					HttpHeaders.AUTHORIZATION,
					jwtUtil.generateToken(user)     
					//jwtTokenUtil = jwtUtil (short)
					)
			.body(user);
			//body(userViewMapper.toUserView(user)
		} catch (BadCredentialsException ex) {			
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();		
		}		
	}
	
	// localhost:8080/api/log/validate?token=blahblahblahblahblahblah(HS512)
	@GetMapping("/validate")
	public ResponseEntity<?> validateToken (@RequestParam String token,@AuthenticationPrincipal User user){
		try {
            Boolean isValidToken = jwtUtil.validateToken(token, user);
            return ResponseEntity.ok(isValidToken);
        } catch (ExpiredJwtException e) {
            return ResponseEntity.ok(false);
        }
		
	}

}
