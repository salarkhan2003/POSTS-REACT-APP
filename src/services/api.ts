import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { Post, ApiError } from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<Post[]>('/posts');
    
    if (response.status !== 200) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Network error occurred',
        status: error.response?.status,
      };
      throw apiError;
    }
    
    throw new Error('An unexpected error occurred');
  }
};