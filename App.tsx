import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { PostsScreen } from './src/screens/PostsScreen';
import { globalStyles } from './src/styles';

export default function App() {
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F2F7" />
      <PostsScreen />
    </SafeAreaView>
  );
}