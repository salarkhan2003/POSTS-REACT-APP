# Posts App - React Native with Expo

A production-ready React Native application built with Expo and TypeScript that fetches and displays posts from JSONPlaceholder API with advanced search functionality and persistent storage.

## 🚀 Features

### Core Features
- ✅ Fetch posts from JSONPlaceholder API
- ✅ Display posts in FlatList with reusable PostCard component
- ✅ Live search functionality (case-insensitive filtering by title)
- ✅ AsyncStorage integration for persistent search queries
- ✅ Comprehensive error handling with retry functionality
- ✅ Empty state handling for no search results

### Bonus Features
- ✅ Loading indicator (ActivityIndicator) on initial load
- ✅ Skeleton loader UI for enhanced user experience
- ✅ Pull-to-refresh functionality on FlatList
- ✅ Debounced AsyncStorage writes (300ms delay)
- ✅ Clean, responsive UI design with shadows and proper spacing

## 🏗️ Architecture

Clean architecture with organized folder structure:

```
src/
├── components/     # Reusable UI components
│   ├── PostCard.tsx
│   ├── SearchBar.tsx
│   ├── LoadingIndicator.tsx
│   └── SkeletonLoader.tsx
├── screens/        # Screen components
│   └── PostsScreen.tsx
├── hooks/          # Custom React hooks
│   ├── usePosts.ts
│   └── useDebounce.ts
├── services/       # API and external services
│   └── api.ts
├── constants/      # App constants and configuration
│   └── index.ts
├── styles/         # Global styles
│   └── index.ts
└── types/          # TypeScript type definitions
    └── index.ts
```

## 🛠️ Tech Stack

- **React Native**: 0.72.6
- **Expo**: ~49.0.15
- **TypeScript**: ^5.1.3
- **Axios**: ^1.6.0 (HTTP client)
- **AsyncStorage**: 1.19.3 (Persistent storage)

## 📱 Installation & Setup

1. **Clone or copy all files to your project directory**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Run on specific platform:**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web Browser
   npm run web
   ```

## 🔧 Key Components

### PostsScreen
Main screen component that orchestrates the entire app functionality:
- Manages posts state using custom `usePosts` hook
- Handles search functionality with debounced AsyncStorage
- Renders FlatList with proper loading and error states

### PostCard
Reusable component for displaying individual posts:
- Clean UI with title and body text
- Proper text truncation and styling
- Shadow effects and rounded corners

### usePosts Hook
Custom hook for managing posts state:
- Handles API calls with proper error handling
- Manages loading, error, and refreshing states
- Provides retry functionality

### SearchBar
Dedicated search input component:
- Real-time search as user types
- Proper styling and placeholder text
- Clear button functionality
PS E:\INTERNSHALA ASSIGNMENT\PROJECT\PROJECT> rmdir /s node_modules
Remove-Item : A positional parameter cannot be found that accepts argument 'node_modules'.
At line:1 char:1
+ rmdir /s node_modules
+ ~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidArgument: (:) [Remove-Item], ParameterBindingException      
                                                                                                  Compress-Archive                                                                                    The archive file 'E:\INTERNSHALA ASSIGNMENT\PROJECT\PROJECT\react-native-task-patan.zip' crea    tion is in progress...                                                                           [ooooooooooooooooooooooooooooooooooooooo                                              ]                                                                                                       tive-task-patan.zip"

## 🎯 Features Implementation

### Live Search
- Case-insensitive filtering by post title
- Instant results as user types
- Maintains original posts array for filtering

### AsyncStorage Integration
- Saves search queries automatically with 300ms debounce
- Restores saved search on app restart
- Auto-fills search input with saved query

### Error Handling
- Network error detection and user-friendly messages
- Retry button for failed API calls
- Graceful handling of various error scenarios

### Loading States
- Initial loading with ActivityIndicator
- Skeleton loaders for better perceived performance
- Pull-to-refresh functionality

## 🚀 Ready to Run

This is a complete, production-ready application. Simply:

1. Copy all files to your project directory
2. Run `npm install && npm start`
3. Choose your platform (iOS/Android/Web)

The app will automatically fetch posts, allow searching, and persist your search queries across app restarts.

## 📝 Code Quality

- Full TypeScript implementation with proper typing
- Functional components with React Hooks
- Clean code with consistent naming conventions
- Proper error boundaries and loading states
- Optimized performance with debouncing and memoization
- ESLint/Prettier friendly code structure