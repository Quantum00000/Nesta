package com.nesta.bootstrap;

import com.nesta.entity.*;
import com.nesta.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final FrontendTechnologyRepository frontendRepo;
    private final BackendTechnologyRepository backendRepo;
    private final DatabaseTechnologyRepository dbRepo;
    private final FeatureRepository featureRepo;
    private final UITemplateRepository uiTemplateRepo;
    private final UserRepository userRepo;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    public DataSeeder(FrontendTechnologyRepository frontendRepo, BackendTechnologyRepository backendRepo,
                      DatabaseTechnologyRepository dbRepo, FeatureRepository featureRepo,
                      UITemplateRepository uiTemplateRepo, UserRepository userRepo,
                      org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        this.frontendRepo = frontendRepo;
        this.backendRepo = backendRepo;
        this.dbRepo = dbRepo;
        this.featureRepo = featureRepo;
        this.uiTemplateRepo = uiTemplateRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        java.util.List<User> demoUsers = userRepo.findAllByUsername("demo@nesta.dev");
        if (demoUsers.isEmpty()) {
            User demo = new User();
            demo.setUsername("demo@nesta.dev");
            demo.setEmail("demo@nesta.dev");
            demo.setPassword(passwordEncoder.encode("password123"));
            demo.setRole("USER");
            userRepo.save(demo);
        } else if (demoUsers.size() > 1) {
            // Keep first, delete extra duplicates to clean up table
            for (int i = 1; i < demoUsers.size(); i++) {
                try {
                    userRepo.delete(demoUsers.get(i));
                } catch (Exception ignored) {
                }
            }
        }
        if (frontendRepo.count() == 0) {
            seedFrontend("React", "A declarative, efficient, and flexible JavaScript library for building user interfaces.");
            seedFrontend("Vue", "An approachable, performant and versatile framework for building web user interfaces.");
            seedFrontend("Angular", "The modern web developer's platform.");
        }
        
        if (backendRepo.count() == 0) {
            seedBackend("Spring Boot", "Creates stand-alone, production-grade Spring based Applications.");
            seedBackend("Express", "Fast, unopinionated, minimalist web framework for Node.js.");
            seedBackend("Django", "The Web framework for perfectionists with deadlines.");
        }
        
        if (dbRepo.count() == 0) {
            seedDatabase("PostgreSQL", "The World's Most Advanced Open Source Relational Database.");
            seedDatabase("MongoDB", "The application data platform.");
            seedDatabase("MySQL", "The world's most popular open source database.");
        }
        
        if (featureRepo.count() == 0) {
            seedFeature("Authentication", "User login, registration, and JWT management.");
            seedFeature("Payments", "Stripe integration for subscriptions and one-time payments.");
            seedFeature("Analytics", "Google Analytics and custom dashboard tracking.");
        }
        
        if (uiTemplateRepo.count() < 4) {
            uiTemplateRepo.deleteAll();
            seedTemplate("Admin Dashboard", "A sleek, modern dashboard template.", "/previews/dashboard.png");
            seedTemplate("E-commerce Storefront", "Full featured online store template.", "/previews/ecommerce.png");
            seedTemplate("YouTube Clone", "A video sharing platform layout with sidebar and grid.", "/previews/youtube.png");
            seedTemplate("SaaS Landing Page", "High conversion landing page for SaaS.", "/previews/landing.png");
        }
    }

    private void seedFrontend(String name, String desc) {
        FrontendTechnology tech = new FrontendTechnology();
        tech.setName(name);
        tech.setDescription(desc);
        frontendRepo.save(tech);
    }
    private void seedBackend(String name, String desc) {
        BackendTechnology tech = new BackendTechnology();
        tech.setName(name);
        tech.setDescription(desc);
        backendRepo.save(tech);
    }
    private void seedDatabase(String name, String desc) {
        DatabaseTechnology tech = new DatabaseTechnology();
        tech.setName(name);
        tech.setDescription(desc);
        dbRepo.save(tech);
    }
    private void seedFeature(String name, String desc) {
        Feature feat = new Feature();
        feat.setName(name);
        feat.setDescription(desc);
        featureRepo.save(feat);
    }
    private void seedTemplate(String name, String desc, String url) {
        UITemplate tpl = new UITemplate();
        tpl.setName(name);
        tpl.setDescription(desc);
        tpl.setPreviewUrl(url);
        uiTemplateRepo.save(tpl);
    }
}
