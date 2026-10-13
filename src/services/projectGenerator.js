import JSZip from "jszip";
import { DEFAULT_COMPONENT_ORDER, DEFAULT_COMPONENTS_STATE } from "../data/componentRegistry.js";

export async function generateProjectZip({ 
  projectName, 
  projectDescription, 
  frontend, 
  backend, 
  template,
  customization = {} 
}) {
  const zip = new JSZip();
  const safeName = (projectName || "nesta-app").toLowerCase().replace(/[^a-z0-9-_]/g, "-");
  const root = zip.folder(safeName);

  const tplId = template?.id || 'saas-nova';
  const primaryColor = customization.primaryColor || template?.accentColor || '#FACC15';
  const secondaryColor = customization.secondaryColor || template?.secondaryColor || '#38BDF8';
  const surfaceColor = customization.surfaceColor || template?.surfaceColor || '#141824';
  const brandName = customization.brandName || projectName || template?.name || 'Nesta App';
  const heroHeading = customization.heroHeading || template?.demo?.heroHeading || 'Scale Your Digital Product with Modern Architecture';
  const heroSubheading = customization.heroSubheading || template?.demo?.heroSubheading || 'Crafted with modular fullstack components, design tokens, and fast performance.';
  const primaryAction = customization.primaryAction || template?.demo?.primaryAction || 'Get Started Now';
  const secondaryAction = customization.secondaryAction || template?.demo?.secondaryAction || 'Learn More';
  const ctaHeadline = customization.ctaHeadline || 'Ready to Scale Your Digital Infrastructure?';
  const ctaSubheading = customization.ctaSubheading || 'Join thousands of developers and product teams building with Nesta today.';
  const bgStyle = customization.bgStyle || 'mesh';
  const bgImageData = customization.bgImageData || customization.bgImageUrl || '';
  const bgOverlayOpacity = customization.bgOverlayOpacity ?? 75;

  const comps = customization.components || DEFAULT_COMPONENTS_STATE;
  const componentOrder = customization.componentOrder || DEFAULT_COMPONENT_ORDER;

  const customFeatures = customization.keyFeatures && customization.keyFeatures.length > 0 
    ? customization.keyFeatures 
    : (template?.features || [
        'Zero-Config Edge Scaling with Global Distribution',
        'Automated Health Probes & Intelligent Failover',
        'End-to-End Enterprise Grade Encryption'
      ]);

  // 1. Root README.md
  root.file(
    "README.md",
    `# ${brandName}

${projectDescription || "Fullstack web application scaffolded with Nesta Studio."}

## Architecture Stack
- **Frontend Framework:** ${frontend?.name || "React 19 (Vite + Tailwind CSS)"}
- **Backend Engine:** ${backend?.name || "Node.js (Express)"}
- **UI Template:** ${template?.name || "Nova SaaS Platform"} (\`${tplId}\`)
- **Primary Brand Color:** \`${primaryColor}\`
- **Surface Color:** \`${surfaceColor}\`

## Project Structure
\`\`\`
${safeName}/
├── frontend/          # Full-featured interactive React UI
│   ├── src/
│   │   ├── App.jsx    # Complete interactive application with live components
│   │   ├── main.jsx
│   │   └── index.css  # Tailwind design tokens
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── backend/           # Serverless API endpoints & data handlers
\`\`\`

## Getting Started

### 1. Launch the Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
Visit http://localhost:5173 to explore your interactive web application!

### 2. Launch the Backend
\`\`\`bash
cd backend
npm install  # (or pip install -r requirements.txt / ./mvnw spring-boot:run)
npm start
\`\`\`
`
  );

  // 2. Frontend Folder Setup
  const frontendFolder = root.folder("frontend");
  
  frontendFolder.file("package.json", JSON.stringify({
    name: safeName + "-frontend",
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview"
    },
    dependencies: {
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "lucide-react": "^0.344.0"
    },
    devDependencies: {
      "@vitejs/plugin-react": "^4.2.1",
      "autoprefixer": "^10.4.18",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "vite": "^5.1.4"
    }
  }, null, 2));

  frontendFolder.file("vite.config.js", `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});\n`);

  frontendFolder.file("tailwind.config.js", `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: "${primaryColor}",
        secondary: "${secondaryColor}",
        surface: "${surfaceColor}",
      }
    },
  },
  plugins: [],
};\n`);

  frontendFolder.file("postcss.config.js", `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};\n`);

  frontendFolder.file("index.html", `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <title>${brandName}</title>
  </head>
  <body class="antialiased transition-colors duration-300">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>\n`);

  const src = frontendFolder.folder("src");
  src.file("main.jsx", `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);\n`);

  src.file("index.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    background-color: ${surfaceColor};
    color: #ffffff;
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  }
}\n`);

  // Generate the heavy interactive App.jsx with customized component flow
  const appJsxCode = generateHeavyAppJsx({
    brandName,
    heroHeading,
    heroSubheading,
    primaryAction,
    secondaryAction,
    ctaHeadline,
    ctaSubheading,
    primaryColor,
    secondaryColor,
    surfaceColor,
    bgStyle,
    bgImageData,
    bgOverlayOpacity,
    tplId,
    template,
    comps,
    componentOrder,
    customFeatures,
    customMetrics: customization.metrics,
    customTier1: customization.pricingTier1,
    customTier2: customization.pricingTier2,
    customTestimonials: customization.testimonials,
    customRating: customization.testimonialsRating,
    customFaqs: customization.faqs
  });

  src.file("App.jsx", appJsxCode);

  // 3. Backend Folder Setup
  const backendFolder = root.folder("backend");

  if (backend?.id === 'fastapi') {
    backendFolder.file("main.py", `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="${brandName} API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health():
    return {"status": "Online", "service": "${brandName}", "version": "1.0.0"}

@app.get("/api/data")
def get_data():
    return {
        "success": True,
        "items": [
            {"id": 1, "name": "Telemetry Node Alpha", "status": "active"},
            {"id": 2, "name": "Telemetry Node Beta", "status": "active"}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
`);
    backendFolder.file("requirements.txt", "fastapi>=0.110.0\nuvicorn>=0.28.0\n");
  } else if (backend?.id === 'springboot') {
    backendFolder.file("pom.xml", `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.4</version>
        <relativePath/>
    </parent>
    <groupId>com.nesta</groupId>
    <artifactId>${safeName}</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
`);
    const javaDir = backendFolder.folder("src").folder("main").folder("java").folder("com").folder("nesta").folder("app");
    javaDir.file("Application.java", `package com.nesta.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@SpringBootApplication
@RestController
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @GetMapping("/api/health")
    public Map<String, Object> health() {
        return Map.of("status", "Online", "app", "${brandName}");
    }
}
`);
  } else if (backend?.id === 'gofiber') {
    backendFolder.file("main.go", `package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
    app := fiber.New()
    app.Use(cors.New())

    app.Get("/api/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{
            "status": "Online",
            "app": "${brandName}",
        })
    })

    app.Listen(":3000")
}
`);
    backendFolder.file("go.mod", `module ${safeName}-backend

go 1.22

require github.com/gofiber/fiber/v2 v2.52.0
`);
  } else {
    // Default: Express.js
    backendFolder.file("index.js", `const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'Online', app: '${brandName}', timestamp: new Date().toISOString() });
});

app.get('/api/data', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Item Alpha', timestamp: 'Just now' },
      { id: 2, title: 'Item Beta', timestamp: '5 mins ago' }
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`${brandName} backend listening on port \${PORT}\`);
});
`);
    backendFolder.file("package.json", JSON.stringify({
      name: safeName + "-backend",
      version: "1.0.0",
      main: "index.js",
      scripts: {
        start: "node index.js",
        dev: "node --watch index.js"
      },
      dependencies: {
        "express": "^4.18.2",
        "cors": "^2.8.5"
      }
    }, null, 2));
  }

  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, filename: `${safeName}-source.zip` };
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function generateHeavyAppJsx({
  brandName,
  heroHeading,
  heroSubheading,
  primaryAction,
  secondaryAction,
  ctaHeadline = 'Ready to Scale Your Digital Infrastructure?',
  ctaSubheading = 'Join thousands of developers and product teams building with Nesta today.',
  primaryColor,
  secondaryColor,
  surfaceColor,
  bgStyle,
  bgImageData,
  bgOverlayOpacity = 75,
  tplId,
  template,
  comps = DEFAULT_COMPONENTS_STATE,
  componentOrder = DEFAULT_COMPONENT_ORDER,
  customFeatures = [],
  customMetrics = null,
  customTier1 = null,
  customTier2 = null,
  customTestimonials = null,
  customRating = null,
  customFaqs = null
}) {
  const activeFeatures = customFeatures && customFeatures.length > 0 
    ? customFeatures 
    : (template?.features || [
        'Zero-Config Edge Scaling with Global Distribution',
        'Automated Health Probes & Intelligent Failover',
        'End-to-End Enterprise Grade Encryption'
      ]);

  const metricsList = (customMetrics && customMetrics.length > 0)
    ? customMetrics
    : (template?.demo?.metrics || [
        { label: 'Latency', value: '18ms' },
        { label: 'Uptime', value: '99.99%' },
        { label: 'Active Users', value: '120k+' },
        { label: 'Cost Saved', value: '$2.4M' }
      ]);

  // --- 11 Modular Section Generators ---

  // 1. NAVBAR
  const secNavbar = comps.navbar ? `
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 w-full px-6 py-4 backdrop-blur-xl bg-black/40 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-black text-sm shadow-lg" style={{ backgroundColor: '${primaryColor}' }}>
            ${brandName.substring(0, 1)}
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white">${brandName}</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#overview" className="hover:text-white transition-colors">Overview</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#interactive" className="hover:text-white transition-colors">Interactive Demo</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Dark / Light Mode Switcher */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center text-white"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Dark and Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          ${tplId === 'ecommerce-aura' ? `
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)} 
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white flex items-center gap-1.5"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '${primaryColor}', color: '#000' }}>
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          </button>
          ` : ''}
          <button 
            className="px-4 py-2 rounded-xl font-bold text-xs text-black shadow-lg hover:scale-105 transition-all"
            style={{ backgroundColor: '${primaryColor}' }}
          >
            ${primaryAction}
          </button>
        </div>
      </header>` : '';

  // 2. HERO
  const secHero = comps.hero ? `
      {/* 2. HERO */}
      <section id="overview" className="relative px-6 pt-16 pb-20 max-w-5xl mx-auto text-center space-y-6">
        <div 
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/10"
          style={{ backgroundColor: '${primaryColor}15', color: '${primaryColor}' }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Production Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          ${heroHeading}
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          ${heroSubheading}
        </p>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button 
            className="px-6 py-3.5 rounded-xl font-extrabold text-sm text-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
            style={{ backgroundColor: '${primaryColor}' }}
          >
            <span>${primaryAction}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-5 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            ${secondaryAction}
          </button>
        </div>
      </section>` : '';

  // 3. TRUSTED BY
  const secTrustedBy = comps.trustedBy ? `
      {/* 3. TRUSTED BY LOGO TICKER */}
      <section className="px-6 py-8 max-w-5xl mx-auto w-full">
        <div className="py-4 px-6 rounded-2xl bg-white/[0.03] border border-white/5 text-center space-y-3">
          <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
            Trusted by 10,000+ teams and high-growth innovators
          </span>
          <div className="flex items-center justify-center flex-wrap gap-8 text-slate-400 text-sm font-mono font-semibold">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Building2 className="w-4 h-4" style={{ color: '${primaryColor}' }} /> ACME CLOUD
            </span>
            <span className="hover:text-white transition-colors">VERTEX LABS</span>
            <span className="hover:text-white transition-colors">HYPERSCALE</span>
            <span className="hover:text-white transition-colors">VELOCE AI</span>
            <span className="hover:text-white transition-colors">QUANTUM OPS</span>
          </div>
        </div>
      </section>` : '';

  // 4. INTERACTIVE WIDGET
  const secInteractiveWidget = comps.interactiveWidget ? `
      {/* 4. HEAVY INTERACTABLE WIDGET */}
      <section id="interactive" className="px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10 flex-wrap gap-2">
            <div>
              <span className="text-[11px] font-mono uppercase font-bold" style={{ color: '${primaryColor}' }}>Interactive Showcase</span>
              <h2 className="text-xl font-extrabold text-white">Live Interactable Component</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30">
              ● Active State Functional
            </span>
          </div>

          ${tplId === 'saas-nova' ? `
          {/* SAAS ROI CALCULATOR */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Engineering Team Size:</span>
                    <span className="font-bold" style={{ color: '${primaryColor}' }}>{teamSize} Engineers</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="150" 
                    value={teamSize} 
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full cursor-pointer"
                    style={{ accentColor: '${primaryColor}' }}
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Microservice Instances:</span>
                    <span className="font-bold text-sky-400">{serverCount} Servers</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="80" 
                    value={serverCount} 
                    onChange={(e) => setServerCount(Number(e.target.value))}
                    className="w-full cursor-pointer accent-sky-400"
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-center flex flex-col justify-center items-center">
                <span className="text-xs text-slate-400">Estimated Annual Cloud Savings</span>
                <div className="text-3xl font-black text-emerald-400 my-1">
                  {'$' + ((teamSize * 45 + serverCount * 85) * (billingCycle === 'annual' ? 12 : 1)).toLocaleString()} / yr
                </div>
                <span className="text-[11px] text-slate-400">
                  {'Equivalent to ~$' + (teamSize * 45 + serverCount * 85).toLocaleString() + ' saved monthly'}
                </span>
              </div>
            </div>
          </div>
          ` : tplId === 'ecommerce-aura' ? `
          {/* E-COMMERCE CART & PRODUCTS */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 1, name: 'Studio Headphone Pro', price: 249, desc: 'Beryllium acoustic drivers' },
                { id: 2, name: 'Mechanical Keeb 75%', price: 179, desc: 'Hot-swappable gasket mount' },
                { id: 3, name: 'Mag-Charge Hub Trio', price: 89, desc: 'Fast 15W Qi2 wireless charger' }
              ].map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="h-28 rounded-xl bg-black/40 flex items-center justify-center text-xs text-slate-400 mb-3">
                      Hardware Item #{item.id}
                    </div>
                    <h3 className="font-bold text-sm text-white">{item.name}</h3>
                    <p className="text-xs text-slate-400 my-1">{item.desc}</p>
                    <div className="text-sm font-black text-white mt-2">{'$' + item.price}</div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="mt-3 w-full py-1.5 rounded-xl font-bold text-xs text-black transition-colors"
                    style={{ backgroundColor: '${primaryColor}' }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {isCartOpen && (
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold text-white">
                  <span>Cart Items ({cart.length})</span>
                  <span className="text-emerald-400">Total: {'$' + cart.reduce((s, i) => s + (i.price * i.qty), 0).toFixed(2)}</span>
                </div>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {cart.map((c, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2 rounded-lg bg-white/5">
                      <span>{c.name} (x{c.qty})</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateCartQuantity(i, -1)} className="px-1.5 bg-white/10 rounded">-</button>
                        <span className="font-mono">{c.qty}</span>
                        <button onClick={() => updateCartQuantity(i, 1)} className="px-1.5 bg-white/10 rounded">+</button>
                        <span className="font-mono ml-2">{'$' + (c.price * c.qty)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          ` : tplId === 'ai-nexus' ? `
          {/* AI PROMPT RUNNER */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-black/40 border border-white/10 text-xs text-white rounded-xl px-3 py-2.5"
              >
                <option value="nemotron-ultra">NVIDIA Nemotron 3 Ultra (550B)</option>
                <option value="llama-3-70b">Meta LLaMA 3.1 70B</option>
                <option value="nexus-code">Nexus Code Synth 34B</option>
              </select>
              <input 
                type="text" 
                value={promptText} 
                onChange={(e) => setPromptText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
              />
              <button 
                onClick={handleRunInference}
                disabled={isRunningInference}
                className="px-4 py-2.5 rounded-xl font-bold text-xs text-black flex items-center gap-1.5"
                style={{ backgroundColor: '${primaryColor}' }}
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>{isRunningInference ? 'Running...' : 'Run Inference'}</span>
              </button>
            </div>
            {promptOutput && (
              <pre className="p-4 rounded-xl bg-black/60 border border-purple-500/30 text-xs font-mono text-purple-200 whitespace-pre-wrap">
                {promptOutput}
              </pre>
            )}
          </div>
          ` : tplId === 'fintech-krypton' ? `
          {/* FINTECH BANKING */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="p-6 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-900 text-white shadow-xl space-y-6 border border-emerald-400/30">
              <div className="flex justify-between text-xs font-mono">
                <span>VISA INFINITE BUSINESS</span>
                <button onClick={() => setIsFrozen(!isFrozen)} className="px-2 py-0.5 rounded bg-black/40 text-[10px]">
                  {isFrozen ? 'FROZEN' : 'ACTIVE'}
                </button>
              </div>
              <div className="text-lg font-mono tracking-widest">{isFrozen ? '•••• •••• •••• ••••' : '4829 •••• •••• 8842'}</div>
              <div className="flex justify-between text-xs font-mono">
                <span>ALEXANDER RIVERA</span>
                <span onClick={() => setShowCvv(!showCvv)} className="cursor-pointer">
                  CVV: {showCvv ? '942' : '•••'}
                </span>
              </div>
            </div>

            <form onSubmit={handleSendPayment} className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Account Balance</span>
                <span className="text-emerald-400 font-bold">{'$' + balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <input 
                type="number" 
                value={sendAmount} 
                onChange={(e) => setSendAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
              />
              <button 
                type="submit" 
                disabled={isFrozen}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-black disabled:opacity-40"
                style={{ backgroundColor: '${primaryColor}' }}
              >
                Send Wire Transfer
              </button>
              {transferFeedback && <div className="text-xs text-emerald-400 font-mono text-center">{transferFeedback}</div>}
            </form>
          </div>
          ` : tplId === 'portfolio-vanguard' ? `
          {/* AGENCY ESTIMATOR */}
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-mono">
              <span>Interactive Budget Estimator:</span>
              <span className="text-base font-bold" style={{ color: '${primaryColor}' }}>{'$' + agencyTotal.toLocaleString()} est.</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['Product Design', 'WebGL 3D Interactive', 'Design System', 'Mobile App'].map(s => {
                const on = agencyServices.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleAgencyService(s)}
                    className={'p-3 rounded-xl border text-xs text-left transition-all ' + (on ? 'bg-white/15 border-white text-white font-bold' : 'bg-black/30 border-white/10 text-slate-400')}
                  >
                    <div>{s}</div>
                    <div className="text-[10px] text-pink-300 font-mono mt-1">+$9,500</div>
                  </button>
                );
              })}
            </div>
          </div>
          ` : `
          {/* TERMINAL & API TESTER */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-black text-amber-400 font-mono font-bold text-xs">POST</span>
              <span className="text-xs font-mono text-white flex-1 bg-black/40 px-3 py-2 rounded-xl border border-white/10">/api/v1/stream</span>
              <button 
                onClick={handleTestApiCall}
                disabled={isSendingApi}
                className="px-4 py-2 rounded-xl font-bold text-xs text-black"
                style={{ backgroundColor: '${primaryColor}' }}
              >
                {isSendingApi ? 'Testing...' : 'Send Request'}
              </button>
            </div>
            {apiResponse && (
              <pre className="p-4 rounded-xl bg-black/60 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}
          </div>
          `}

        </div>
      </section>` : '';

  // 5. METRICS
  const secMetrics = comps.metrics ? `
      {/* 5. METRICS */}
      <section className="px-6 py-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          ${metricsList.map((m, idx) => `
          <div key="${idx}" className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center shadow-lg">
            <div className="text-2xl font-black text-white" style={{ color: ${idx === 0 ? `'${primaryColor}'` : idx === 1 ? `'${secondaryColor}'` : "'#ffffff'"} }}>
              ${m.value}
            </div>
            <div className="text-xs text-slate-400 truncate mt-1">${m.label}</div>
          </div>`).join('\n')}
        </div>
      </section>` : '';

  // 6. FEATURES
  const secFeatures = comps.features ? `
      {/* 6. FEATURES BENTO */}
      <section id="features" className="px-6 py-12 max-w-5xl mx-auto w-full space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white">Core Architectural Features</h2>
          <p className="text-xs text-slate-400">Engineered for production scale and resilience.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${activeFeatures.map((feat, i) => `
          <div key="${i}" className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-black mb-3" style={{ backgroundColor: '${primaryColor}' }}>
              0${i + 1}
            </div>
            <h3 className="font-bold text-sm text-white mb-1.5">${typeof feat === 'string' ? feat : feat.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ${typeof feat === 'string' ? 'Production tested and optimized for rapid zero-downtime iterations.' : feat.desc}
            </p>
          </div>`).join('\n')}
        </div>
      </section>` : '';

  // 7. TESTIMONIALS
  const testimonialsList = (customTestimonials && customTestimonials.length > 0)
    ? customTestimonials
    : [
        { quote: "Nesta completely transformed our product launch. We had our full interactive stack running in hours.", author: "Sarah Lin, CTO at HyperScale" },
        { quote: "The modular component customizer saved our design sprint weeks of engineering effort.", author: "David Vance, Lead Architect" }
      ];
  const reviewsRating = customRating || '4.9/5.0';

  const secTestimonials = comps.testimonials ? `
      {/* 7. TESTIMONIALS */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-lg font-bold text-white">
            <MessageSquare className="w-5 h-5" style={{ color: '${primaryColor}' }} />
            <span>Customer Success & Reviews</span>
          </div>
          <div className="flex items-center text-yellow-400 text-sm">
            <Star className="w-4 h-4 fill-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400" />
            <span className="text-xs text-slate-400 ml-2 font-mono">${reviewsRating} verified reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${testimonialsList.slice(0, 2).map((t) => `
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-sm text-slate-300 space-y-3">
            <p className="italic">"${t.quote}"</p>
            <div className="text-xs font-bold text-white">— ${t.author}</div>
          </div>`).join('\n')}
        </div>
      </section>` : '';

  // 8. PRICING
  const pricingTier1 = customTier1 || { name: 'Starter', price: '$29', desc: 'Indie builders & early MVPs' };
  const pricingTier2 = customTier2 || { name: 'Pro Scale', price: '$89', desc: 'Growing software companies' };
  const pricingTiers = [
    { name: pricingTier1.name, price: pricingTier1.price, desc: pricingTier1.desc },
    { name: pricingTier2.name, price: pricingTier2.price, desc: pricingTier2.desc, featured: true, badge: pricingTier2.badge || 'POPULAR' },
    { name: 'Enterprise', price: '$299', desc: 'Custom security & SLAs' }
  ];

  const secPricing = comps.pricing ? `
      {/* 8. PRICING */}
      <section id="pricing" className="px-6 py-16 max-w-5xl mx-auto w-full space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-white">Transparent Modular Pricing</h2>
          <p className="text-xs text-slate-400">Scale seamlessly from prototype to enterprise.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {pricingTiers.map((tier, idx) => (
            <div 
              key={idx} 
              className={'p-6 rounded-3xl border flex flex-col justify-between ' + (
                tier.featured ? 'bg-white/10 shadow-xl' : 'bg-white/5 border-white/10'
              )}
              style={tier.featured ? { borderColor: '${primaryColor}' } : {}}
            >
              <div>
                <div className="text-sm font-bold text-white mb-2">{tier.name}</div>
                <div className="text-3xl font-black text-white my-2">{tier.price} <span className="text-xs text-slate-400 font-normal">/ mo</span></div>
                <p className="text-xs text-slate-400 mb-6">{tier.desc}</p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Modular React UI</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> REST API Endpoints</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-400" /> Edge Performance</div>
                </div>
              </div>

              <button 
                className={'mt-6 w-full py-2.5 rounded-xl text-xs font-bold transition-all ' + (
                  tier.featured ? 'text-black hover:scale-105' : 'bg-white/10 text-white hover:bg-white/20'
                )}
                style={tier.featured ? { backgroundColor: '${primaryColor}' } : {}}
              >
                Choose {tier.name}
              </button>
            </div>
          ))}
        </div>
      </section>` : '';

  // 9. FAQ
  const faqsList = (customFaqs && customFaqs.length > 0)
    ? customFaqs
    : [
        { q: 'How does code export work?', a: 'You download a zero-config production ZIP containing complete Vite, React, and serverless backend handlers.' },
        { q: 'Can I add custom components later?', a: 'Yes, the codebase is completely open and modular with clean Tailwind tokens.' },
        { q: 'Is this architecture production ready?', a: 'Yes, all components are built with modern reactive state, clean types, and enterprise patterns.' }
      ];

  const secFaq = comps.faq ? `
      {/* 9. FAQ */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full space-y-4">
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase" style={{ color: '${primaryColor}' }}>
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl font-black text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3 max-w-3xl mx-auto">
          {faqsList.map((faq, idx) => (
            <div 
              key={idx} 
              onClick={() => setExpandedFaq(expandedFaq === idx ? -1 : idx)}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer text-sm transition-all hover:border-white/20"
            >
              <div className="flex items-center justify-between font-semibold text-white">
                <span>{faq.q}</span>
                <ChevronDown className={'w-4 h-4 text-slate-400 transition-transform ' + (expandedFaq === idx ? 'rotate-180 text-yellow-400' : '')} />
              </div>
              {expandedFaq === idx && (
                <p className="text-xs text-slate-400 mt-3 leading-relaxed font-sans">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>` : '';

  // 10. CTA BANNER
  const secCtaBanner = comps.ctaBanner ? `
      {/* 10. CTA BANNER */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full">
        <div 
          className="p-8 sm:p-12 rounded-3xl border text-center space-y-4 relative overflow-hidden shadow-2xl"
          style={{ 
            background: 'linear-gradient(135deg, ${primaryColor}25 0%, ${secondaryColor}15 100%)',
            borderColor: '${primaryColor}40'
          }}
        >
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            ${ctaHeadline}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            ${ctaSubheading}
          </p>
          <div className="flex items-center justify-center gap-3 max-w-md mx-auto pt-2">
            <input 
              type="email" 
              placeholder="Enter work email..." 
              className="px-4 py-3 rounded-xl bg-black/50 border border-white/20 text-sm text-white placeholder-slate-500 focus:outline-none w-full"
            />
            <button 
              className="px-6 py-3 rounded-xl text-sm font-black text-black shrink-0 shadow-lg hover:scale-105 transition-all"
              style={{ backgroundColor: '${primaryColor}' }}
            >
              Launch Now
            </button>
          </div>
        </div>
      </section>` : '';

  // 11. FOOTER
  const secFooter = comps.footer ? `
      {/* 11. FOOTER */}
      <footer className="mt-auto px-6 py-8 border-t border-white/10 bg-black/40 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span>© 2026 ${brandName}. All rights reserved. Generated with Nesta App Studio.</span>
        <div className="flex items-center gap-4">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Security</span>
          <span className="hover:text-white cursor-pointer">API Specs</span>
        </div>
      </footer>` : '';

  const sectionMap = {
    navbar: secNavbar,
    hero: secHero,
    trustedBy: secTrustedBy,
    interactiveWidget: secInteractiveWidget,
    metrics: secMetrics,
    features: secFeatures,
    testimonials: secTestimonials,
    pricing: secPricing,
    faq: secFaq,
    ctaBanner: secCtaBanner,
    footer: secFooter,
  };

  const activeOrder = componentOrder && componentOrder.length > 0 ? componentOrder : DEFAULT_COMPONENT_ORDER;
  const renderedSectionsJsx = activeOrder
    .map(key => sectionMap[key] || '')
    .filter(Boolean)
    .join('\n\n');

  return `import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Star, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Cpu, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Send, 
  Play, 
  Terminal, 
  Copy, 
  CheckCircle,
  TrendingUp,
  BarChart3,
  ExternalLink,
  Code,
  Building2,
  HelpCircle,
  ChevronDown,
  MessageSquare,
  Sun,
  Moon
} from 'lucide-react';

export default function App() {
  // Theme Mode (Dark & Light)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // --- Interactive State ---
  // SaaS Calculator
  const [teamSize, setTeamSize] = useState(25);
  const [serverCount, setServerCount] = useState(12);
  const [billingCycle, setBillingCycle] = useState('annual');

  // E-Commerce Cart
  const [cart, setCart] = useState([
    { id: 1, name: 'Studio Headphone Pro', price: 249, qty: 1, color: '${primaryColor}' }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // AI Prompt Console
  const [selectedModel, setSelectedModel] = useState('nemotron-ultra');
  const [promptText, setPromptText] = useState('Build a reactive microservice with real-time WebSocket telemetry');
  const [promptOutput, setPromptOutput] = useState('✓ Ingested request embedding\\n✓ Synthesized architecture contract\\n✓ 0ms cold start latency');
  const [isRunningInference, setIsRunningInference] = useState(false);

  // Fintech Card & Money Transfer
  const [balance, setBalance] = useState(124580.40);
  const [showCvv, setShowCvv] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [sendAmount, setSendAmount] = useState('350.00');
  const [sendRecipient, setSendRecipient] = useState('Global Payout Ops');
  const [transferFeedback, setTransferFeedback] = useState('');

  // Agency Estimator
  const [agencyServices, setAgencyServices] = useState(['Product Design', 'WebGL 3D Interactive']);
  const [activeCategory, setActiveCategory] = useState('All');

  // Developer API Sandbox
  const [activeLang, setActiveLang] = useState('JavaScript');
  const [copied, setCopied] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [isSendingApi, setIsSendingApi] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(-1);

  // Modular Data
  const pricingTiers = ${JSON.stringify(pricingTiers, null, 2)};
  const faqsList = ${JSON.stringify(faqsList, null, 2)};

  const handleAddToCart = (product) => {
    setCart(prev => {
      const match = prev.find(p => p.id === product.id);
      if (match) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (idx, delta) => {
    setCart(prev => {
      const copy = [...prev];
      const item = copy[idx];
      const nQty = item.qty + delta;
      if (nQty <= 0) copy.splice(idx, 1);
      else copy[idx] = { ...item, qty: nQty };
      return copy;
    });
  };

  const handleSendPayment = (e) => {
    e.preventDefault();
    const val = parseFloat(sendAmount);
    if (!val || val <= 0 || val > balance) return;
    setBalance(prev => prev - val);
    setTransferFeedback('Successfully authorized $' + val.toFixed(2) + ' transfer to ' + sendRecipient + '!');
    setTimeout(() => setTransferFeedback(''), 4500);
  };

  const handleRunInference = () => {
    setIsRunningInference(true);
    setPromptOutput('');
    const mock = '✓ Processed prompt tokens\\n✓ Applied model ' + selectedModel + '\\n✓ Deployed reactive schema to edge cluster\\n✓ Generation finished with 0 frame drop';
    let cur = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < mock.length) {
        cur += mock[i];
        setPromptOutput(cur);
        i++;
      } else {
        clearInterval(interval);
        setIsRunningInference(false);
      }
    }, 15);
  };

  const handleTestApiCall = () => {
    setIsSendingApi(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiResponse({
        status: 200,
        ok: true,
        endpoint: '/api/v1/stream',
        latency: '24ms',
        channel: 'events.live',
        client_sync: 'CONFIRMED'
      });
      setIsSendingApi(false);
    }, 500);
  };

  const toggleAgencyService = (srv) => {
    setAgencyServices(prev => 
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const agencyTotal = agencyServices.length * 9500;

  return (
    <div 
      className={'min-h-screen flex flex-col font-sans relative transition-colors duration-300 ' + (isDarkMode ? 'text-white' : 'text-slate-900')} 
      style={{ backgroundColor: isDarkMode ? '${surfaceColor}' : '#F8FAFC' }}
    >
      
      {/* Background Graphic */}
      ${bgStyle === 'image' && bgImageData ? `
      <div 
        className="fixed inset-0 bg-cover bg-center pointer-events-none -z-10"
        style={{ backgroundImage: 'url(' + ${JSON.stringify(bgImageData)} + ')' }}
      />
      <div 
        className="fixed inset-0 pointer-events-none -z-10"
        style={{ backgroundColor: 'rgba(15, 17, 23, ${bgOverlayOpacity / 100})' }}
      />
      ` : bgStyle === 'grid' ? `
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none -z-10"
        style={{
          backgroundImage: 'radial-gradient(${primaryColor} 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      ` : `
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle at 50% 0%, ${primaryColor}25, transparent 70%)'
        }}
      />
      `}

      {/* 11 Dynamic Modular Sections in Custom Sequence */}
      ${renderedSectionsJsx}

    </div>
  );
}
`;
}
