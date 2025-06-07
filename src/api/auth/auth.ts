import axios from 'axios';
import type { LoginRequest, LoginResponse } from '../../types/auth';
import { base_url, endPoint } from '../api';


const api = axios.create({
  baseURL: base_url,
});

export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await api.post(endPoint.login, credentials);
  return data;
};

export default api;
