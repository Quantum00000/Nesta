package com.nesta.service;
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
