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
              isSelected && { borderColor: mode.color, backgroundColor: mode.color + '14' },
              locked && styles.locked,
            ]}
            onPress={() => (locked ? onPremiumPress() : onChange(mode.id))}
            activeOpacity={0.7}
          >
            <View style={[styles.abbrPill, { backgroundColor: mode.color + '22' }]}>
              <Text style={[styles.abbrText, { color: mode.color }]}>{mode.abbr}</Text>
            </View>
            <Text style={[styles.label, isSelected && { color: mode.color }]} numberOfLines={2}>
              {mode.label}
            </Text>
            <Text style={styles.desc} numberOfLines={2}>{mode.description}</Text>
            {locked && (
              <View style={styles.proBadge}>
                <Text style={styles.proText}>PRO</Text>
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
    width: 140,
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 6,
  },
  locked: { opacity: 0.6 },
  abbrPill: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  abbrText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  desc: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
  proBadge: {
    marginTop: 2,
    backgroundColor: '#C9A22722',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  proText: {
    color: '#C9A227',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
