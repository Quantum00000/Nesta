package com.nesta.repository;

import com.nesta.entity.BackendTechnology;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface BackendTechnologyRepository extends JpaRepository<BackendTechnology, UUID> {
}
