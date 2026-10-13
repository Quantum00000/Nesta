package com.nesta.agent;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.stereotype.Service;

@Service
public class
AppDescriptionAgentService {

    private final ChatClient chatClient;

    public AppDescriptionAgentService(ChatClient.Builder builder) {
        this.chatClient = builder
            .defaultOptions(OpenAiChatOptions.builder()
                .withModel("nvidia/nemotron-3-ultra-550b-a55b")
                .withMaxTokens(2500)
                .build())
            .defaultSystem("You are Nesta AI Fullstack Customization Architect. " +
                           "Your purpose is to comprehensively customize all modular components of the web application based on the user's idea. " +
                           "MANDATORY: You MUST invoke the 'applyProjectConfig' function tool with full component customization. " +
                           "Generate domain-specific, professional details: " +
                           "- projectName: A punchy, creative brand name. " +
                           "- heroHeading: High-converting hero headline. " +
                           "- heroSubheading: 1-2 sentence persuasive value proposition paragraph. " +
                           "- primaryAction: Action-oriented primary button label (e.g. 'Get Started Free', 'Launch Terminal'). " +
                           "- secondaryAction: Supporting action button label (e.g. 'Book a Demo', 'Read Documentation'). " +
                           "- keyFeatures: Array of 3 specific, domain-relevant feature bullet points with short explanations. " +
                           "- metrics: Array of 4 realistic industry metrics with label and value (e.g. Latency 14ms, Active Nodes 50k+). " +
                           "- pricingTier1: Starter tier with name, price, period, desc. " +
                           "- pricingTier2: Growth tier with name, price, period, desc, badge 'POPULAR'. " +
                           "- faqs: Array of 2-3 realistic domain FAQs with question q and answer a. " +
                           "- testimonials: Array of 1-2 customer reviews with quote and author. " +
                           "- testimonialsRating: Verified rating string (e.g. '4.9/5.0'). " +
                           "- ctaHeadline: Compelling call-to-action banner headline. " +
                           "- ctaSubheading: High-conversion closing paragraph. " +
                           "- primaryColor: Harmonious brand hex color matching the industry (e.g. '#10B981', '#38BDF8', '#FACC15'). " +
                           "- secondaryColor: Harmonious secondary accent hex color. " +
                           "TOOL ARGUMENTS: Pass all nested properties (metrics, pricingTier1, pricingTier2, faqs, testimonials) as standard JSON objects or arrays of objects. " +
                           "TOKEN EFFICIENCY: Be direct and concise. Return a clean 1-sentence confirmation message after invoking the tool.")
            .build();
    }

    public String processDescription(String description) {
        return chatClient.prompt()
            .messages(new UserMessage(description))
            .functions("applyProjectConfig")
            .call()
            .content();
    }
}
