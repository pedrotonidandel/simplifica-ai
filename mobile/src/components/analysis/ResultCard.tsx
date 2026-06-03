import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Analysis } from '../../types/analysis.types';
import { MODES } from '../../constants/modes';
import { colors } from '../../theme/colors';
import { Card } from '../common/Card';

interface Props {
  analysis: Analysis;
}

export function ResultCard({ analysis }: Props) {
  const modeConfig = MODES.find((m) => m.id === analysis.mode);

  return (
    <Card>
      <View style={[styles.modeBadge, { backgroundColor: (modeConfig?.color ?? colors.primary) + '18' }]}>
        <View style={[styles.abbrPill, { backgroundColor: (modeConfig?.color ?? colors.primary) + '30' }]}>
          <Text style={[styles.abbrText, { color: modeConfig?.color ?? colors.primary }]}>
            {modeConfig?.abbr}
          </Text>
        </View>
        <Text style={[styles.modeLabel, { color: modeConfig?.color ?? colors.primary }]}>
          {modeConfig?.label}
        </Text>
      </View>
      <Text style={styles.result}>{analysis.resultText}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  modeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  abbrPill: {
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  abbrText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  modeLabel: {
    fontWeight: '700',
    fontSize: 13,
  },
  result: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 27,
  },
});
