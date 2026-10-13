Build the complete **backend for my existing project called Nesta** and integrate it with the existing frontend.

Nesta is a **web application builder** with two modes:

### SIMPLE MODE

The user can only:

```text
Select UI Template
        ↓
Generate Project
        ↓
Download Project
```

Deployment support should be architected for future implementation, but the first working version must prioritize **project generation + ZIP download**.

The user must NOT be allowed to manually select frontend/backend/database technologies in Simple mode.

---

### ULTIMATE MODE

The user can configure the application:

```text
Frontend Technology
Backend Technology
Database
UI Template
Features
        ↓
Generate Project
        ↓
Download Project
```

The architecture must allow additional technologies and features to be added later without rewriting the core system.

For the first working version, make these combinations actually work:

```text
Frontend: React
Backend: Spring Boot
Database: PostgreSQL
```

Do not create fake implementations for technologies or deployment providers that are not actually implemented.

---

# 1. FIRST: INSPECT THE EXISTING FRONTEND

Before writing backend code, inspect the entire existing frontend.

Identify:

- Pages
- Routes
- Components
- Forms
- Existing state management
- Existing API/Axios code
- Simple Mode flow
- Ultimate Mode flow
- UI template selection
- Download UI
- Deployment UI
- Technology selection
- Existing mock data
- Existing request/response structures

The existing frontend is the source of truth for the **current UI and user flow**.

Do not redesign the frontend.

Do not delete existing components.

Only modify frontend code where necessary to connect it to the real Spring Boot backend.

---

# 2. PROJECT STRUCTURE

Create a separate folder named:

```text
backend/
```

The final project should look approximately like:

```text
project-root/
│
├── frontend/               # existing frontend
│
├── backend/
│   ├── pom.xml
│   ├── src/
│   ├── README.md
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── TEMPLATE_DEVELOPMENT.md
│   ├── .env.example
│   └── docker-compose.yml   # only if useful
```

If the frontend is not currently inside a `frontend` directory, do not move it unnecessarily. Just create `backend/` separately.

---

# 3. BACKEND STACK

Use:

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Security
- JWT
- Jakarta Validation
- PostgreSQL
- Maven
- Jackson
- SLF4J

Use a **modular monolith**.

Do NOT create microservices.

Do NOT add Kafka, Kubernetes, AWS infrastructure, or other unnecessary complexity for the MVP.

---

# 4. PACKAGE STRUCTURE

Use a feature-oriented structure similar to:

```text
com.nesta
│
├── auth
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   └── security
│
├── user
│
├── project
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   └── mapper
│
├── technology
│
├── template
│
├── feature
│
├── generator
│   ├── service
│   ├── engine
│   ├── provider
│   └── model
│
├── artifact
│
├── deployment
│
├── job
│
└── common
    ├── config
    ├── exception
    ├── response
    └── validation
```

Use constructor-based dependency injection.

Do not expose JPA entities directly from controllers.

---

# 5. DATABASE

Use PostgreSQL.

Create proper entities for:

```text
User
Project
ProjectConfiguration
FrontendTechnology
BackendTechnology
DatabaseTechnology
UITemplate
Feature
GenerationJob
Artifact
Deployment
```

Use UUIDs for IDs where appropriate.

Conceptually:

```text
User
 │
 └── Project
       │
       ├── ProjectConfiguration
       ├── GenerationJob
       ├── Artifact
       └── Deployment
```

Do not use Java enums for values that I may want to add dynamically.

For example:

```text
UI Templates
Frontend Technologies
Backend Technologies
Databases
Features
```

should be database/configuration driven.

Enums are fine for fixed statuses such as:

```text
ProjectMode
GenerationStatus
DeploymentStatus
```

---

# 6. APPLICATION SPECIFICATION

The central concept of Nesta must be an **Application Specification**.

Represent the selected application configuration in a structured model.

Conceptually:

```json
{
  "mode": "ULTIMATE",
  "frontend": "REACT",
  "backend": "SPRING_BOOT",
  "database": "POSTGRESQL",
  "uiTemplate": "SAAS_DASHBOARD",
  "features": [
    "JWT_AUTH"
  ],
  "deployment": "DOWNLOAD"
}
```

The following systems should operate from this specification:

```text
Validation
Generation
Artifact creation
Deployment
```

Do not duplicate configuration logic across different modules.

---

# 7. SIMPLE MODE VALIDATION

Simple mode must be enforced by the backend.

Example:

```json
{
  "mode": "SIMPLE",
  "uiTemplate": "SAAS_DASHBOARD",
  "frontend": "REACT",
  "backend": "SPRING_BOOT"
}
```

The backend must ignore/reject fields that are not allowed in Simple mode according to the product rules.

Simple mode should resolve its predefined stack internally.

Frontend validation alone is NOT sufficient.

---

# 8. ULTIMATE MODE

Ultimate mode should allow:

```text
Frontend
Backend
Database
UI Template
Features
```

The exact options displayed by the frontend should come from backend APIs wherever possible.

Do not hardcode technology lists in multiple frontend components.

---

# 9. TECHNOLOGY REGISTRY

Create database/configuration-driven registries.

Provide APIs such as:

```http
GET /api/technologies/frontend
GET /api/technologies/backend
GET /api/technologies/database
GET /api/features
GET /api/templates
```

Seed the database with:

```text
Frontend:
React

Backend:
Spring Boot

Database:
PostgreSQL

Features:
JWT Authentication

UI Templates:
At least 2 example templates
```

The architecture must make adding another technology straightforward.

---

# 10. COMPATIBILITY VALIDATION

Create a dedicated validation component:

```text
CompatibilityValidator
```

It must validate the selected:

```text
Frontend
Backend
Database
Features
Template
```

before generation.

Do not scatter compatibility checks across controllers.

Return meaningful errors such as:

```json
{
  "success": false,
  "errorCode": "INVALID_CONFIGURATION",
  "message": "Selected frontend and backend combination is not supported."
}
```

---

# 11. TEMPLATE SYSTEM

This is one of the most important requirements.

I must be able to add my own UI templates later without changing the core generation code.

Create a clear directory structure such as:

```text
backend/
└── templates/
    ├── simple/
    │   ├── template-1/
    │   └── template-2/
    │
    └── ultimate/
        └── template-1/
```

You may improve this structure if needed, but keep it easy to understand.

A template may contain normal project files such as:

```text
package.json
src/
public/
README.md
...
```

Support variable replacement in text files.

Example:

```text
{{PROJECT_NAME}}
{{API_BASE_URL}}
{{PACKAGE_NAME}}
```

Do NOT blindly replace variables in binary files.

The template system must have metadata such as:

```text
id
name
description
version
preview
supportedFrontend
location
active
```

Make template discovery/resolution separate from generation logic.

---

# 12. TEMPLATE DOCUMENTATION

Create:

```text
backend/TEMPLATE_DEVELOPMENT.md
```

This must explain exactly:

### Adding a UI template

Step by step:

```text
1. Create template directory
2. Add required files
3. Add metadata
4. Define supported frontend
5. Add preview
6. Register template
7. Test template
8. Generate project
```

Also document:

- Template folder structure
- Metadata format
- Available variables
- Naming rules
- Supported technologies
- How template discovery works
- How to enable/disable a template
- How to add a new frontend technology
- How to add a new backend technology
- How to add a new database
- How to add a feature
- How to test everything

Use actual examples.

A developer unfamiliar with the backend should be able to follow this document and add a new template.

---

# 13. PROJECT GENERATION

Create a dedicated generation engine.

Do not create one giant:

```java
ProjectGenerationService
```

with thousands of lines.

Use abstractions such as:

```java
ProjectGenerator
TemplateResolver
FrontendGenerator
BackendGenerator
DatabaseGenerator
FeatureGenerator
```

The architecture should conceptually work like:

```text
Application Specification
        ↓
Validation
        ↓
Template Resolution
        ↓
Frontend Generation
        ↓
Backend Generation
        ↓
Database Configuration
        ↓
Feature Generation
        ↓
Project Assembly
        ↓
ZIP
```

The generator must actually create a working project for the MVP combination:

```text
React
+
Spring Boot
+
PostgreSQL
```

Do not merely create placeholder files and claim generation is complete.

---

# 14. GENERATION JOBS

Do not keep long project generation inside a normal HTTP request.

Create a `GenerationJob` entity with statuses such as:

```text
QUEUED
GENERATING
PACKAGING
COMPLETED
FAILED
```

Flow:

```text
POST /api/projects/{id}/generate
        ↓
Create GenerationJob
        ↓
Return job ID
```

Example:

```json
{
  "jobId": "uuid",
  "status": "QUEUED"
}
```

Then expose:

```http
GET /api/projects/{id}/generation-status
```

For the MVP, use a simple reliable asynchronous/background implementation.

Structure it so Redis can be added later.

Do NOT introduce Kafka just for this.

---

# 15. ZIP ARTIFACT

After generation:

```text
Generated Project
        ↓
ZIP file
        ↓
Artifact
```

Create:

```text
Artifact
```

with useful metadata.

For the MVP, local filesystem storage is acceptable.

However, create an abstraction:

```java
ArtifactStorage
```

so later I can replace local storage with:

```text
S3
MinIO
Cloud Storage
```

without rewriting generation logic.

---

# 16. DOWNLOAD

Expose an endpoint such as:

```http
GET /api/artifacts/{id}/download
```

Only authorized users who own the associated project should be able to download it.

---

# 17. DEPLOYMENT ARCHITECTURE

Create a deployment abstraction:

```java
DeploymentProvider
```

This should make future providers possible:

```text
Docker
AWS
Azure
GCP
Vercel
Render
```

But for the MVP:

**Do not implement fake deployment functionality.**

If actual deployment is not yet implemented, the API should return a clear response saying it is unavailable/not configured.

The architecture should be ready for real providers later.

---

# 18. AUTHENTICATION

Implement:

```text
Register
Login
JWT access token
Refresh token
Authorization
```

Use Spring Security.

Passwords must be securely hashed.

Never store plaintext passwords.

Protect project/generation/artifact/deployment endpoints.

Users must only be able to access their own projects.

---

# 19. REST API

Build APIs based on the actual existing frontend.

At minimum provide:

### Auth

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
```

### Templates

```http
GET /api/templates
GET /api/templates/{id}
```

### Technologies

```http
GET /api/technologies/frontend
GET /api/technologies/backend
GET /api/technologies/database
```

### Features

```http
GET /api/features
```

### Projects

```http
POST /api/projects
GET /api/projects
GET /api/projects/{id}
PATCH /api/projects/{id}
DELETE /api/projects/{id}
```

### Validation

```http
POST /api/projects/{id}/validate
```

### Generation

```http
POST /api/projects/{id}/generate
GET /api/projects/{id}/generation-status
```

### Artifacts

```http
GET /api/projects/{id}/artifacts
GET /api/artifacts/{id}/download
```

### Deployment

```http
POST /api/projects/{id}/deploy
GET /api/projects/{id}/deployment
POST /api/projects/{id}/deployment/stop
```

These are baseline endpoints.

After inspecting the frontend, adjust/add endpoints to match the real UI exactly.

---

# 20. FRONTEND INTEGRATION

This is mandatory.

After the backend is created, connect the existing frontend to it.

Replace frontend mock/static API data where backend APIs now exist.

Connect all applicable flows:

```text
Authentication
Templates
Technologies
Features
Project creation
Project editing
Configuration
Validation
Generation
Generation status
Download
Deployment status
```

Create/use a centralized frontend API layer.

Do not scatter URLs throughout components.

Use environment configuration such as:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Configure CORS correctly.

Fix all request/response mismatches.

Make sure frontend loading/error/success states work correctly.

---

# 21. FRONTEND USER FLOW

Verify these real flows.

## Simple mode

```text
Simple Mode
    ↓
Fetch Templates
    ↓
Select Template
    ↓
Create Project
    ↓
Validate
    ↓
Generate
    ↓
Wait for generation completion
    ↓
Download ZIP
```

## Ultimate mode

```text
Ultimate Mode
    ↓
Fetch Frontend Technologies
    ↓
Fetch Backend Technologies
    ↓
Fetch Database Technologies
    ↓
Fetch Features
    ↓
Fetch Templates
    ↓
Create Project
    ↓
Validate
    ↓
Generate
    ↓
Wait for completion
    ↓
Download ZIP
```

Test these flows end-to-end.

---

# 22. DTOs

Use DTOs instead of exposing entities.

Create appropriate request/response DTOs such as:

```text
RegisterRequest
LoginRequest
LoginResponse

CreateProjectRequest
UpdateProjectRequest
ProjectResponse

ProjectConfigurationRequest
ValidationResponse

GenerationResponse
GenerationStatusResponse

ArtifactResponse
DeploymentResponse
```

Use Jakarta Bean Validation.

---

# 23. ERROR HANDLING

Create a global:

```java
@RestControllerAdvice
```

Use a consistent error format:

```json
{
  "success": false,
  "message": "Project not found",
  "errorCode": "PROJECT_NOT_FOUND",
  "timestamp": "...",
  "path": "..."
}
```

Never expose stack traces to users.

Log technical details on the backend.

---

# 24. SECURITY FOR FILE GENERATION

Because Nesta generates project files, explicitly protect against:

- Path traversal
- Arbitrary filesystem writes
- Malicious filenames
- User-controlled command execution
- Unsafe template paths
- Writing outside the generated project directory

Do not execute arbitrary generated scripts based directly on user input.

---

# 25. DOCUMENTATION

Create these files:

```text
backend/README.md
backend/API_DOCUMENTATION.md
backend/ARCHITECTURE.md
backend/TEMPLATE_DEVELOPMENT.md
backend/.env.example
```

### README.md

Document:

- Requirements
- Java version
- Maven
- PostgreSQL setup
- Environment variables
- Running backend
- Running tests
- Swagger
- Frontend configuration
- Template location
- Generation flow
- Troubleshooting

### API_DOCUMENTATION.md

For every API document:

```text
HTTP method
URL
Authentication
Request
Response
Errors
Example
```

### ARCHITECTURE.md

Explain:

```text
System architecture
Package structure
Database structure
Authentication
Simple mode
Ultimate mode
Validation
Generation
Artifact storage
Deployment
Extension points
```

Use Mermaid diagrams where helpful.

---

# 26. SWAGGER / OPENAPI

Add Swagger/OpenAPI documentation.

It should allow me to inspect and test the APIs locally.

Document authentication where appropriate.

---

# 27. ENVIRONMENT CONFIGURATION

Create:

```text
backend/.env.example
```

Include placeholders for:

```env
DATABASE_URL=
DATABASE_USERNAME=
DATABASE_PASSWORD=

JWT_SECRET=

CORS_ALLOWED_ORIGINS=

ARTIFACT_STORAGE_PATH=
```

Add cloud/deployment variables only where actually required.

Never commit real secrets.

---

# 28. DATABASE SEEDING

Add development seed data for:

```text
React
Spring Boot
PostgreSQL
JWT Authentication
2–3 example UI templates
```

Make this seed data replaceable/extensible.

Do not hardcode business logic around the seed IDs.

---

# 29. TESTING

Create meaningful tests for:

```text
Registration
Login
JWT authentication
Project creation
Project ownership
Simple mode validation
Ultimate mode validation
Compatibility validation
Template resolution
Project generation
ZIP generation
Artifact access
Invalid input
Unauthorized access
```

The project must compile successfully.

Tests must actually test behavior.

---

# 30. DO NOT OVERENGINEER THE MVP

For this first version:

### MUST WORK

```text
Simple mode
UI templates
Ultimate mode
React
Spring Boot
PostgreSQL
Project configuration
Validation
Project generation
ZIP packaging
Download
Authentication
Frontend integration
```

### ARCHITECTURE ONLY FOR NOW

```text
AWS deployment
Azure deployment
GCP deployment
Vercel deployment
Multiple frontend frameworks
Multiple backend frameworks
AI generation
Redis scaling
Kafka
Microservices
Kubernetes
```

Create proper extension points for these, but do not build fake or unfinished implementations unless they are required by the existing frontend.

---

# 31. FINAL VERIFICATION

After implementation:

1. Start PostgreSQL.
2. Start Spring Boot.
3. Start the frontend.
4. Verify CORS.
5. Register a user.
6. Login.
7. Open Simple Mode.
8. Load templates from backend.
9. Create a project.
10. Generate it.
11. Download the ZIP.
12. Open Ultimate Mode.
13. Load technologies from backend.
14. Select React + Spring Boot + PostgreSQL.
15. Select a template.
16. Validate configuration.
17. Generate project.
18. Download the generated ZIP.
19. Verify project ownership/security.
20. Verify invalid configurations are rejected.
21. Verify the backend compiles.
22. Run tests.
23. Fix any integration problems.

Do not consider the task complete merely because files were created.

The criterion is:

**The existing frontend and the new Spring Boot backend must work together as a functioning Nesta MVP.**

---

# 32. FINAL RESPONSE FROM ANTIGRAVITY

When finished, report:

```text
Backend location:
Spring Boot version:
Database:
Authentication:
APIs created:
Frontend APIs connected:
Simple Mode:
Ultimate Mode:
Project generation:
ZIP download:
Deployment status:
Swagger URL:
Tests:
Documentation files:
How to add a template:
How to add a technology:
Known limitations:
```

Also explicitly list any parts that are architectural placeholders rather than fully implemented functionality.

Do not claim a feature is working unless you actually verified it.
