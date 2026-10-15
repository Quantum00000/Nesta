package com.nesta.controller;

import com.nesta.dto.AuthRequest;
import com.nesta.dto.AuthResponse;
import com.nesta.entity.User;
import com.nesta.repository.UserRepository;
import com.nesta.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping({"/api/auth", "/auth"})
public class AuthController {
    
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {
        if (request.getUsername() == null || request.getUsername().trim().isEmpty() ||
            request.getPassword() == null || request.getPassword().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", "Username/email and password are required"));
        }
        String username = request.getUsername().trim();
        if (userRepository.findByUsername(username).isPresent()) {
            return ResponseEntity.badRequest().body(java.util.Map.of("message", "Username already exists. Please log in instead."));
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(username);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return ResponseEntity.ok(java.util.Map.of("message", "User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            String token = jwtUtil.generateToken(request.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(401).body(java.util.Map.of(
                "message", "Account not found or password incorrect. If this is your first time, please click 'Register Now' below to create an account."
            ));
        }
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody AuthRequest request) {
        // Simple refresh implementation
        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
