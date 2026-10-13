package com.nesta.service;
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
