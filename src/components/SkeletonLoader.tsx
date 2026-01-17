import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../constants';

export const SkeletonLoader: React.FC = () => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.titleSkeleton, { opacity }]} />
      <Animated.View style={[styles.bodySkeleton, { opacity }]} />
      <Animated.View style={[styles.bodySkeletonShort, { opacity }]} />
    </View>
  );
};

export const SkeletonList: React.FC = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <SkeletonLoader key={index} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleSkeleton: {
    height: 20,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 8,
  },
  bodySkeleton: {
    height: 16,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    marginBottom: 4,
  },
  bodySkeletonShort: {
    height: 16,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    width: '70%',
  },
});