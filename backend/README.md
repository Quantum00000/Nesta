# Nesta Backend

Nesta Backend is a Spring Boot application providing the core logic, APIs, and generation engine for the Nesta platform.

## Getting Started

1. Ensure Java 21 is installed.
2. Ensure you have a database connection (configured in `application.properties`).
3. Run the application: `./mvnw spring-boot:run`

## Project Structure
- `src/main/java/com/nesta/`
  - `controller/`: REST APIs
  - `service/`: Business logic, Template Resolver, Generation Engine
  - `entity/`: JPA entities
  - `repository/`: Spring Data JPA repositories
  - `security/`: JWT authentication and security configurations
  - `config/`: Application configurations (e.g., AsyncConfig)
  - `dto/`: Data Transfer Objects
  - `bootstrap/`: Application data seeders
