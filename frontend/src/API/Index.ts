import axios from 'axios';
import { url } from '../utils/Utils';
import { UserCredentials } from '../types';

// const api = axios.create({
//   baseURL: url(),
//   data: {},
// });

const api = axios.create({
  baseURL: 'https://4f5ebf6efde6.ngrok-free.app',
  withCredentials: true,          
});

export const createDefaultFormData = (userCredentials: UserCredentials) => {
  const formData = new FormData();
  if (userCredentials?.uri) {
    formData.append('uri', userCredentials?.uri);
  }
  if (userCredentials?.database) {
    formData.append('database', userCredentials?.database);
  }
  if (userCredentials?.userName) {
    formData.append('userName', userCredentials?.userName);
  }
  if (userCredentials?.password) {
    formData.append('password', userCredentials?.password);
  }
  if (userCredentials?.email) {
    formData.append('email', userCredentials?.email);
  }
  if (userCredentials?.openaiApiKey) {
    formData.append('openaiApiKey', userCredentials?.openaiApiKey);
  }
  api.interceptors.request.use(
    (config) => {
      if (config.data instanceof FormData) {
        for (const [key, value] of formData.entries()) {
          if (!config.data.has(key)) {
            config.data.append(key, value);
          }
        }
      } else {
        const formData = new FormData();
        for (const [key, value] of formData.entries()) {
          formData.append(key, value);
        }
        for (const [key, value] of Object.entries(config.data || {})) {
          formData.append(key, value as any);
        }
        config.data = formData;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return formData;
};

export default api;
