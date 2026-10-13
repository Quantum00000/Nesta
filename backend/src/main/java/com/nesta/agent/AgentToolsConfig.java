package com.nesta.agent;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import java.io.IOException;
import java.util.function.Function;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Configuration
public class AgentToolsConfig {
    private static final Logger log = LoggerFactory.getLogger(AgentToolsConfig.class);
    private static final ObjectMapper mapper = new ObjectMapper();

    @JsonDeserialize(using = MetricItemDeserializer.class)
    public record MetricItem(String label, String value) {}

    @JsonDeserialize(using = PricingTierDeserializer.class)
    public record PricingTier(String name, String price, String period, String desc, String badge) {}

    @JsonDeserialize(using = FaqItemDeserializer.class)
    public record FaqItem(String q, String a) {}

    @JsonDeserialize(using = TestimonialItemDeserializer.class)
    public record TestimonialItem(String quote, String author) {}

    public static class MetricItemDeserializer extends JsonDeserializer<MetricItem> {
        @Override
        public MetricItem deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
            JsonNode node = getNode(p);
            if (node == null || node.isNull()) return null;
            String label = node.has("label") ? node.get("label").asText() : "";
            String value = node.has("value") ? node.get("value").asText() : "";
            return new MetricItem(label, value);
        }
    }

    public static class PricingTierDeserializer extends JsonDeserializer<PricingTier> {
        @Override
        public PricingTier deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
            JsonNode node = getNode(p);
            if (node == null || node.isNull()) return null;
            String name = node.has("name") ? node.get("name").asText() : "";
            String price = node.has("price") ? node.get("price").asText() : "";
            String period = node.has("period") ? node.get("period").asText() : "/mo";
            String desc = node.has("desc") ? node.get("desc").asText() : "";
            String badge = node.has("badge") ? node.get("badge").asText() : "";
            return new PricingTier(name, price, period, desc, badge);
        }
    }

    public static class FaqItemDeserializer extends JsonDeserializer<FaqItem> {
        @Override
        public FaqItem deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
            JsonNode node = getNode(p);
            if (node == null || node.isNull()) return null;
            String q = node.has("q") ? node.get("q").asText() : (node.has("question") ? node.get("question").asText() : "");
            String a = node.has("a") ? node.get("a").asText() : (node.has("answer") ? node.get("answer").asText() : "");
            return new FaqItem(q, a);
        }
    }

    public static class TestimonialItemDeserializer extends JsonDeserializer<TestimonialItem> {
        @Override
        public TestimonialItem deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
            JsonNode node = getNode(p);
            if (node == null || node.isNull()) return null;
            String quote = node.has("quote") ? node.get("quote").asText() : "";
            String author = node.has("author") ? node.get("author").asText() : "";
            return new TestimonialItem(quote, author);
        }
    }

    private static JsonNode getNode(JsonParser p) throws IOException {
        if (p.currentToken() == JsonToken.VALUE_STRING) {
            String text = p.getText();
            if (text == null || text.isBlank()) return null;
            try {
                return mapper.readTree(text);
            } catch (Exception e) {
                return null;
            }
        }
        return p.getCodec().readTree(p);
    }

    public record ProjectDetails(
        String projectName,
        String suggestedFrontend,
        String suggestedBackend,
        String uiThemeId,
        String primaryColor,
        String secondaryColor,
        String surfaceColor,
        String bgStyle,
        String heroHeading,
        String heroSubheading,
        String primaryAction,
        String secondaryAction,
        String ctaHeadline,
        String ctaSubheading,
        List<String> keyFeatures,
        List<MetricItem> metrics,
        PricingTier pricingTier1,
        PricingTier pricingTier2,
        List<FaqItem> faqs,
        List<TestimonialItem> testimonials,
        String testimonialsRating,
        List<String> componentsEnabled
    ) {}
    
    public static final ThreadLocal<ProjectDetails> currentDetails = new ThreadLocal<>();

    @Bean
    @Description("Applies the parsed project configuration and detailed UI component customizations to the web application builder")
    public Function<ProjectDetails, String> applyProjectConfig() {
        return details -> {
            log.info("Agent Tool Executed with Detailed UI Customization: " + details);
            currentDetails.set(details);
            return "Successfully applied detailed project and UI customization for: " + details.projectName();
        };
    }
}
