import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://meet-us-api.byeonggi.synology.me',
  withCredentials: true,
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const noTokenRequired = ['/v1/auth/login', '/v1/auth/refresh'];
    if (config.headers && token && !noTokenRequired.includes(config.url || '')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) =>
    // Do something with request erro
    error.response
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) =>
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
    response,
  (error) =>
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    error.response
);

export default instance;
