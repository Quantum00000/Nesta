package com.nesta.service;
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
