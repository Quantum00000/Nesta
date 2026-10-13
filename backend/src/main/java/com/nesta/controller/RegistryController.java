package com.nesta.controller;
import com.nesta.service.TechnologyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RegistryController {
    private final TechnologyService service;

    public RegistryController(TechnologyService service) { this.service = service; }

    @GetMapping("/technologies/frontend")
    public ResponseEntity<?> getFrontend() { return ResponseEntity.ok(service.getAllFrontend()); }

    @GetMapping("/technologies/backend")
    public ResponseEntity<?> getBackend() { return ResponseEntity.ok(service.getAllBackend()); }

    @GetMapping("/technologies/database")
    public ResponseEntity<?> getDatabase() { return ResponseEntity.ok(service.getAllDatabase()); }

    @GetMapping("/features")
    public ResponseEntity<?> getFeatures() { return ResponseEntity.ok(service.getAllFeatures()); }

    @GetMapping("/templates")
    public ResponseEntity<?> getTemplates() { return ResponseEntity.ok(service.getAllTemplates()); }
}
