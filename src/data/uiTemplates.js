export const UI_TEMPLATE_CATEGORIES = ['All', 'SaaS & Tech', 'E-Commerce', 'AI & Data', 'Fintech', 'Portfolio & Agency'];

export const UI_TEMPLATES = [
  {
    id: 'saas-nova',
    name: 'Nova SaaS Platform',
    category: 'SaaS & Tech',
    tagline: 'Modern glassmorphic dark theme for high-growth software, micro-SaaS, and cloud tools.',
    badge: 'Most Popular',
    accentColor: '#FACC15',
    secondaryColor: '#38BDF8',
    surfaceColor: '#171B26',
    interactivityType: 'calculator',
    themeClass: 'from-amber-500/20 via-yellow-400/10 to-transparent',
    features: [
      'Interactive Cloud Cost & ROI Calculator with Live Sliders',
      'Dynamic Monthly vs Annual Pricing Switcher with Discount Tag',
      'Real-Time Cluster Health Monitor & Active Ping Simulator',
      'Responsive Bento Feature Grid with Hover Glows',
      'Interactive 14-Day Free Trial Lead Modal'
    ],
    componentsIncluded: [
      'Sticky Glassmorphism Navbar with CTA',
      'High-Impact Hero with Floating Metric Pills',
      'Interactive ROI Calculator Widget',
      'Real-Time Telemetry & SLA Metric Bento',
      'Tiered Pricing Switcher (Monthly/Annual)',
      'Customer Testimonials Carousel',
      'FAQ Accordion with Smooth Expand',
      'Conversion-Optimized Global Footer'
    ],
    stats: {
      conversions: '+42%',
      loadTime: '0.28s',
      rating: '4.95/5'
    },
    demo: {
      heroHeading: 'Scale Your Cloud Infrastructure with Real-Time Intelligence',
      heroSubheading: 'Automate deployments, optimize database queries, and reduce server expenses by up to 60% with instant AI-driven telemetry.',
      primaryAction: 'Start 14-Day Free Trial',
      secondaryAction: 'Schedule Technical Demo',
      metrics: [
        { label: 'Active Deployments', value: '18,420+', change: '+24.6% this week' },
        { label: 'Global Edge Latency', value: '18ms', change: '-42% response time' },
        { label: 'Uptime SLA', value: '99.99%', change: 'Zero incidents' },
        { label: 'Cloud Cost Saved', value: '$2.4M', change: 'Across 1,200 teams' }
      ],
      calculator: {
        title: 'Estimate Your Monthly Cloud Savings',
        defaultTeamSize: 25,
        defaultServers: 12,
        savingsPerServer: 85
      },
      features: [
        { title: 'Zero-Config Edge Scaling', desc: 'Instant distribution across 320+ edge locations with automated load shedding and geo-routing.' },
        { title: 'Predictive Failover Probes', desc: 'AI health monitors intercept database bottlenecks and re-route queries before latency spikes.' },
        { title: 'SOC2 & HIPAA Shield', desc: 'End-to-end envelope encryption with hardware-isolated KMS keys and zero-trust access audits.' }
      ],
      pricingTiers: [
        { name: 'Starter MVP', monthlyPrice: 29, annualPrice: 24, desc: 'Essential cloud tooling for indie makers & small teams', highlight: false, features: ['Up to 5 microservices', '10GB telemetry storage', 'Community Discord support'] },
        { name: 'Growth Scale', monthlyPrice: 89, annualPrice: 69, desc: 'Engineered for scaling startups experiencing heavy traffic spikes', highlight: true, features: ['Unlimited microservices', '250GB telemetry storage', '99.99% SLA guarantee', 'Priority 24/7 Slack channel'] },
        { name: 'Enterprise Core', monthlyPrice: 299, annualPrice: 239, desc: 'Dedicated VPC isolation, custom contracts & enterprise compliance', highlight: false, features: ['Dedicated infrastructure', 'Custom data retention', 'Dedicated customer architect', 'Custom SLA agreements'] }
      ]
    }
  },
  {
    id: 'ecommerce-aura',
    name: 'Aura Minimalist Store',
    category: 'E-Commerce',
    tagline: 'Sleek luxury digital storefront with interactive shopping cart drawer, variant pickers, and checkout.',
    badge: 'High Conversion',
    accentColor: '#38BDF8',
    secondaryColor: '#F472B6',
    surfaceColor: '#141A24',
    interactivityType: 'ecommerce_cart',
    themeClass: 'from-sky-500/20 via-cyan-400/10 to-transparent',
    features: [
      'Interactive Product Showcase with Live Color Variant Selection',
      'Slide-over Shopping Cart Drawer with Real-Time Subtotal & Tax Calculation',
      'Dynamic Category Filter Pills and Instant Price Range Filtering',
      'Customer Review Rating Star Submitter with Live Feedback',
      'Fast 1-Click Checkout Gateway Simulator'
    ],
    componentsIncluded: [
      'Modern Brand Header with Live Cart Count Badge',
      'Editorial Hero Banner with Dual CTA',
      'Filterable Product Grid with Quick-Add & Wishlist',
      'Interactive Slide-Over Shopping Cart Drawer',
      'Product Detail Modal with Color Swatches',
      'Verified Customer Review Grid',
      'VIP Newsletter Reward Bar',
      'Luxury E-Commerce Footer'
    ],
    stats: {
      conversions: '+38%',
      loadTime: '0.32s',
      rating: '4.88/5'
    },
    demo: {
      heroHeading: 'Engineered for the Modern Minimalist Aesthetic',
      heroSubheading: 'Precision-crafted hardware and everyday workspace essentials sculpted with sustainable aerospace-grade alloys.',
      primaryAction: 'Explore Collection',
      secondaryAction: 'View Lookbook',
      products: [
        { id: 1, name: 'Aura Studio Headphones Pro', price: 249, rating: 4.9, tag: 'Bestseller', category: 'Audio', colors: ['#1E293B', '#F1F5F9', '#D97706'], desc: 'Active noise cancelling with 40mm beryllium drivers.' },
        { id: 2, name: 'Tactile Mechanical Keeb 75%', price: 179, rating: 4.8, tag: 'New Release', category: 'Keyboards', colors: ['#0F172A', '#0EA5E9', '#E11D48'], desc: 'Hot-swappable tactile switches with gasket mount.' },
        { id: 3, name: 'Wireless Mag-Charge Hub Trio', price: 89, rating: 4.9, tag: 'Staff Pick', category: 'Charging', colors: ['#334155', '#E2E8F0'], desc: 'Fast 15W Qi2 wireless charging for phone, watch & buds.' },
        { id: 4, name: 'Aerospace Aluminum Laptop Stand', price: 69, rating: 4.7, tag: 'Ergonomic', category: 'Accessories', colors: ['#475569', '#CBD5E1'], desc: 'Anodized aluminum with 360 degree smooth rotation.' }
      ],
      reviews: [
        { name: 'Marcus Vance', role: 'Staff Product Designer', rating: 5, comment: 'The industrial design language is exceptional. Cart experience is butter smooth.' },
        { name: 'Elena Rostova', role: 'Creative Director', rating: 5, comment: 'Every detail from packaging to tactile feedback feels top tier.' }
      ]
    }
  },
  {
    id: 'ai-nexus',
    name: 'Nexus AI Studio',
    category: 'AI & Data',
    tagline: 'Futuristic AI playground, LLM prompt console, parameter tuning sandbox, and model benchmark matrix.',
    badge: 'Trending Tech',
    accentColor: '#A855F7',
    secondaryColor: '#EC4899',
    surfaceColor: '#171424',
    interactivityType: 'ai_sandbox',
    themeClass: 'from-purple-500/20 via-fuchsia-400/10 to-transparent',
    features: [
      'Interactive Prompt & Token Streaming Sandbox with Live Typing Output',
      'Multi-Model Benchmark Selector (Nemotron 3 Ultra, LLaMA 3.1, Claude, GPT-4o)',
      'Live Temperature & Top-P Hyperparameter Sliders',
      'Real-Time Token Consumption & Generation Latency Monitor',
      'Interactive System Prompt & RAG Vector Knowledge Toggle'
    ],
    componentsIncluded: [
      'Studio Navigation with Real-Time GPU Cluster Status',
      'Interactive LLM Playground with Prompt Console',
      'Model Benchmark Matrix with Cost & Latency Metrics',
      'Hyperparameter Tuning Control Deck',
      'Token Velocity & Memory Usage Gauge',
      'Workflow Node Pipeline Visualizer',
      'Developer API Key Management Dialog',
      'Futuristic Cyber Terminal Footer'
    ],
    stats: {
      conversions: '+54%',
      loadTime: '0.22s',
      rating: '4.98/5'
    },
    demo: {
      heroHeading: 'Orchestrate Autonomous Agents & Frontier AI Workflows',
      heroSubheading: 'Chain foundation models, vector embeddings, and serverless tool calls into production-ready pipelines in milliseconds.',
      primaryAction: 'Launch Prompt Sandbox',
      secondaryAction: 'Browse Model Benchmarks',
      models: [
        { id: 'nemotron-ultra', name: 'NVIDIA Nemotron 3 Ultra (550B)', latency: '12ms/tok', context: '1M Tokens', reasoning: '98.6%', badge: 'Active Default' },
        { id: 'llama-3-70b', name: 'Meta LLaMA 3.1 70B Instruct', latency: '16ms/tok', context: '128k Tokens', reasoning: '96.2%', badge: 'High Speed' },
        { id: 'nexus-code', name: 'Nexus-Code Synthesis 34B', latency: '9ms/tok', context: '256k Tokens', reasoning: '99.1%', badge: 'Specialized' }
      ],
      samplePrompts: [
        'Build a reactive dashboard with real-time WebSocket connection to Spring Boot',
        'Analyze customer retention trends from 50,000 transaction events and forecast Q4',
        'Generate an asynchronous tool-calling agent with JWT authentication and Redis cache'
      ],
      simulatedOutputs: {
        'Build a reactive dashboard with real-time WebSocket connection to Spring Boot': '✓ Connected to STOMP broker at ws://localhost:8080/ws\n✓ Subscribed to /topic/analytics.live\n✓ Rendering 60FPS reactive canvas charts with zero frame drop\n✓ Auto-reconnect heartbeat: 5000ms active',
        'Analyze customer retention trends from 50,000 transaction events and forecast Q4': '✓ Processed 50,000 ledger rows in 142ms\n✓ Month-over-month retention: 94.2% (+3.1%)\n✓ Churn risk clusters identified: 12 accounts flagged\n✓ Projected Q4 ARR expansion: +$184,500',
        'Generate an asynchronous tool-calling agent with JWT authentication and Redis cache': '✓ Initialized Spring AI ChatClient with tool callbacks\n✓ Validated RS256 JWT public key signatures\n✓ Cache-hit ratio on Redis layer: 98.4%\n✓ Execution finished in 18ms'
      }
    }
  },
  {
    id: 'fintech-krypton',
    name: 'Krypton Pay & Banking',
    category: 'Fintech',
    tagline: 'High-security financial dashboard with live balance cards, interactive money transfer, and spending analytics.',
    badge: 'Bank Grade',
    accentColor: '#10B981',
    secondaryColor: '#06B6D4',
    surfaceColor: '#121D1A',
    interactivityType: 'fintech_banking',
    themeClass: 'from-emerald-500/20 via-teal-400/10 to-transparent',
    features: [
      'Interactive Holographic 3D Virtual Card with Reveal CVV & Freeze Toggle',
      'Real-Time Money Transfer Modal with Live Account Balance Deduction',
      'Filterable Transaction Activity Stream with Search & Categorization',
      'Monthly Spending Analytics Breakdown with Progress Gauges',
      'Multi-Currency Wallet Switcher (USD, EUR, GBP, BTC)'
    ],
    componentsIncluded: [
      'High-Security Banking Header with Biometric Status',
      'Holographic Virtual Card Interactive Visualizer',
      'Live Instant Send & Request Money Drawer',
      'Filterable Transaction Ledger with Receipt Modal',
      'Category Spending Progress Breakdown',
      'International FX Currency Converter',
      'FDIC Insurance & SOC2 Compliance Badges',
      'Financial Grade Security Footer'
    ],
    stats: {
      conversions: '+46%',
      loadTime: '0.29s',
      rating: '4.92/5'
    },
    demo: {
      heroHeading: 'Next-Generation Borderless Banking for Modern Businesses',
      heroSubheading: 'Hold 40+ currencies, issue instantaneous multi-use virtual cards, and automate corporate treasury cashflow with zero FX markup.',
      primaryAction: 'Open Business Account',
      secondaryAction: 'Explore Card Security',
      initialBalance: 124580.40,
      virtualCard: {
        number: '4829 •••• •••• 8842',
        cvv: '942',
        holder: 'ALEXANDER RIVERA',
        expires: '09/29',
        network: 'VISA INFINITE BUSINESS'
      },
      transactions: [
        { id: 1, title: 'Stripe Merchant Payout', amount: 8450.00, date: 'Today, 2:45 PM', category: 'Revenue', type: 'in', status: 'Completed' },
        { id: 2, title: 'AWS Cloud Infrastructure', amount: 1240.50, date: 'Yesterday, 8:12 PM', category: 'Servers', type: 'out', status: 'Processed' },
        { id: 3, title: 'Figma Enterprise Workspace', amount: 180.00, date: 'Sep 28', category: 'Software', type: 'out', status: 'Processed' },
        { id: 4, title: 'Seed Syndicate Investment Wire', amount: 50000.00, date: 'Sep 25', category: 'Funding', type: 'in', status: 'Completed' },
        { id: 5, title: 'GitHub Enterprise Team', amount: 210.00, date: 'Sep 22', category: 'DevTools', type: 'out', status: 'Processed' }
      ],
      spendingCategories: [
        { name: 'Cloud Infrastructure & Hosting', spent: '$12,450', percent: 65, color: '#10B981' },
        { name: 'SaaS Software & Tooling', spent: '$4,120', percent: 22, color: '#06B6D4' },
        { name: 'Operations & Payroll', spent: '$2,300', percent: 13, color: '#F59E0B' }
      ]
    }
  },
  {
    id: 'portfolio-vanguard',
    name: 'Vanguard Creative Studio',
    category: 'Portfolio & Agency',
    tagline: 'Bold editorial portfolio for creative agencies, design studios, and luxury brand creators.',
    badge: 'Award Winner',
    accentColor: '#EC4899',
    secondaryColor: '#8B5CF6',
    surfaceColor: '#1F1420',
    interactivityType: 'agency_gallery',
    themeClass: 'from-pink-500/20 via-rose-400/10 to-transparent',
    features: [
      'Interactive Filterable Case Study Gallery with Fullscreen Case Preview',
      'Dynamic Interactive Project Scope & Budget Estimator Calculator',
      'Client Testimonials Slider with Quote Controls & Client Badges',
      'Interactive Creative Inquiry Contact Form with Deliverable Chips',
      'Live Design System Color & Typography Token Previewer'
    ],
    componentsIncluded: [
      'Minimalist Editorial Navigation with Menu Trigger',
      'Bold Typography Hero with Dynamic Micro-Marquee',
      'Interactive Filterable Project Grid (Branding, WebGL, UI/UX)',
      'Interactive Project Budget & Scope Estimator',
      'Case Study Deep-Dive Modal Drawer',
      'Interactive Client Testimonial Reel',
      'Interactive Project Inquiry & Consultation Form',
      'High-Fashion Editorial Agency Footer'
    ],
    stats: {
      conversions: '+50%',
      loadTime: '0.24s',
      rating: '4.96/5'
    },
    demo: {
      heroHeading: 'We Design Digital Products That Define Entire Categories',
      heroSubheading: 'A multidisciplinary digital engineering studio partnering with ambitious founders to build legendary brand experiences.',
      primaryAction: 'Explore Selected Works',
      secondaryAction: 'Calculate Project Scope',
      categories: ['All Works', 'Digital Product', 'Brand & WebGL', 'AI Interfaces'],
      caseStudies: [
        { id: 1, title: 'Chronos Smart Watch OS', client: 'Chronos Labs', category: 'Digital Product', year: '2026', awards: 'Awwwards Site of the Year', desc: 'Complete gesture-driven spatial interface and embedded software suite.' },
        { id: 2, title: 'Hyperion Autonomous EV', client: 'Hyperion Mobility', category: 'Brand & WebGL', year: '2026', awards: 'FWA of the Month', desc: 'Real-time 3D vehicle configurator rendered with WebGPU shaders.' },
        { id: 3, title: 'Solstice Space Telescope Portal', client: 'European Aerospace', category: 'AI Interfaces', year: '2025', awards: 'Red Dot Best of Best', desc: 'Ultra-high-definition astronomical data visualization and telemetry dashboard.' }
      ],
      estimatorServices: [
        { name: 'End-to-End Product Design', base: 12000 },
        { name: 'WebGL 3D Interactive Web', base: 18000 },
        { name: 'Design System & Tokens', base: 8000 },
        { name: 'Mobile App Experience', base: 15000 }
      ]
    }
  },
  {
    id: 'dev-docs-terminal',
    name: 'DevPulse Docs & SDK Portal',
    category: 'Portfolio & Agency',
    tagline: 'Developer documentation portal with multi-language code switchers, live API request sandbox, and response inspector.',
    badge: 'Developer Choice',
    accentColor: '#F59E0B',
    secondaryColor: '#10B981',
    surfaceColor: '#181613',
    interactivityType: 'developer_terminal',
    themeClass: 'from-amber-500/20 via-orange-400/10 to-transparent',
    features: [
      'Multi-Language Code Switcher (cURL, JavaScript, Python, Go, Java)',
      'Live Interactive API Request Sandbox with Real HTTP Response Visualizer',
      'Interactive Endpoint Method Selector (GET, POST, PUT, DELETE)',
      'Instant Search Bar with Keyboard Shortcuts & Parameter Filter',
      'One-Click Code Copy with Visual Feedback'
    ],
    componentsIncluded: [
      'Documentation Header with Quick Search Bar',
      'Dual-Column API Explorer Layout',
      'Interactive Multi-Language Code Snippet Deck',
      'Live API Request & Response Testing Sandbox',
      'Query Parameters & Header Inspector Table',
      'SDK Quickstart Step-by-Step Flow',
      'Developer Feedback & Bug Report Widget',
      'Comprehensive Developer Ecosystem Footer'
    ],
    stats: {
      conversions: '+60%',
      loadTime: '0.19s',
      rating: '5.0/5'
    },
    demo: {
      heroHeading: 'Developer-First APIs for Scalable Real-Time Event Streaming',
      heroSubheading: 'Deploy pub/sub event meshes and bidirectional WebSockets to millions of concurrent clients with under 5 lines of code.',
      primaryAction: 'Explore Interactive API',
      secondaryAction: 'Download SDK Libraries',
      endpoints: [
        { method: 'GET', path: '/api/v1/events/stream', desc: 'Streams live events with Server-Sent Events or WebSockets' },
        { method: 'POST', path: '/api/v1/publish', desc: 'Publishes an authenticated JSON payload to any topic channel' },
        { method: 'GET', path: '/api/v1/clusters/health', desc: 'Returns latency, active connections, and cluster partition status' }
      ],
      languages: ['cURL', 'JavaScript', 'Python', 'Go'],
      codeSamples: {
        'cURL': `curl -X POST https://api.nesta.dev/v1/publish \\\n  -H "Authorization: Bearer $NESTA_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"channel": "orders.live", "event": "order.created", "payload": {"id": "ord_942", "amount": 149.99}}'`,
        'JavaScript': `import { NestaClient } from '@nesta/sdk';\n\nconst nesta = new NestaClient({ apiKey: process.env.NESTA_KEY });\n\nawait nesta.publish('orders.live', {\n  event: 'order.created',\n  payload: { id: 'ord_942', amount: 149.99 }\n});\nconsole.log('Event streamed successfully!');`,
        'Python': `from nesta import NestaClient\n\nclient = NestaClient(api_key=os.environ["NESTA_KEY"])\n\nresponse = client.publish(\n    channel="orders.live",\n    event="order.created",\n    payload={"id": "ord_942", "amount": 149.99}\n)\nprint(f"Delivered with latency {response.latency_ms}ms")`,
        'Go': `package main\n\nimport "github.com/nesta/sdk-go"\n\nfunc main() {\n    client := nesta.New(os.Getenv("NESTA_KEY"))\n    _, err := client.Publish(ctx, "orders.live", map[string]any{\n        "id": "ord_942", "amount": 149.99,\n    })\n}`
      }
    }
  }
];
