# Template Development Guide

Nesta's generation engine supports two modes: Simple and Ultimate.

## Adding a Simple Template
1. Create a new directory in `templates/simple/<template-name>`.
2. Add all necessary scaffold files.
3. Use moustache-like variables in the files (e.g., `{{PROJECT_NAME}}`).
4. Add the template entry in the `DataSeeder` or DB registry.

## Adding an Ultimate Template Segment
1. Create a segment directory in `templates/ultimate/<technology-name>`.
2. Ensure variable mappings for features (e.g., `{{FEATURES_LIST}}`) exist.
3. Update the `TemplateResolver` logic to merge these template segments correctly based on `CompatibilityValidator` outputs.
