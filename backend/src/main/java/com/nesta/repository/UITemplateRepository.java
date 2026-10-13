package com.nesta.repository;

import com.nesta.entity.UITemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import org.springframework.stereotype.Repository;

@Repository
public interface UITemplateRepository extends JpaRepository<UITemplate, UUID> {
}
