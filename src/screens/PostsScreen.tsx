import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePosts } from '../hooks/usePosts';
import { useDebounce } from '../hooks/useDebounce';
import { PostCard } from '../components/PostCard';
import { SearchBar } from '../components/SearchBar';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { SkeletonList } from '../components/SkeletonLoader';
import { Post } from '../types';
import { STORAGE_KEYS, DEBOUNCE_DELAY } from '../constants';
import { globalStyles } from '../styles';

export const PostsScreen: React.FC = () => {
  const { posts, loading, error, refreshing, fetchPosts, refresh } = usePosts();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, DEBOUNCE_DELAY);

  // Load saved search query on mount
  useEffect(() => {
    const loadSavedSearchQuery = async () => {
      try {
        const savedQuery = await AsyncStorage.getItem(STORAGE_KEYS.SEARCH_QUERY);
        if (savedQuery) {
          setSearchQuery(savedQuery);
        }
      } catch (error) {
        console.error('Failed to load saved search query:', error);
      }
    };

    loadSavedSearchQuery();
  }, []);

  // Save search query to AsyncStorage with debounce
  useEffect(() => {
    const saveSearchQuery = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.SEARCH_QUERY, debouncedSearchQuery);
      } catch (error) {
        console.error('Failed to save search query:', error);
      }
    };

    saveSearchQuery();
  }, [debouncedSearchQuery]);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) {
      return posts;
    }
    
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  const renderPost: ListRenderItem<Post> = ({ item }) => (
    <PostCard title={item.title} body={item.body} />
  );

  const renderEmptyComponent = () => {
    if (loading) {
      return <SkeletonList />;
    }

    if (searchQuery.trim() && filteredPosts.length === 0) {
      return (
        <View style={globalStyles.centered}>
          <Text style={globalStyles.emptyText}>No posts found.</Text>
        </View>
      );
    }

    return null;
  };

  if (loading && posts.length === 0) {
    return <LoadingIndicator />;
  }

  if (error && posts.length === 0) {
    return (
      <View style={globalStyles.centered}>
        <Text style={globalStyles.errorText}>
          Unable to fetch posts. Check your network connection.
        </Text>
        <TouchableOpacity style={globalStyles.retryButton} onPress={fetchPosts}>
          <Text style={globalStyles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search posts by title..."
      />
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={refresh}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};