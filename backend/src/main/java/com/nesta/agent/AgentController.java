package com.nesta.agent;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping({"/api/agent", "/agent"})
public class AgentController {
    
    private final AppDescriptionAgentService agentService;

    public AgentController(AppDescriptionAgentService agentService) {
        this.agentService = agentService;
    }

    @PostMapping("/describe")
    public ResponseEntity<?> describeApp(@RequestBody Map<String, String> request) {
        String description = request.get("description");
        if (description == null || description.isEmpty()) {
            return ResponseEntity.badRequest().body("Description is required");
        }
        
        AgentToolsConfig.currentDetails.remove();
        String response = agentService.processDescription(description);
        AgentToolsConfig.ProjectDetails details = AgentToolsConfig.currentDetails.get();
        AgentToolsConfig.currentDetails.remove();
        
        return ResponseEntity.ok(Map.of(
            "message", response,
            "config", details != null ? details : Map.of()
        ));
    }
}

