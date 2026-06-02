import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MODES } from '../../constants/modes';
import { AnalysisMode } from '../../types/analysis.types';
import { colors } from '../../theme/colors';
import { usePlan } from '../../hooks/usePlan';

interface Props {
  selected: AnalysisMode;
  onChange: (mode: AnalysisMode) => void;
  onPremiumPress: () => void;
}

export function ModeSelector({ selected, onChange, onPremiumPress }: Props) {
  const { canUseMode } = usePlan();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {MODES.map((mode) => {
        const isSelected = selected === mode.id;
        const locked = !canUseMode(mode.id);

        return (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.card,
              isSelected && { borderColor: mode.color },
              locked && styles.locked,
            ]}
            onPress={() => (locked ? onPremiumPress() : onChange(mode.id))}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{mode.icon}</Text>
            <Text style={[styles.label, isSelected && { color: mode.color }]}>
              {mode.label}
            </Text>
            <Text style={styles.desc}>{mode.description}</Text>
            {locked && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>👑 Premium</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, gap: 10 },
  card: {
    width: 148,
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 4,
  },
  locked: { opacity: 0.65 },
  icon: { fontSize: 24 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700' },
  desc: { color: colors.textMuted, fontSize: 11, lineHeight: 16 },
  premiumBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(255,215,0,0.12)',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  premiumText: { color: colors.premium, fontSize: 10, fontWeight: '700' },
});
