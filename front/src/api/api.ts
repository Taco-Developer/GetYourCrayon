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

export const gameAPI = {
  /**방 생성 */
  createRoom: () => api.post(`/api/room/create`),
  /**방 참여 */
  joinRoom: (roomIdx: string) =>
    api.post(`/api/room/join`, { roomidx: roomIdx }),
  /**방 나가기 */
  outRoom: () => api.post(`/api/room/out`),
  /**AI 이미지가져오기 */
  getAiImages: () => api.get(`/api/game/reversecatch`),
};

export const memberAPI = {
  /**닉네임 변경 */
  changeName: (name: string) =>
    api.put(`/api/member/nickname`, { userNickname: name }),
  /**마이페이지 유저정보 가져오기 */
  getUserInfo: (userIdx: number) =>
    api.get(`/api/user/mypage/profile/${userIdx}`),
};

export const gatchaAPI = {
  /** 1회뽑기 */
  oneGacha: (userIdx: number) =>
    api.post(`/api/user/mypage/gacha/${userIdx}/once`),
  /** 10회뽑기 */
  tenGacha: (userIdx: number) =>
    api.post(`/api/user/mypage/gacha/${userIdx}/tenth`),
};

export const boardAPI = {
  /**게시글 가져오기 */
  getBoard: (page: number) =>
    noAuthApi.get(`/api/board`, { params: { page: page } }),
  /**글 작성 */
  postBoard: (title: string, content: string) =>
    api.post(`/api/board/create`, { title: title, content: content }),
};

export default api;
