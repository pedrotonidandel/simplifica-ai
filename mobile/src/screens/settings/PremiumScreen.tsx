import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';

interface Feature {
  icon: string;
  label: string;
  free: boolean;
  premium: boolean;
}

const FEATURES: Feature[] = [
  { icon: '⚡', label: 'Análises por dia', free: false, premium: false },
  { icon: '♾️', label: 'Análises ilimitadas', free: false, premium: true },
  { icon: '🧒', label: 'Modo Explique para mim', free: true, premium: true },
  { icon: '📌', label: 'Modo Pontos importantes', free: true, premium: true },
  { icon: '⚠️', label: 'Modo Riscos e armadilhas', free: true, premium: true },
  { icon: '🔍', label: 'O que está escondido?', free: false, premium: true },
  { icon: '📚', label: 'Histórico ilimitado', free: false, premium: true },
  { icon: '🚫', label: 'Sem anúncios', free: false, premium: true },
];

export function PremiumScreen() {
  const handleSubscribe = () => {
    // TODO: integrar react-native-iap para Google Play Billing e Apple IAP
    Alert.alert(
      '🚧 Em breve',
      'A integração com loja de pagamentos está em desenvolvimento.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.crown}>👑</Text>
      <Text style={styles.title}>Simplifica AI Premium</Text>
      <Text style={styles.subtitle}>Entenda qualquer texto, sem limites.</Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.colFeature]}>Funcionalidade</Text>
          <Text style={styles.colPlan}>Grátis</Text>
          <Text style={[styles.colPlan, { color: colors.premium }]}>Premium</Text>
        </View>

        {FEATURES.map((f, i) => (
          <View
            key={f.label}
            style={[
              styles.row,
              i === FEATURES.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.colFeature}>
              {f.icon} {f.label === 'Análises por dia' ? '5/dia' : f.label}
            </Text>
            <Text style={[styles.colPlan, !f.free && styles.noIcon]}>
              {f.free ? '✅' : '—'}
            </Text>
            <Text style={styles.colPlan}>{f.premium ? '✅' : '—'}</Text>
          </View>
        ))}
      </View>

      <View style={styles.priceCard}>
        <View style={styles.priceRow}>
          <Text style={styles.priceValue}>R$ 14,90</Text>
          <Text style={styles.pricePeriod}>/mês</Text>
        </View>
        <Text style={styles.priceNote}>ou R$ 99,90/ano (economize 44%)</Text>
      </View>

      <Button
        label="👑 Assinar Premium"
        onPress={handleSubscribe}
        style={styles.cta}
      />

      <Text style={styles.terms}>
        Cancele quando quiser · Sem fidelidade · Renovação automática
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 24, gap: 20, alignItems: 'center', paddingBottom: 40 },
  crown: { fontSize: 56 },
  title: { color: colors.premium, fontSize: 26, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.textMuted, fontSize: 16, textAlign: 'center' },
  table: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: colors.surfaceLight,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  colFeature: { flex: 2, color: colors.text, fontSize: 13 },
  colPlan: { flex: 1, color: colors.text, fontSize: 14, textAlign: 'center', fontWeight: '600' },
  noIcon: { color: colors.textMuted, fontWeight: '400' },
  priceCard: { alignItems: 'center', gap: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4 },
  priceValue: { color: colors.premium, fontSize: 44, fontWeight: '800' },
  pricePeriod: { color: colors.textMuted, fontSize: 18, marginBottom: 8 },
  priceNote: { color: colors.textMuted, fontSize: 13 },
  cta: { width: '100%' },
  terms: { color: colors.textMuted, fontSize: 11, textAlign: 'center', lineHeight: 18 },
});
