package com.nesta.service;
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
