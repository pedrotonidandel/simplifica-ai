import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../common/Button';
import { colors } from '../../theme/colors';

interface Props {
  message?: string;
}

export function UpgradePrompt({ message = 'Faça upgrade para usar essa funcionalidade.' }: Props) {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.proBadge}>
        <Text style={styles.proText}>PRO</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      <Button
        label="Ver plano Premium"
        onPress={() => navigation.navigate('Premium')}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#C9A22710',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#C9A22730',
  },
  proBadge: {
    backgroundColor: '#C9A22720',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#C9A22740',
  },
  proText: {
    color: '#C9A227',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
  },
  message: { color: colors.text, fontSize: 14, textAlign: 'center', lineHeight: 20 },
  button: { width: '100%', marginTop: 4 },
});
