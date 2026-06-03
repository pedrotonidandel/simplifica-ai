import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../../store/auth.store';
import { colors } from '../../theme/colors';

// Para produção, instale e importe:
// import { BannerAd as RNBannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
// const AD_UNIT_ID = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-XXXXXXXX/XXXXXXXXXX';

interface Props {
  position?: 'top' | 'bottom';
}

export function BannerAd({ position = 'bottom' }: Props) {
  const plan = useAuthStore((s) => s.plan);

  if (plan === 'PREMIUM') return null;

  // Substitua pelo componente real quando integrar AdMob:
  // return (
  //   <RNBannerAd
  //     unitId={AD_UNIT_ID}
  //     size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
  //     requestOptions={{ requestNonPersonalizedAdsOnly: true }}
  //   />
  // );

  return (
    <View style={[styles.container, position === 'top' ? styles.top : styles.bottom]}>
      <Text style={styles.text}>Anúncio · Assine Premium para remover</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    backgroundColor: colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: { borderBottomWidth: 1, borderColor: colors.border },
  bottom: { borderTopWidth: 1, borderColor: colors.border },
  text: { color: colors.textMuted, fontSize: 12 },
});
