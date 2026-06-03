import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AnalysisMode } from '../../types/analysis.types';
import { HomeStackParamList } from '../../types/navigation.types';
import { ModeSelector } from '../../components/analysis/ModeSelector';
import { Button } from '../../components/common/Button';
import { BannerAd } from '../../components/ads/BannerAd';
import { useAnalysis } from '../../hooks/useAnalysis';
import { usePlan } from '../../hooks/usePlan';
import { colors } from '../../theme/colors';
import { useAuthStore } from '../../store/auth.store';
import { MAX_TEXT_LENGTH } from '../../constants/limits';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const [text, setText] = useState('');
  const [mode, setMode] = useState<AnalysisMode>('CHILD');
  const { mutateAsync, isPending } = useAnalysis();
  const { canAnalyze, dailyRemaining, isPremium } = usePlan();
  const user = useAuthStore((s) => s.user);

  const handleAnalyze = async () => {
    if (text.trim().length < 10) {
      Alert.alert('Texto muito curto', 'Cole um texto com pelo menos 10 caracteres.');
      return;
    }
    if (!canAnalyze) {
      Alert.alert(
        'Limite diário atingido',
        'Você usou suas 5 análises gratuitas de hoje. Faça upgrade para continuar.',
        [
          { text: 'Agora não', style: 'cancel' },
          { text: 'Ver Premium', onPress: () => navigation.navigate('Premium') },
        ]
      );
      return;
    }
    try {
      const result = await mutateAsync({ text: text.trim(), mode });
      navigation.navigate('Result', { analysis: result.analysis });
    } catch (error: any) {
      const msg = error.response?.data?.error ?? 'Erro ao analisar. Tente novamente.';
      if (error.response?.status === 429) {
        Alert.alert('Limite atingido', msg, [
          { text: 'OK' },
          { text: 'Premium', onPress: () => navigation.navigate('Premium') },
        ]);
      } else {
        Alert.alert('Erro', msg);
      }
    }
  };

  const handlePremiumPress = () => {
    Alert.alert(
      'Funcionalidade Premium',
      '"O que está escondido?" revela segredos que contratos e termos tentam ocultar. Disponível apenas no plano Premium.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Assinar Premium', onPress: () => navigation.navigate('Premium') },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <BannerAd position="top" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Olá, {user?.name?.split(' ')[0] ?? 'usuário'}
          </Text>
          {!isPremium && (
            <TouchableOpacity onPress={() => navigation.navigate('Premium')}>
              <Text style={styles.remaining}>{dailyRemaining} restantes</Text>
            </TouchableOpacity>
          )}
          {isPremium && (
            <View style={styles.proBadge}>
              <Text style={styles.proText}>PRO</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Texto para analisar</Text>
          <TextInput
            style={styles.textInput}
            multiline
            scrollEnabled
            placeholder="Contratos, termos de uso, e-mails corporativos, artigos científicos..."
            placeholderTextColor={colors.textMuted}
            value={text}
            onChangeText={(t) => t.length <= MAX_TEXT_LENGTH && setText(t)}
            textAlignVertical="top"
          />
          <Text
            style={[
              styles.charCount,
              text.length > MAX_TEXT_LENGTH * 0.9 && { color: colors.warning },
            ]}
          >
            {text.length.toLocaleString('pt-BR')}/{MAX_TEXT_LENGTH.toLocaleString('pt-BR')}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Modo de análise</Text>
        </View>
        <ModeSelector
          selected={mode}
          onChange={setMode}
          onPremiumPress={handlePremiumPress}
        />

        <Button
          label={isPending ? 'Analisando...' : 'Simplificar texto'}
          onPress={handleAnalyze}
          loading={isPending}
          disabled={text.trim().length < 10}
          style={styles.button}
        />
      </ScrollView>

      <BannerAd position="bottom" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { padding: 16, gap: 16, paddingBottom: 32 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  remaining: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  proBadge: {
    backgroundColor: '#C9A22720',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#C9A22740',
  },
  proText: {
    color: '#C9A227',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  section: { gap: 8 },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    color: colors.text,
    fontSize: 15,
    lineHeight: 24,
    minHeight: 120,
    maxHeight: 180,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  charCount: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'right',
  },
  button: { marginTop: 4 },
});
