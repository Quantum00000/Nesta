package com.nesta.dto;
import java.util.UUID;
import java.util.List;

public class ProjectCreateRequest {
    private String name;
    private String description;
    private String mode;
    private UUID uiTemplateId;
    private UUID frontendTechId;
    private UUID backendTechId;
    private UUID databaseTechId;
    private List<UUID> featureIds;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    public UUID getUiTemplateId() { return uiTemplateId; }
    public void setUiTemplateId(UUID uiTemplateId) { this.uiTemplateId = uiTemplateId; }
    public UUID getFrontendTechId() { return frontendTechId; }
    public void setFrontendTechId(UUID frontendTechId) { this.frontendTechId = frontendTechId; }
    public UUID getBackendTechId() { return backendTechId; }
    public void setBackendTechId(UUID backendTechId) { this.backendTechId = backendTechId; }
    public UUID getDatabaseTechId() { return databaseTechId; }
    public void setDatabaseTechId(UUID databaseTechId) { this.databaseTechId = databaseTechId; }
    public List<UUID> getFeatureIds() { return featureIds; }
    public void setFeatureIds(List<UUID> featureIds) { this.featureIds = featureIds; }
}
