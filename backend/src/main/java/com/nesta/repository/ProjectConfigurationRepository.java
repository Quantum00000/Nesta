package com.nesta.repository;
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
