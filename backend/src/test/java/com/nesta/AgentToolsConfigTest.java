package com.nesta;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nesta.agent.AgentToolsConfig;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class AgentToolsConfigTest {

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    public void testDeserializeStringifiedPricingTier() throws Exception {
        String json = """
        {
            "projectName": "PulseDex",
            "pricingTier1": "{\\"name\\": \\"Institutional Core\\", \\"price\\": \\"$8,500\\", \\"period\\": \\"/month\\", \\"desc\\": \\"Co-located market data\\"}",
            "pricingTier2": {
                "name": "Market Maker Ultra",
                "price": "$25,000",
                "period": "/month",
                "desc": "Ultra low latency",
                "badge": "POPULAR"
            }
        }
        """;

        AgentToolsConfig.ProjectDetails details = mapper.readValue(json, AgentToolsConfig.ProjectDetails.class);
        assertNotNull(details);
        assertEquals("PulseDex", details.projectName());
        assertNotNull(details.pricingTier1());
        assertEquals("Institutional Core", details.pricingTier1().name());
        assertEquals("$8,500", details.pricingTier1().price());
        assertEquals("/month", details.pricingTier1().period());

        assertNotNull(details.pricingTier2());
        assertEquals("Market Maker Ultra", details.pricingTier2().name());
        assertEquals("$25,000", details.pricingTier2().price());
    }

    @Test
    public void testDeserializeStringifiedMetricsAndFaqs() throws Exception {
        String json = """
        {
            "projectName": "PulseDex",
            "metrics": [
                "{\\"label\\": \\"Latency\\", \\"value\\": \\"4μs\\"}",
                {"label": "24h Volume", "value": "$14.2B"}
            ],
            "faqs": [
                "{\\"q\\": \\"How is MEV prevented?\\", \\"a\\": \\"Private orderflow routing.\\"}",
                {"q": "What RPC endpoints?", "a": "Direct co-located nodes."}
            ]
        }
        """;

        AgentToolsConfig.ProjectDetails details = mapper.readValue(json, AgentToolsConfig.ProjectDetails.class);
        assertNotNull(details);
        assertNotNull(details.metrics());
        assertEquals(2, details.metrics().size());
        assertEquals("Latency", details.metrics().get(0).label());
        assertEquals("4μs", details.metrics().get(0).value());
        assertEquals("24h Volume", details.metrics().get(1).label());

        assertNotNull(details.faqs());
        assertEquals(2, details.faqs().size());
        assertEquals("How is MEV prevented?", details.faqs().get(0).q());
        assertEquals("What RPC endpoints?", details.faqs().get(1).q());
    }
}
