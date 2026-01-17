import { useState, useEffect, useCallback } from 'react';
import { fetchPosts as fetchPostsApi } from '../services/api';
import { Post, ApiError } from '../types';

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  fetchPosts: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const usePosts = (): UsePostsReturn => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchPosts = useCallback(async () => {
    try {
      setError(null);
      const fetchedPosts = await fetchPostsApi();
      setPosts(fetchedPosts);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Unable to fetch posts. Check your network connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setError(null);
      const fetchedPosts = await fetchPostsApi();
      setPosts(fetchedPosts);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Unable to fetch posts. Check your network connection.');
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refreshing,
    fetchPosts,
    refresh,
  };
};