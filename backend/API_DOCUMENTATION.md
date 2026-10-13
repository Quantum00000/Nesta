# API Documentation

## Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login and receive JWT
- `POST /api/auth/refresh`: Refresh an existing JWT

## Technologies & Registry
- `GET /api/technologies/frontend`: Get all frontend frameworks
- `GET /api/technologies/backend`: Get all backend frameworks
- `GET /api/technologies/database`: Get all databases
- `GET /api/features`: Get all available features
- `GET /api/templates`: Get all UI templates

## Projects
- `POST /api/projects`: Create a new project configuration
- `POST /api/projects/{id}/generate`: Trigger async generation job
- `GET /api/projects/{id}/artifacts`: Get all generated artifacts
