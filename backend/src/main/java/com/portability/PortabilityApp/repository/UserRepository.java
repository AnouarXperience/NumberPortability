package com.portability.PortabilityApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.portability.PortabilityApp.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{

	Optional<User> findByUsername(String username);

}
