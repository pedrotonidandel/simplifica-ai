import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

interface Props {
  size?: 'large' | 'small';
}

export function Logo({ size = 'large' }: Props) {
  const isLarge = size === 'large';

  return (
    <View style={[styles.container, isLarge ? styles.containerLarge : styles.containerSmall]}>
      <View style={[styles.mark, isLarge ? styles.markLarge : styles.markSmall]}>
        <Text style={[styles.markLetter, isLarge ? styles.markLetterLarge : styles.markLetterSmall]}>
          S
        </Text>
      </View>
      {isLarge && (
        <Text style={styles.wordmark}>
          <Text style={styles.wordmarkLight}>simplifica</Text>
          <Text style={styles.wordmarkBold}> ai</Text>
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  containerLarge: {
    gap: 14,
  },
  containerSmall: {
    gap: 0,
  },
  mark: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markLarge: {
    width: 72,
    height: 72,
    borderRadius: 20,
  },
  markSmall: {
    width: 32,
    height: 32,
    borderRadius: 10,
  },
  markLetter: {
    color: '#fff',
    fontWeight: '800',
    letterSpacing: -1,
  },
  markLetterLarge: {
    fontSize: 40,
  },
  markLetterSmall: {
    fontSize: 18,
  },
  wordmark: {
    fontSize: 26,
    letterSpacing: -0.5,
  },
  wordmarkLight: {
    color: colors.text,
    fontWeight: '300',
  },
  wordmarkBold: {
    color: colors.primary,
    fontWeight: '800',
  },
});
