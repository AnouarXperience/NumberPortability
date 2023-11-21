package com.portability.PortabilityApp.filter;

import java.io.IOException;
//import java.util.Arrays;
import java.util.List;
//import java.util.Optional;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

//import com.portability.PortabilityApp.domain.User;
import com.portability.PortabilityApp.repository.UserRepository;
import com.portability.PortabilityApp.util.JwtUtil;

@Component
public class JwtFilter extends OncePerRequestFilter {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain Chain)
			throws ServletException, IOException {
		// Get authorization header and validate
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (!StringUtils.hasText(header)|| StringUtils.hasText(header) && !header.startsWith("Bearer")){
			Chain.doFilter(request, response);
			return;
		}
		// Authorization -> [Bearer], [anouar.eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW4iLCJ...]
		final String token = header.split(" ")[1].trim();
		
		// Get user identity and set it on the spring security context
		UserDetails userDetails = userRepo.findByUsername(jwtUtil.getUsernameFromToken(token)).orElse(null);
		
	    // Get jwt token and validate
		if (!jwtUtil.validateToken(token, userDetails)) {
			Chain.doFilter(request, response);
			return;
		}
		
		UsernamePasswordAuthenticationToken
			authentication = new UsernamePasswordAuthenticationToken(
					userDetails, null,
					userDetails == null ?
			List.of() : userDetails.getAuthorities());
	
		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
		
        // this is where the authentication magic happens and the user is now valid!
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        Chain.doFilter(request, response);
	
		
	}

	
	
}


