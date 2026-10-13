package com.nesta.controller;
import com.nesta.dto.ProjectCreateRequest;
import com.nesta.entity.*;
import com.nesta.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;
    public ProjectController(ProjectService projectService) { this.projectService = projectService; }

    @PostMapping
    public ResponseEntity<?> createProject(Authentication auth, @RequestBody ProjectCreateRequest request) {
        Project p = projectService.createProject(auth.getName(), request);
        return ResponseEntity.ok(p);
    }

    @PostMapping("/{id}/generate")
    public ResponseEntity<?> generateProject(@PathVariable UUID id) {
        GenerationJob job = projectService.startGeneration(id);
        return ResponseEntity.ok(job);
    }

    @GetMapping("/{id}/artifacts")
    public ResponseEntity<?> getArtifacts(@PathVariable UUID id) {
        return ResponseEntity.ok(projectService.getProjectArtifacts(id));
    }
}
