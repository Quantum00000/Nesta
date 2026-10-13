package com.nesta.repository;
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
