import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const noAuthApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accesstoken');
  config.headers.Authorization = token;

  return config;
});

export const memberAPI = {
  changeName: (name: string) =>
    api.put(`/member/nickname`, { userNickname: name }),
};

export const boardAPI = {
  getBoard: (page: number) =>
    noAuthApi.get(`/api/board`, { params: { page: page } }),
};

export default api;
