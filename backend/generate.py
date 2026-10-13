import os

base_dir = r"c:\Users\a30ku\WebstormProjects\nesta\backend\src\main\java\com\nesta"
entity_dir = os.path.join(base_dir, "entity")
repo_dir = os.path.join(base_dir, "repository")
security_dir = os.path.join(base_dir, "security")
controller_dir = os.path.join(base_dir, "controller")
service_dir = os.path.join(base_dir, "service")
dto_dir = os.path.join(base_dir, "dto")

for d in [entity_dir, repo_dir, security_dir, controller_dir, service_dir, dto_dir]:
    os.makedirs(d, exist_ok=True)

entities = {
    "User": [
        ("String", "username"),
        ("String", "email"),
        ("String", "password"),
        ("String", "role")
    ],
    "Project": [
        ("String", "name"),
        ("String", "description"),
        ("User", "user", '@ManyToOne\n    @JoinColumn(name = "user_id")')
    ],
    "ProjectConfiguration": [
        ("Project", "project", '@OneToOne\n    @JoinColumn(name = "project_id")'),
        ("FrontendTechnology", "frontendTechnology", "@ManyToOne"),
        ("BackendTechnology", "backendTechnology", "@ManyToOne"),
        ("DatabaseTechnology", "databaseTechnology", "@ManyToOne"),
        ("UITemplate", "uiTemplate", "@ManyToOne")
    ],
    "FrontendTechnology": [
        ("String", "name"),
        ("String", "description")
    ],
    "BackendTechnology": [
        ("String", "name"),
        ("String", "description")
    ],
    "DatabaseTechnology": [
        ("String", "name"),
        ("String", "description")
    ],
    "UITemplate": [
        ("String", "name"),
        ("String", "description"),
        ("String", "previewUrl")
    ],
    "Feature": [
        ("String", "name"),
        ("String", "description")
    ],
    "GenerationJob": [
        ("Project", "project", "@ManyToOne"),
        ("String", "status"),
        ("java.time.LocalDateTime", "startedAt"),
        ("java.time.LocalDateTime", "completedAt"),
        ("String", "errorMessage")
    ],
    "Artifact": [
        ("GenerationJob", "job", "@ManyToOne"),
        ("String", "name"),
        ("String", "type"),
        ("String", "storagePath")
    ],
    "Deployment": [
        ("Project", "project", "@ManyToOne"),
        ("String", "url"),
        ("String", "status")
    ]
}

for e, fields in entities.items():
    table_name = e.lower() + "s"
    if e == "DatabaseTechnology": table_name = "database_technologies"
    elif e == "BackendTechnology": table_name = "backend_technologies"
    elif e == "FrontendTechnology": table_name = "frontend_technologies"
    elif e == "GenerationJob": table_name = "generation_jobs"
    elif e == "UITemplate": table_name = "ui_templates"
    elif e == "ProjectConfiguration": table_name = "project_configurations"

    code = f"package com.nesta.entity;\n\nimport jakarta.persistence.*;\nimport java.util.UUID;\n\n@Entity\n@Table(name = \"{table_name}\")\npublic class {e} {{\n\n"
    code += "    @Id\n    @GeneratedValue(strategy = GenerationType.UUID)\n    private UUID id;\n\n"
    for f in fields:
        if len(f) == 3:
            code += f"    {f[2]}\n"
        code += f"    private {f[0]} {f[1]};\n\n"
    
    code += "    public UUID getId() { return id; }\n"
    code += "    public void setId(UUID id) { this.id = id; }\n\n"
    for f in fields:
        fname = f[1][0].upper() + f[1][1:]
        code += f"    public {f[0]} get{fname}() {{ return {f[1]}; }}\n"
        code += f"    public void set{fname}({f[0]} {f[1]}) {{ this.{f[1]} = {f[1]}; }}\n\n"
        
    code += "}\n"
    
    with open(os.path.join(entity_dir, f"{e}.java"), "w") as f_out:
        f_out.write(code)

for e in entities.keys():
    code = f"package com.nesta.repository;\n\nimport com.nesta.entity.{e};\nimport org.springframework.data.jpa.repository.JpaRepository;\nimport java.util.UUID;\nimport org.springframework.stereotype.Repository;\n\n@Repository\npublic interface {e}Repository extends JpaRepository<{e}, UUID> {{\n"
    if e == "User":
        code += "    java.util.Optional<User> findByUsername(String username);\n"
    code += "}\n"
    with open(os.path.join(repo_dir, f"{e}Repository.java"), "w") as f_out:
        f_out.write(code)

# Custom UserDetailsService and Security config
security_code_1 = """package com.nesta.security;

import com.nesta.entity.User;
import com.nesta.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }
}
"""

security_code_2 = """package com.nesta.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {
    private final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long EXPIRATION_TIME = 86400000; // 24 hours

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(secretKey)
                .compact();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        return claimsResolver.apply(claims);
    }
}
"""

security_code_3 = """package com.nesta.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        String username = null;
        String jwt = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            jwt = authHeader.substring(7);
            try {
                username = jwtUtil.extractUsername(jwt);
            } catch (Exception e) {
                System.out.println("Invalid JWT");
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(token);
            }
        }
        filterChain.doFilter(request, response);
    }
}
"""

security_code_4 = """package com.nesta.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
"""

with open(os.path.join(security_dir, "CustomUserDetailsService.java"), "w") as f_out: f_out.write(security_code_1)
with open(os.path.join(security_dir, "JwtUtil.java"), "w") as f_out: f_out.write(security_code_2)
with open(os.path.join(security_dir, "JwtAuthenticationFilter.java"), "w") as f_out: f_out.write(security_code_3)
with open(os.path.join(security_dir, "SecurityConfig.java"), "w") as f_out: f_out.write(security_code_4)

dto_code_1 = """package com.nesta.dto;
public class AuthRequest {
    private String username;
    private String password;
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
"""

dto_code_2 = """package com.nesta.dto;
public class AuthResponse {
    private String token;
    public AuthResponse(String token) { this.token = token; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
"""
with open(os.path.join(dto_dir, "AuthRequest.java"), "w") as f_out: f_out.write(dto_code_1)
with open(os.path.join(dto_dir, "AuthResponse.java"), "w") as f_out: f_out.write(dto_code_2)


auth_controller = """package com.nesta.controller;

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
@RequestMapping("/api/auth")
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
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@RequestBody AuthRequest request) {
        // Simple refresh implementation
        String token = jwtUtil.generateToken(request.getUsername());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
"""

with open(os.path.join(controller_dir, "AuthController.java"), "w") as f_out: f_out.write(auth_controller)
