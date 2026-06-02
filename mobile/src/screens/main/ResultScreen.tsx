import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Share,
  TouchableOpacity,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/navigation.types';
import { MODES } from '../../constants/modes';
import { ResultCard } from '../../components/analysis/ResultCard';
import { BannerAd } from '../../components/ads/BannerAd';
import { Button } from '../../components/common/Button';
import { colors } from '../../theme/colors';
import { formatDateTime } from '../../utils/formatters';

type RouteProps = RouteProp<HomeStackParamList, 'Result'>;

export function ResultScreen() {
  const { params } = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { analysis } = params;

  const modeConfig = MODES.find((m) => m.id === analysis.mode);

  const handleShare = async () => {
    await Share.share({
      message: `${modeConfig?.label ?? 'Análise'}:\n\n${analysis.resultText}\n\n— Simplifica AI`,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <ResultCard analysis={analysis} />

        <View style={styles.actions}>
          <Button
            label="📤 Compartilhar"
            onPress={handleShare}
            variant="outline"
            style={styles.actionBtn}
          />
          <Button
            label="← Nova análise"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={styles.actionBtn}
          />
        </View>

        <View style={styles.meta}>
          <Text style={styles.metaText}>
            {analysis.characterCount.toLocaleString('pt-BR')} caracteres
          </Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{analysis.processingMs}ms</Text>
          <Text style={styles.metaDot}>·</Text>
          <Text style={styles.metaText}>{formatDateTime(analysis.createdAt)}</Text>
        </View>

        <TouchableOpacity
          style={styles.historyLink}
          onPress={() => navigation.getParent()?.navigate('History')}
        >
          <Text style={styles.historyLinkText}>Ver histórico completo →</Text>
        </TouchableOpacity>
      </ScrollView>

      <BannerAd />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 16, gap: 16, paddingBottom: 32 },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1 },
  meta: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  metaText: { color: colors.textMuted, fontSize: 12 },
  metaDot: { color: colors.border, fontSize: 12 },
  historyLink: { alignItems: 'center' },
  historyLinkText: { color: colors.primary, fontSize: 13, fontWeight: '600' },
});
