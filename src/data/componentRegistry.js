export const DEFAULT_COMPONENT_ORDER = [
  'navbar',
  'hero',
  'trustedBy',
  'interactiveWidget',
  'metrics',
  'features',
  'testimonials',
  'pricing',
  'faq',
  'ctaBanner',
  'footer'
];

export const AVAILABLE_COMPONENTS = [
  {
    id: 'navbar',
    name: 'Sticky Glassmorphic Header',
    category: 'Navigation',
    desc: 'Branded logo, responsive navigation anchors, and primary CTA button',
    badge: 'Navigation',
    canReorder: false
  },
  {
    id: 'hero',
    name: 'Impact Hero Section',
    category: 'Header',
    desc: 'Value badge, high-impact headline, value proposition subtitle, and dual action buttons',
    badge: 'Hero',
    canReorder: true
  },
  {
    id: 'trustedBy',
    name: 'Enterprise Trust & Logos',
    category: 'Social Proof',
    desc: 'Social proof banner displaying trusted companies, teams, and security certifications',
    badge: 'Trust',
    canReorder: true
  },
  {
    id: 'interactiveWidget',
    name: 'Interactive Component Sandbox',
    category: 'Core Tool',
    desc: 'Signature interactive widget: Cost Calculator, Cart Drawer, AI Console, or Virtual Card',
    badge: 'Interactive',
    canReorder: true
  },
  {
    id: 'metrics',
    name: 'Telemetry & KPI Counter Bar',
    category: 'Analytics',
    desc: '4-column KPI metric cards with latency stats, uptime SLA percentages, and live counters',
    badge: 'Metrics',
    canReorder: true
  },
  {
    id: 'features',
    name: 'Bento Feature Grid',
    category: 'Showcase',
    desc: 'Showcase cards with icons, gradient glow borders, and benefit descriptions',
    badge: 'Features',
    canReorder: true
  },
  {
    id: 'testimonials',
    name: 'Customer Testimonials & Reviews',
    category: 'Social Proof',
    desc: 'Customer quotes, 5-star rating badges, role tags, and verified user avatars',
    badge: 'Social Proof',
    canReorder: true
  },
  {
    id: 'pricing',
    name: 'Tiered Pricing Matrix',
    category: 'Conversion',
    desc: 'Monthly vs Annual billing toggle, highlighted plan card, and feature checklists',
    badge: 'Pricing',
    canReorder: true
  },
  {
    id: 'faq',
    name: 'Accordion FAQ Section',
    category: 'Support',
    desc: 'Interactive expandable FAQ accordion addressing common onboarding and billing questions',
    badge: 'FAQ',
    canReorder: true
  },
  {
    id: 'ctaBanner',
    name: 'High-Impact Call-to-Action Banner',
    category: 'Conversion',
    desc: 'Full-width gradient banner with conversion-optimized heading and email capture input',
    badge: 'CTA Banner',
    canReorder: true
  },
  {
    id: 'footer',
    name: 'Global Application Footer',
    category: 'Navigation',
    desc: 'Branded copyright, navigation columns, status badge, and legal links',
    badge: 'Footer',
    canReorder: false
  }
];

export const DEFAULT_COMPONENTS_STATE = {
  navbar: true,
  hero: true,
  trustedBy: true,
  interactiveWidget: true,
  metrics: true,
  features: true,
  testimonials: true,
  pricing: true,
  faq: true,
  ctaBanner: true,
  footer: true
};
