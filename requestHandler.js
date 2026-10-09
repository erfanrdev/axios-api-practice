const axios = require('axios');
const { randomUUID } = require('crypto');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'my-secret-token';

// instance مشترک با baseURL و headerهای ثابت
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Client-Name': 'axios-api-practice',
  },
});

// Request interceptor: اضافه کردن توکن و headerهای داینامیک به هر درخواست
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    config.headers['X-Request-Id'] = randomUUID();
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: مدیریت یکپارچه خطاها
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`[HTTP ${error.response.status}]`, error.response.data);
    } else {
      console.error('[Network Error]', error.message);
    }
    return Promise.reject(error);
  }
);

module.exports = instance;
