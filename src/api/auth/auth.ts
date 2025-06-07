import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../../types/auth';


const api = axios.create({
  baseURL: 'https://example.com/api',
});

export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post('/login', credentials);
  return data;
};

export default api;
