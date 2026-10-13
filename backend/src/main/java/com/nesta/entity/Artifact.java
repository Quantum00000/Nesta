package com.nesta.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "artifacts")
public class Artifact {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private GenerationJob job;

    private String name;

    private String type;

    private String storagePath;

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public GenerationJob getJob() { return job; }
    public void setJob(GenerationJob job) { this.job = job; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStoragePath() { return storagePath; }
    public void setStoragePath(String storagePath) { this.storagePath = storagePath; }

}
