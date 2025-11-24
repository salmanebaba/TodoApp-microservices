import axios from 'axios';

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_API || 'http://localhost:4000';
const TODO_API = process.env.NEXT_PUBLIC_TODO_API || 'http://localhost:4001';

const authClient = axios.create({
  baseURL: AUTH_API,
});

const todoClient = axios.create({
  baseURL: TODO_API,
});

// Add token to requests
[authClient, todoClient].forEach((client) => {
  client.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle 401 and refresh token
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await authClient.post('/auth/refresh', {
              refreshToken,
            });
            localStorage.setItem('accessToken', response.data.accessToken);
            // Retry original request
            return client.request(error.config);
          } catch {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/login';
          }
        }
      }
      return Promise.reject(error);
    },
  );
});

export { authClient, todoClient };
