import instance from './axios';

export const register = (data) => {
  return instance.post('/api/auth/register/', data);
};

export const login = (data) => {
  return instance.post('/api/auth/login/', data);
};

export const refreshToken = (refreshToken) => {
  return instance.post('/api/auth/refresh/', { refresh: refreshToken });
};

export const getUserProfile = () => {
  return instance.get('/api/auth/user/');
};

export const updateUserProfile = (data) => {
  return instance.put('/api/auth/user/', data);
};
