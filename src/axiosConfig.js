import axios from 'axios';

// Create Axios instance
const instance = axios.create({
  baseURL: 'http://localhost:5000',
});

// Auto logout on 401
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/'; // redirect
    }
    return Promise.reject(error);
  }
);

export default instance;
