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
      <Text style={styles.icon}>👑</Text>
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
    backgroundColor: 'rgba(255,215,0,0.08)',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,215,0,0.2)',
  },
  icon: { fontSize: 32 },
  message: { color: colors.text, fontSize: 14, textAlign: 'center', lineHeight: 20 },
  button: { width: '100%', marginTop: 4 },
});
