import axios from 'axios';

export const planetsApi = axios.create({
  baseURL: 'http://localhost:3100/planets',
});

//! Interceptor para simular una espera de 2 segundos
planetsApi.interceptors.request.use((config) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(config);
      // reject(new Error('Error de prueba desde interceptor'));
    }, 2000);
  });
});
