package com.nesta.repository;

import com.nesta.entity.FrontendTechnology;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface FrontendTechnologyRepository extends JpaRepository<FrontendTechnology, UUID> {
}
