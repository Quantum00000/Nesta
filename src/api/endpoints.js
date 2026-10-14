/**
 * Nesta API Endpoints Specification
 * ----------------------------------------------------
 * You can connect your backend by updating the base URL in .env:
 * VITE_API_BASE_URL=http://localhost:5000/api/v1
 * 
 * Below is the complete contract for all Nesta API endpoints:
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  TIMEOUT: 15000,
};

export const API_ENDPOINTS = {
  // 1. Projects & Scaffolding
  PROJECTS: {
    LIST: '/projects',                       // GET: Retrieve all user projects
    CREATE: '/projects',                     // POST: Create a new project configuration
    GET_BY_ID: (id) => `/projects/${id}`,    // GET: Retrieve project details
    UPDATE: (id) => `/projects/${id}`,       // PUT: Update project settings
    DELETE: (id) => `/projects/${id}`,       // DELETE: Remove project
  },

  // 2. Framework & Frontend Options
  FRONTENDS: {
    LIST: '/frontends',                      // GET: Fetch list of supported frontend frameworks
    GET_DETAILS: (id) => `/frontends/${id}`, // GET: Fetch boilerplate files, dependencies, & template code
    CUSTOM_ADD: '/frontends/custom',         // POST: Register a new custom frontend framework
  },

  // 3. Website Components Registry
  COMPONENTS: {
    LIST: '/components',                     // GET: Fetch all available modular website building blocks
    GET_CODE: (id) => `/components/${id}`,   // GET: Get the code and props schema for a specific component
  },

  // 4. Code Generation & Build Pipeline
  BUILD: {
    GENERATE: '/build/generate',             // POST: Generates full source code zip / git repo
    PREVIEW: '/build/preview',               // POST: Generates sandboxed live preview URL
    STATUS: (buildId) => `/build/status/${buildId}`, // GET: Polling build logs and pipeline status
  },

  // 5. Deployment
  DEPLOY: {
    TRIGGER: '/deploy',                      // POST: Deploys project to Vercel/Netlify/Cloudflare/Custom VPS
    STATUS: (deployId) => `/deploy/${deployId}`, // GET: Check deployment health and public domain
  }
};

/**
 * Detailed API documentation for backend engineers to implement:
 */
export const API_DOCUMENTATION = [
  {
    endpoint: '/api/v1/projects',
    method: 'POST',
    title: 'Create / Save Project Configuration',
    description: 'Saves the user\'s chosen frontend, active components, color scheme, and site metadata.',
    requestPayload: {
      projectName: 'my-nesta-site',
      frontendId: 'nextjs',
      theme: {
        palette: ['yellow', 'grey', 'white'],
        mode: 'dark'
      },
      selectedComponents: ['navbar', 'hero', 'bento-grid', 'cta-banner', 'footer'],
      customConfig: {
        typescript: true,
        styling: 'tailwind',
        packageManager: 'pnpm'
      }
    },
    responsePayload: {
      success: true,
      projectId: 'proj_98a7df42b',
      message: 'Project created successfully',
      previewUrl: 'https://preview.nesta.dev/proj_98a7df42b',
      createdAt: '2026-09-25T18:00:00Z'
    }
  },
  {
    endpoint: '/api/v1/frontends',
    method: 'GET',
    title: 'Get Available Frontend Options',
    description: 'Returns all available frontend options with their features, template files, and capabilities.',
    requestPayload: null,
    responsePayload: {
      success: true,
      count: 8,
      data: [
        { id: 'react', name: 'React 19', category: 'SPA', renderType: 'Client-Side / Hybrid' },
        { id: 'nextjs', name: 'Next.js 15', category: 'Fullstack', renderType: 'SSR / App Router' },
        { id: 'vue', name: 'Vue 3', category: 'Progressive', renderType: 'SPA / Composition API' }
      ]
    }
  },
  {
    endpoint: '/api/v1/build/generate',
    method: 'POST',
    title: 'Generate Website Source Code',
    description: 'Triggers the scaffolding engine to compile the selected frontend files and components into a downloadable bundle.',
    requestPayload: {
      projectId: 'proj_98a7df42b',
      outputFormat: 'zip' // 'zip' | 'github_repo'
    },
    responsePayload: {
      success: true,
      buildId: 'bld_44781',
      downloadUrl: 'https://api.nesta.dev/downloads/my-nesta-site.zip',
      filesCount: 24,
      buildTimeMs: 1420
    }
  },
  {
    endpoint: '/api/v1/deploy',
    method: 'POST',
    title: 'One-Click Edge Deployment',
    description: 'Deploys the generated static files or serverless bundle directly to CDN edge servers.',
    requestPayload: {
      projectId: 'proj_98a7df42b',
      provider: 'cloudflare_pages', // 'vercel' | 'netlify' | 'cloudflare_pages' | 'self_hosted'
      subdomain: 'my-nesta-site'
    },
    responsePayload: {
      success: true,
      deploymentId: 'dep_09138f',
      liveUrl: 'https://my-nesta-site.nesta.app',
      status: 'active',
      dnsRecords: [
        { type: 'CNAME', host: '@', value: 'edge.nesta.net' }
      ]
    }
  }
];
