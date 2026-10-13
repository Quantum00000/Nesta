package com.nesta.repository;

import com.nesta.entity.DatabaseTechnology;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseTechnologyRepository extends JpaRepository<DatabaseTechnology, UUID> {
}
