import axios, { AxiosInstance } from "axios";
import { useAuth } from "@clerk/clerk-expo";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
// const API_BASE_URL = "http://localhost:3000/api";

if (!API_BASE_URL) {
  throw new Error("Missing EXPO_PUBLIC_API_URL");
}

// this will basically create an authenticated api, pass the token into our headers
const createApiClient = (
  getToken: () => Promise<string | null>,
): AxiosInstance => {
  const api = axios.create({ baseURL: API_BASE_URL });

  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      } catch (error) {
        console.error("Failed to get authentication token");
        return config;
      }
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  return api;
};

// this returns an authenticated api instances
export const useApiClient = (): AxiosInstance => {
  const { getToken } = useAuth();
  return createApiClient(getToken);
};

export const userApi = {
  syncUser: (api: AxiosInstance) => api.post("/users/sync"),
  getCurrentUser: (api: AxiosInstance) => api.get("/users/me"),
  updateProfile: (api: AxiosInstance, data: any) =>
    api.put("/users/profile", data),
};

interface CreatePostData {
  content: string;
  image?: string;
}

export const postApi = {
  createPost: (api: AxiosInstance, data: CreatePostData) =>
    api.post("/posts", data),
  getUserPosts: (api: AxiosInstance, username: string) =>
    api.get(`/posts/post/${username}`),
  getPosts: (api: AxiosInstance) => api.get("/posts"),
  likePost: (api: AxiosInstance, postId: string) =>
    api.post(`/posts/${postId}/like`),
  deletePost: (api: AxiosInstance, postId: string) =>
    api.delete(`/posts/${postId}`),
};

export const commentApi = {
  createComment: (api: AxiosInstance, postId: string, content: string) =>
    api.post(`/comments/post/${postId}`, { content }),
};
