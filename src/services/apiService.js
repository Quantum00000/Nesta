import axios from 'axios';
import { API_CONFIG } from '../api/endpoints';
import { UI_TEMPLATES } from '../data/uiTemplates';
import { FRONTEND_OPTIONS } from '../data/frontendOptions';
import { BACKEND_OPTIONS } from '../data/backendOptions';

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('nesta_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('[Nesta API Error]', error.response?.data || error.message);
    if (!error.response) {
      return Promise.reject(new Error('Backend server is unreachable. Please ensure your Railway backend is active and VITE_API_BASE_URL is configured in Vercel.'));
    }
    return Promise.reject(error.response?.data || error);
  }
);

class ApiService {
  async request(config) {
    return apiClient(config);
  }

  async login(username, password) {
    const res = await this.request({ url: '/auth/login', method: 'POST', data: { username, password }});
    if (res.token) localStorage.setItem('nesta_jwt_token', res.token);
    return res;
  }

  async register(username, password) {
    return this.request({ url: '/auth/register', method: 'POST', data: { username, password }});
  }

  logout() {
    localStorage.removeItem('nesta_jwt_token');
  }

  // Registry API
  async getFrontendTech() {
    return FRONTEND_OPTIONS;
  }
  async getBackendTech() {
    return BACKEND_OPTIONS;
  }
  async getDatabaseTech() {
    const res = await this.request({ url: '/technologies/database', method: 'GET' }).catch(() => []);
    return (res || []).map(r => ({ ...r, tagline: r.description || '', category: 'All' }));
  }
  async getFeatures() {
    return this.request({ url: '/features', method: 'GET' }).catch(() => []);
  }
  async getTemplates() {
    return UI_TEMPLATES;
  }

  // Projects
  async saveProject(config) {
    return this.request({
      url: '/projects',
      method: 'POST',
      data: config
    });
  }

  async generateBuild(projectId) {
    return this.request({
      url: `/projects/${projectId}/generate`,
      method: 'POST'
    });
  }

  async getArtifacts(projectId) {
    return this.request({
      url: `/projects/${projectId}/artifacts`,
      method: 'GET'
    });
  }

  async deploySite(projectId, provider = 'cloudflare_pages') {
    // Stub for now
    return Promise.resolve({ success: true, liveUrl: 'https://preview.nesta.dev' });
  }
}

export const apiService = new ApiService();
