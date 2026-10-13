import os

content = """package com.nesta.service;

import com.nesta.entity.*;
import com.nesta.repository.*;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.zip.*;

@Service
public class ProjectGenerator {
    private final GenerationJobRepository jobRepository;
    private final ArtifactRepository artifactRepository;

    public ProjectGenerator(GenerationJobRepository jobRepository, ArtifactRepository artifactRepository) {
        this.jobRepository = jobRepository;
        this.artifactRepository = artifactRepository;
    }

    @Async
    public void generateProjectAsync(GenerationJob job, ProjectConfiguration config) {
        try {
            String projectName = job.getProject().getName();
            String projectDesc = job.getProject().getDescription();
            if (projectName == null || projectName.isEmpty()) projectName = "nesta-app";
            if (projectDesc == null || projectDesc.isEmpty()) projectDesc = "Generated MVP";
            String safeName = projectName.replaceAll("[^a-zA-Z0-9-_]", "-");
            
            Path tempDir = Files.createTempDirectory("nesta_gen_" + safeName);
            Path projectDir = tempDir.resolve(safeName);
            Files.createDirectories(projectDir);

            // Determine Tech Stack
            String backendTech = config.getBackendTechnology() != null ? config.getBackendTechnology().getName() : "Spring Boot";
            String frontendTech = config.getFrontendTechnology() != null ? config.getFrontendTechnology().getName() : "React";

            // Generate Backend
            if (backendTech.toLowerCase().contains("express")) {
                generateExpressBackend(projectDir, safeName, projectDesc);
            } else {
                generateSpringBootBackend(projectDir, safeName, projectDesc);
            }

            // Generate Frontend
            if (frontendTech.toLowerCase().contains("vue")) {
                generateVueFrontend(projectDir, safeName, projectDesc);
            } else {
                generateReactFrontend(projectDir, safeName, projectDesc);
            }

            // Zip the folder
            Path artifactsDir = Paths.get("artifacts");
            Files.createDirectories(artifactsDir);
            String zipFileName = safeName + "-" + System.currentTimeMillis() + "-build.zip";
            Path zipFilePath = artifactsDir.resolve(zipFileName);
            
            zipDirectory(projectDir.toFile(), zipFilePath.toFile());

            // Save artifact reference
            Artifact artifact = new Artifact();
            artifact.setJob(job);
            artifact.setName(zipFileName);
            artifact.setType("ZIP");
            artifact.setStoragePath(zipFilePath.toAbsolutePath().toString());
            artifactRepository.save(artifact);

            job.setStatus("COMPLETED");
            jobRepository.save(job);

            // Cleanup temp directory
            deleteDirectory(tempDir.toFile());

        } catch (Exception e) {
            e.printStackTrace();
            job.setStatus("FAILED");
            jobRepository.save(job);
        }
    }

    private void generateExpressBackend(Path projectDir, String name, String desc) throws IOException {
        Path backendDir = projectDir.resolve("backend");
        Files.createDirectories(backendDir);
        
        Files.writeString(backendDir.resolve("package.json"), "{\\n" +
               "  \\"name\\": \\"" + name + "-backend\\",\\n" +
               "  \\"description\\": \\"" + desc + "\\",\\n" +
               "  \\"version\\": \\"1.0.0\\",\\n" +
               "  \\"main\\": \\"server.js\\",\\n" +
               "  \\"scripts\\": {\\n" +
               "    \\"start\\": \\"node server.js\\"\\n" +
               "  },\\n" +
               "  \\"dependencies\\": {\\n" +
               "    \\"express\\": \\"^4.18.2\\",\\n" +
               "    \\"cors\\": \\"^2.8.5\\"\\n" +
               "  }\\n" +
               "}\\n");
               
        Files.writeString(backendDir.resolve("server.js"), "const express = require('express');\\n" +
               "const cors = require('cors');\\n" +
               "const app = express();\\n\\n" +
               "app.use(cors());\\n" +
               "app.use(express.json());\\n\\n" +
               "app.get('/api/hello', (req, res) => {\\n" +
               "  res.json({ message: 'Hello from Express Backend!' });\\n" +
               "});\\n\\n" +
               "const PORT = process.env.PORT || 8080;\\n" +
               "app.listen(PORT, () => {\\n" +
               "  console.log(`Server running on port ${PORT}`);\\n" +
               "});\\n");
    }

    private void generateSpringBootBackend(Path projectDir, String name, String desc) throws IOException {
        Path backendDir = projectDir.resolve("backend");
        Files.createDirectories(backendDir);
        Files.createDirectories(backendDir.resolve("src/main/java/com/example/demo"));
        Files.createDirectories(backendDir.resolve("src/main/resources"));
        
        Files.writeString(backendDir.resolve("pom.xml"), getPomXml(name, desc));
        Files.writeString(backendDir.resolve("src/main/java/com/example/demo/DemoApplication.java"), getApplicationJava());
        Files.writeString(backendDir.resolve("src/main/resources/application.yml"), getApplicationYml());
        Files.writeString(backendDir.resolve("src/main/java/com/example/demo/HelloController.java"), getControllerJava());
    }

    private void generateVueFrontend(Path projectDir, String name, String desc) throws IOException {
        Path frontendDir = projectDir.resolve("frontend");
        Files.createDirectories(frontendDir);
        Files.createDirectories(frontendDir.resolve("src"));
        Files.createDirectories(frontendDir.resolve("public"));
        
        Files.writeString(frontendDir.resolve("package.json"), "{\\n" +
               "  \\"name\\": \\"" + name + "\\",\\n" +
               "  \\"description\\": \\"" + desc + "\\",\\n" +
               "  \\"private\\": true,\\n" +
               "  \\"version\\": \\"0.0.0\\",\\n" +
               "  \\"type\\": \\"module\\",\\n" +
               "  \\"scripts\\": {\\n" +
               "    \\"dev\\": \\"vite\\",\\n" +
               "    \\"build\\": \\"vite build\\",\\n" +
               "    \\"preview\\": \\"vite preview\\"\\n" +
               "  },\\n" +
               "  \\"dependencies\\": {\\n" +
               "    \\"vue\\": \\"^3.4.21\\"\\n" +
               "  },\\n" +
               "  \\"devDependencies\\": {\\n" +
               "    \\"@vitejs/plugin-vue\\": \\"^5.0.4\\",\\n" +
               "    \\"vite\\": \\"^5.2.0\\"\\n" +
               "  }\\n" +
               "}\\n");
               
        Files.writeString(frontendDir.resolve("vite.config.js"), "import { defineConfig } from 'vite'\\n" +
               "import vue from '@vitejs/plugin-vue'\\n\\n" +
               "export default defineConfig({\\n" +
               "  plugins: [vue()],\\n" +
               "  server: {\\n" +
               "    proxy: {\\n" +
               "      '/api': 'http://localhost:8080'\\n" +
               "    }\\n" +
               "  }\\n" +
               "})\\n");
               
        Files.writeString(frontendDir.resolve("index.html"), "<!doctype html>\\n" +
               "<html lang=\\"en\\">\\n" +
               "  <head>\\n" +
               "    <meta charset=\\"UTF-8\\" />\\n" +
               "    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n" +
               "    <title>" + name + " App</title>\\n" +
               "  </head>\\n" +
               "  <body>\\n" +
               "    <div id=\\"app\\"></div>\\n" +
               "    <script type=\\"module\\" src=\\"/src/main.js\\"></script>\\n" +
               "  </body>\\n" +
               "</html>\\n");
               
        Files.writeString(frontendDir.resolve("src/main.js"), "import { createApp } from 'vue'\\n" +
               "import App from './App.vue'\\n\\n" +
               "createApp(App).mount('#app')\\n");
               
        Files.writeString(frontendDir.resolve("src/App.vue"), "<script setup>\\n" +
               "import { ref, onMounted } from 'vue'\\n\\n" +
               "const msg = ref('')\\n\\n" +
               "onMounted(async () => {\\n" +
               "  const res = await fetch('/api/hello')\\n" +
               "  let text = await res.text()\\n" +
               "  try { text = JSON.parse(text).message } catch(e) {}\\n" +
               "  msg.value = text\\n" +
               "})\\n" +
               "</script>\\n\\n" +
               "<template>\\n" +
               "  <div style=\\"font-family: sans-serif; padding: 2rem;\\">\\n" +
               "    <h1>Generated MVP App</h1>\\n" +
               "    <p>Backend says: {{ msg }}</p>\\n" +
               "  </div>\\n" +
               "</template>\\n");
    }

    private void generateReactFrontend(Path projectDir, String name, String desc) throws IOException {
        Path frontendDir = projectDir.resolve("frontend");
        Files.createDirectories(frontendDir);
        Files.createDirectories(frontendDir.resolve("src"));
        Files.createDirectories(frontendDir.resolve("public"));
        
        Files.writeString(frontendDir.resolve("package.json"), getPackageJson(name, desc));
        Files.writeString(frontendDir.resolve("vite.config.js"), getViteConfig());
        Files.writeString(frontendDir.resolve("index.html"), getIndexHtml(name));
        Files.writeString(frontendDir.resolve("src/main.jsx"), getMainJsx());
        Files.writeString(frontendDir.resolve("src/App.jsx"), getAppJsx());
    }

    private void zipDirectory(File dir, File zipFile) throws IOException {
        try (FileOutputStream fos = new FileOutputStream(zipFile);
             ZipOutputStream zos = new ZipOutputStream(fos)) {
            zipFile(dir, dir, zos);
        }
    }

    private void zipFile(File rootDir, File fileToZip, ZipOutputStream zos) throws IOException {
        if (fileToZip.isHidden()) return;
        if (fileToZip.isDirectory()) {
            if (fileToZip.getName().endsWith(".zip")) return;
            for (File childFile : fileToZip.listFiles()) {
                zipFile(rootDir, childFile, zos);
            }
            return;
        }
        String zipEntryName = rootDir.toPath().relativize(fileToZip.toPath()).toString().replace("\\\\", "/");
        ZipEntry zipEntry = new ZipEntry(zipEntryName);
        zos.putNextEntry(zipEntry);
        Files.copy(fileToZip.toPath(), zos);
        zos.closeEntry();
    }

    private void deleteDirectory(File directoryToBeDeleted) {
        File[] allContents = directoryToBeDeleted.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                deleteDirectory(file);
            }
        }
        directoryToBeDeleted.delete();
    }

    private String getPomXml(String name, String desc) {
        return "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>\\n" +
               "<project xmlns=\\"http://maven.apache.org/POM/4.0.0\\" xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\"\\n" +
               "         xsi:schemaLocation=\\"http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd\\">\\n" +
               "    <modelVersion>4.0.0</modelVersion>\\n" +
               "    <parent>\\n" +
               "        <groupId>org.springframework.boot</groupId>\\n" +
               "        <artifactId>spring-boot-starter-parent</artifactId>\\n" +
               "        <version>3.2.4</version>\\n" +
               "        <relativePath/>\\n" +
               "    </parent>\\n" +
               "    <groupId>com.example</groupId>\\n" +
               "    <artifactId>" + name + "</artifactId>\\n" +
               "    <version>0.0.1-SNAPSHOT</version>\\n" +
               "    <name>" + name + "</name>\\n" +
               "    <description>" + desc + "</description>\\n" +
               "    <properties>\\n" +
               "        <java.version>21</java.version>\\n" +
               "    </properties>\\n" +
               "    <dependencies>\\n" +
               "        <dependency>\\n" +
               "            <groupId>org.springframework.boot</groupId>\\n" +
               "            <artifactId>spring-boot-starter-web</artifactId>\\n" +
               "        </dependency>\\n" +
               "        <dependency>\\n" +
               "            <groupId>org.springframework.boot</groupId>\\n" +
               "            <artifactId>spring-boot-starter-data-jpa</artifactId>\\n" +
               "        </dependency>\\n" +
               "        <dependency>\\n" +
               "            <groupId>org.postgresql</groupId>\\n" +
               "            <artifactId>postgresql</artifactId>\\n" +
               "            <scope>runtime</scope>\\n" +
               "        </dependency>\\n" +
               "    </dependencies>\\n" +
               "    <build>\\n" +
               "        <plugins>\\n" +
               "            <plugin>\\n" +
               "                <groupId>org.springframework.boot</groupId>\\n" +
               "                <artifactId>spring-boot-maven-plugin</artifactId>\\n" +
               "            </plugin>\\n" +
               "        </plugins>\\n" +
               "    </build>\\n" +
               "</project>";
    }

    private String getApplicationJava() {
        return "package com.example.demo;\\n" +
               "import org.springframework.boot.SpringApplication;\\n" +
               "import org.springframework.boot.autoconfigure.SpringBootApplication;\\n" +
               "@SpringBootApplication\\n" +
               "public class DemoApplication {\\n" +
               "    public static void main(String[] args) {\\n" +
               "        SpringApplication.run(DemoApplication.class, args);\\n" +
               "    }\\n" +
               "}\\n";
    }

    private String getControllerJava() {
        return "package com.example.demo;\\n" +
               "import org.springframework.web.bind.annotation.GetMapping;\\n" +
               "import org.springframework.web.bind.annotation.RestController;\\n" +
               "@RestController\\n" +
               "public class HelloController {\\n" +
               "    @GetMapping(\\"/api/hello\\")\\n" +
               "    public String hello() {\\n" +
               "        return \\"{\\\\\\"message\\\\\\": \\\\\\"Hello from Spring Boot!\\\\\\"}\\";\\n" +
               "    }\\n" +
               "}\\n";
    }

    private String getApplicationYml() {
        return "spring:\\n" +
               "  datasource:\\n" +
               "    url: jdbc:postgresql://localhost:5432/postgres\\n" +
               "    username: postgres\\n" +
               "    password: postgres\\n" +
               "  jpa:\\n" +
               "    hibernate:\\n" +
               "      ddl-auto: update\\n" +
               "server:\\n" +
               "  port: 8080\\n";
    }

    private String getPackageJson(String name, String desc) {
        return "{\\n" +
               "  \\"name\\": \\"" + name + "\\",\\n" +
               "  \\"description\\": \\"" + desc + "\\",\\n" +
               "  \\"private\\": true,\\n" +
               "  \\"version\\": \\"0.0.0\\",\\n" +
               "  \\"type\\": \\"module\\",\\n" +
               "  \\"scripts\\": {\\n" +
               "    \\"dev\\": \\"vite\\",\\n" +
               "    \\"build\\": \\"vite build\\",\\n" +
               "    \\"preview\\": \\"vite preview\\"\\n" +
               "  },\\n" +
               "  \\"dependencies\\": {\\n" +
               "    \\"react\\": \\"^18.2.0\\",\\n" +
               "    \\"react-dom\\": \\"^18.2.0\\"\\n" +
               "  },\\n" +
               "  \\"devDependencies\\": {\\n" +
               "    \\"@vitejs/plugin-react\\": \\"^4.2.1\\",\\n" +
               "    \\"vite\\": \\"^5.2.0\\"\\n" +
               "  }\\n" +
               "}\\n";
    }

    private String getViteConfig() {
        return "import { defineConfig } from 'vite'\\n" +
               "import react from '@vitejs/plugin-react'\\n" +
               "export default defineConfig({\\n" +
               "  plugins: [react()],\\n" +
               "  server: {\\n" +
               "    proxy: {\\n" +
               "      '/api': 'http://localhost:8080'\\n" +
               "    }\\n" +
               "  }\\n" +
               "})\\n";
    }

    private String getIndexHtml(String name) {
        return "<!doctype html>\\n" +
               "<html lang=\\"en\\">\\n" +
               "  <head>\\n" +
               "    <meta charset=\\"UTF-8\\" />\\n" +
               "    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n" +
               "    <title>" + name + " App</title>\\n" +
               "  </head>\\n" +
               "  <body>\\n" +
               "    <div id=\\"root\\"></div>\\n" +
               "    <script type=\\"module\\" src=\\"/src/main.jsx\\"></script>\\n" +
               "  </body>\\n" +
               "</html>\\n";
    }

    private String getMainJsx() {
        return "import React from 'react'\\n" +
               "import ReactDOM from 'react-dom/client'\\n" +
               "import App from './App.jsx'\\n" +
               "ReactDOM.createRoot(document.getElementById('root')).render(\\n" +
               "  <React.StrictMode>\\n" +
               "    <App />\\n" +
               "  </React.StrictMode>,\\n" +
               ")\\n";
    }

    private String getAppJsx() {
        return "import { useState, useEffect } from 'react'\\n" +
               "function App() {\\n" +
               "  const [msg, setMsg] = useState('')\\n" +
               "  useEffect(() => {\\n" +
               "    fetch('/api/hello')\\n" +
               "      .then(r => r.json())\\n" +
               "      .then(data => setMsg(data.message))\\n" +
               "      .catch(e => {\\n" +
               "         fetch('/api/hello').then(r => r.text()).then(setMsg)\\n" +
               "      })\\n" +
               "  }, [])\\n" +
               "  return (\\n" +
               "    <div style={{fontFamily: 'sans-serif', padding: '2rem'}}>\\n" +
               "      <h1>Generated MVP App</h1>\\n" +
               "      <p>Backend says: {msg}</p>\\n" +
               "    </div>\\n" +
               "  )\\n" +
               "}\\n" +
               "export default App\\n";
    }
}
"""

with open('src/main/java/com/nesta/service/ProjectGenerator.java', 'w', encoding='utf-8') as f:
    f.write(content)
