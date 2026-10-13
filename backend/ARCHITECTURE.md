# Architecture Overview

## Components
1. **API Layer**: Exposes REST endpoints for client interaction. Protected via JWT.
2. **Service Layer**: Handles business logic, including registry lookups and project configuration validation.
3. **Validation Component**: The `CompatibilityValidator` ensures projects generated in Ultimate mode have valid tech stacks, while Simple mode strictly validates UI template inputs.
4. **Generation Engine**: The `ProjectGenerator` handles heavy I/O operations asynchronously using Spring `@Async`.
5. **Template System**: The `TemplateResolver` dynamically locates and resolves templates based on project mode configuration.

## Async Generation Workflow
1. Client requests project generation.
2. A `GenerationJob` is created and its ID is returned to the client immediately.
3. Background thread reads templates, parses variables (`{{PROJECT_NAME}}`, etc.), and creates artifacts.
4. Client polls or uses websockets to check job completion and retrieve artifacts.
