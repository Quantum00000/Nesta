import os

base_dir = r"c:\Users\a30ku\WebstormProjects\nesta\backend\src\main\java\com\nesta"

def write_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        f.write(content)

# 1. DTOs
write_file(os.path.join(base_dir, "dto", "ProjectCreateRequest.java"), """package com.nesta.dto;
import java.util.UUID;
import java.util.List;

public class ProjectCreateRequest {
    private String name;
    private String description;
    private String mode;
    private UUID uiTemplateId;
    private UUID frontendTechId;
    private UUID backendTechId;
    private UUID databaseTechId;
    private List<UUID> featureIds;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public UUID getUiTemplateId() { return uiTemplateId; }
    public void setUiTemplateId(UUID uiTemplateId) { this.uiTemplateId = uiTemplateId; }
    public UUID getFrontendTechId() { return frontendTechId; }
    public void setFrontendTechId(UUID frontendTechId) { this.frontendTechId = frontendTechId; }
    public UUID getBackendTechId() { return backendTechId; }
    public void setBackendTechId(UUID backendTechId) { this.backendTechId = backendTechId; }
    public UUID getDatabaseTechId() { return databaseTechId; }
    public void setDatabaseTechId(UUID databaseTechId) { this.databaseTechId = databaseTechId; }
    public List<UUID> getFeatureIds() { return featureIds; }
    public void setFeatureIds(List<UUID> featureIds) { this.featureIds = featureIds; }
}
""")

# 2. Update Repositories
write_file(os.path.join(base_dir, "repository", "ProjectConfigurationRepository.java"), """package com.nesta.repository;
import com.nesta.entity.ProjectConfiguration;
import com.nesta.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface ProjectConfigurationRepository extends JpaRepository<ProjectConfiguration, UUID> {
    Optional<ProjectConfiguration> findByProject(Project project);
}
""")

write_file(os.path.join(base_dir, "repository", "GenerationJobRepository.java"), """package com.nesta.repository;
import com.nesta.entity.GenerationJob;
import com.nesta.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface GenerationJobRepository extends JpaRepository<GenerationJob, UUID> {
    List<GenerationJob> findByProject(Project project);
}
""")

write_file(os.path.join(base_dir, "repository", "ArtifactRepository.java"), """package com.nesta.repository;
import com.nesta.entity.Artifact;
import com.nesta.entity.GenerationJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.List;

@Repository
public interface ArtifactRepository extends JpaRepository<Artifact, UUID> {
    List<Artifact> findByJobIn(List<GenerationJob> jobs);
}
""")

# 3. Registry Component
write_file(os.path.join(base_dir, "service", "TechnologyService.java"), """package com.nesta.service;
import com.nesta.entity.*;
import com.nesta.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TechnologyService {
    private final FrontendTechnologyRepository frontendRepo;
    private final BackendTechnologyRepository backendRepo;
    private final DatabaseTechnologyRepository dbRepo;
    private final FeatureRepository featureRepo;
    private final UITemplateRepository templateRepo;

    public TechnologyService(FrontendTechnologyRepository frontendRepo,
                             BackendTechnologyRepository backendRepo,
                             DatabaseTechnologyRepository dbRepo,
                             FeatureRepository featureRepo,
                             UITemplateRepository templateRepo) {
        this.frontendRepo = frontendRepo;
        this.backendRepo = backendRepo;
        this.dbRepo = dbRepo;
        this.featureRepo = featureRepo;
        this.templateRepo = templateRepo;
    }

    public List<FrontendTechnology> getAllFrontend() { return frontendRepo.findAll(); }
    public List<BackendTechnology> getAllBackend() { return backendRepo.findAll(); }
    public List<DatabaseTechnology> getAllDatabase() { return dbRepo.findAll(); }
    public List<Feature> getAllFeatures() { return featureRepo.findAll(); }
    public List<UITemplate> getAllTemplates() { return templateRepo.findAll(); }
}
""")

write_file(os.path.join(base_dir, "controller", "RegistryController.java"), """package com.nesta.controller;
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
""")

# 4. Validation Component
write_file(os.path.join(base_dir, "service", "CompatibilityValidator.java"), """package com.nesta.service;
import com.nesta.dto.ProjectCreateRequest;
import org.springframework.stereotype.Component;

@Component
public class CompatibilityValidator {
    public void validate(ProjectCreateRequest request) {
        if ("ULTIMATE".equalsIgnoreCase(request.getMode())) {
            if (request.getFrontendTechId() == null || request.getBackendTechId() == null || request.getDatabaseTechId() == null) {
                throw new IllegalArgumentException("Ultimate mode requires frontend, backend, and database selections.");
            }
        } else if ("SIMPLE".equalsIgnoreCase(request.getMode())) {
            if (request.getUiTemplateId() == null) {
                throw new IllegalArgumentException("Simple mode requires a UI template selection.");
            }
        } else {
            throw new IllegalArgumentException("Invalid mode. Must be SIMPLE or ULTIMATE.");
        }
    }
}
""")

# 5. Template Resolver
write_file(os.path.join(base_dir, "service", "TemplateResolver.java"), """package com.nesta.service;
import com.nesta.dto.ProjectCreateRequest;
import org.springframework.stereotype.Component;

@Component
public class TemplateResolver {
    public String resolveTemplatePath(ProjectCreateRequest request) {
        if ("SIMPLE".equalsIgnoreCase(request.getMode())) {
            return "/templates/simple/" + request.getUiTemplateId();
        } else {
            return "/templates/ultimate/custom";
        }
    }
}
""")

# 6. Generator Engine
write_file(os.path.join(base_dir, "config", "AsyncConfig.java"), """package com.nesta.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;

@Configuration
@EnableAsync
public class AsyncConfig {
}
""")

write_file(os.path.join(base_dir, "service", "ProjectGenerator.java"), """package com.nesta.service;
import com.nesta.entity.*;
import com.nesta.repository.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class ProjectGenerator {
    private final GenerationJobRepository jobRepository;
    private final ArtifactRepository artifactRepository;

    public ProjectGenerator(GenerationJobRepository jobRepository, ArtifactRepository artifactRepository) {
        this.jobRepository = jobRepository;
        this.artifactRepository = artifactRepository;
    }

    @Async
    public void generateProjectAsync(GenerationJob job, ProjectConfiguration config) {
        try {
            // Simulate long-running generation process
            Thread.sleep(2000);
            
            Artifact artifact = new Artifact();
            artifact.setJob(job);
            artifact.setName(job.getProject().getName() + "-build.zip");
            artifact.setType("ZIP");
            artifact.setStoragePath("/storage/" + artifact.getName());
            artifactRepository.save(artifact);

            job.setStatus("COMPLETED");
            job.setCompletedAt(LocalDateTime.now());
            jobRepository.save(job);
        } catch (Exception e) {
            job.setStatus("FAILED");
            job.setErrorMessage(e.getMessage());
            job.setCompletedAt(LocalDateTime.now());
            jobRepository.save(job);
        }
    }
}
""")

# 7. Project Service & API
write_file(os.path.join(base_dir, "service", "ProjectService.java"), """package com.nesta.service;
import com.nesta.entity.*;
import com.nesta.repository.*;
import com.nesta.dto.ProjectCreateRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.List;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectConfigurationRepository configRepository;
    private final GenerationJobRepository jobRepository;
    private final ArtifactRepository artifactRepository;
    private final UserRepository userRepository;
    private final CompatibilityValidator validator;
    private final ProjectGenerator generator;
    
    public ProjectService(ProjectRepository projectRepository, ProjectConfigurationRepository configRepository,
                          GenerationJobRepository jobRepository, ArtifactRepository artifactRepository,
                          UserRepository userRepository, CompatibilityValidator validator, ProjectGenerator generator) {
        this.projectRepository = projectRepository;
        this.configRepository = configRepository;
        this.jobRepository = jobRepository;
        this.artifactRepository = artifactRepository;
        this.userRepository = userRepository;
        this.validator = validator;
        this.generator = generator;
    }

    @Transactional
    public Project createProject(String username, ProjectCreateRequest request) {
        validator.validate(request);
        User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setUser(user);
        project = projectRepository.save(project);

        ProjectConfiguration config = new ProjectConfiguration();
        config.setProject(project);
        configRepository.save(config);

        return project;
    }

    public GenerationJob startGeneration(UUID projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        ProjectConfiguration config = configRepository.findByProject(project).orElseThrow(() -> new RuntimeException("Config not found"));
        
        GenerationJob job = new GenerationJob();
        job.setProject(project);
        job.setStatus("STARTED");
        job.setStartedAt(LocalDateTime.now());
        job = jobRepository.save(job);
        
        generator.generateProjectAsync(job, config);
        return job;
    }

    public List<Artifact> getProjectArtifacts(UUID projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        List<GenerationJob> jobs = jobRepository.findByProject(project);
        return artifactRepository.findByJobIn(jobs);
    }
}
""")

write_file(os.path.join(base_dir, "controller", "ProjectController.java"), """package com.nesta.controller;
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
""")
