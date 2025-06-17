
const BASE_URL = 'https://story-api.dicoding.dev/v1';

export const Api = {
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async register(name, email, password) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  async getStories(token) {
    const response = await fetch(`${BASE_URL}/stories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  async postStory(formData, token) {
    const response = await fetch(`${BASE_URL}/stories`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    return response.json();
  }
};
