package com.nesta.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "project_configurations")
public class ProjectConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    private FrontendTechnology frontendTechnology;

    @ManyToOne
    private BackendTechnology backendTechnology;

    @ManyToOne
    private DatabaseTechnology databaseTechnology;

    @ManyToOne
    private UITemplate uiTemplate;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public FrontendTechnology getFrontendTechnology() { return frontendTechnology; }
    public void setFrontendTechnology(FrontendTechnology frontendTechnology) { this.frontendTechnology = frontendTechnology; }

    public BackendTechnology getBackendTechnology() { return backendTechnology; }
    public void setBackendTechnology(BackendTechnology backendTechnology) { this.backendTechnology = backendTechnology; }

    public DatabaseTechnology getDatabaseTechnology() { return databaseTechnology; }
    public void setDatabaseTechnology(DatabaseTechnology databaseTechnology) { this.databaseTechnology = databaseTechnology; }

    public UITemplate getUiTemplate() { return uiTemplate; }
    public void setUiTemplate(UITemplate uiTemplate) { this.uiTemplate = uiTemplate; }

}
