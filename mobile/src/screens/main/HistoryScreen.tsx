import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useHistory, useDeleteAnalysis } from '../../hooks/useHistory';
import { Analysis } from '../../types/analysis.types';
import { MODES } from '../../constants/modes';
import { colors } from '../../theme/colors';
import { truncate, formatDate } from '../../utils/formatters';

export function HistoryScreen() {
  const navigation = useNavigation<any>();
  const { data, isLoading, refetch } = useHistory();
  const { mutate: deleteAnalysis } = useDeleteAnalysis();

  const handleDelete = (id: string) => {
    Alert.alert('Excluir análise', 'Tem certeza que quer remover?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => deleteAnalysis(id),
      },
    ]);
  };

  const renderItem = ({ item }: { item: Analysis }) => {
    const mode = MODES.find((m) => m.id === item.mode);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => navigation.navigate('HomeTab', { screen: 'Result', params: { analysis: item } })}
        onLongPress={() => handleDelete(item.id)}
        activeOpacity={0.75}
      >
        <View style={[styles.iconWrap, { backgroundColor: (mode?.color ?? '#fff') + '22' }]}>
          <Text style={styles.icon}>{mode?.icon}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.modeLabel}>{mode?.label}</Text>
          <Text style={styles.preview}>{truncate(item.originalText, 80)}</Text>
          <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.items ?? []}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          data?.total ? (
            <Text style={styles.totalText}>{data.total} análises</Text>
          ) : null
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>Nenhuma análise ainda</Text>
              <Text style={styles.emptySubtitle}>
                Cole um texto na aba Início e clique em Simplificar
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: 16, gap: 10, flexGrow: 1 },
  totalText: { color: colors.textMuted, fontSize: 12, marginBottom: 4 },
  item: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 22 },
  content: { flex: 1, gap: 2 },
  modeLabel: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  preview: { color: colors.text, fontSize: 14, lineHeight: 20 },
  date: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  arrow: { color: colors.textMuted, fontSize: 22 },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 10 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  emptySubtitle: { color: colors.textMuted, fontSize: 14, textAlign: 'center', lineHeight: 22 },
});
