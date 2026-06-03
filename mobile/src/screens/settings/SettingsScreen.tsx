import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/auth.store';
import { usePlan } from '../../hooks/usePlan';
import { colors } from '../../theme/colors';

interface MenuItemProps {
  label: string;
  onPress: () => void;
  color?: string;
  sublabel?: string;
}

function MenuItem({ label, onPress, color, sublabel }: MenuItemProps) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuItemLeft}>
        <Text style={[styles.menuLabel, color ? { color } : {}]}>{label}</Text>
        {sublabel ? <Text style={styles.menuSublabel}>{sublabel}</Text> : null}
      </View>
      <Text style={styles.menuArrow}>›</Text>
    </TouchableOpacity>
  );
}

export function SettingsScreen() {
  const navigation = useNavigation<any>();
  const { user, logout, plan } = useAuthStore();
  const { isPremium, dailyRemaining } = usePlan();

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() ?? '?'}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.planCard}>
        <View style={styles.planInfo}>
          <Text style={styles.planLabel}>
            {isPremium ? 'Plano Premium' : 'Plano Gratuito'}
          </Text>
          {!isPremium && (
            <Text style={styles.planSub}>{dailyRemaining} análises restantes hoje</Text>
          )}
          {isPremium && <Text style={styles.planSub}>Análises ilimitadas</Text>}
        </View>
        {!isPremium && (
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() => navigation.navigate('Premium')}
          >
            <Text style={styles.upgradeBtnText}>Upgrade</Text>
          </TouchableOpacity>
        )}
        {isPremium && (
          <View style={styles.proBadge}>
            <Text style={styles.proText}>PRO</Text>
          </View>
        )}
      </View>

      <View style={styles.menu}>
        <MenuItem
          label="Plano Premium"
          sublabel="Análises ilimitadas e sem anúncios"
          onPress={() => navigation.navigate('Premium')}
        />
        <MenuItem
          label="Meu histórico"
          sublabel="Ver análises anteriores"
          onPress={() => navigation.getParent()?.navigate('History')}
        />
        <MenuItem
          label="Sair da conta"
          onPress={handleLogout}
          color={colors.error}
        />
      </View>

      <Text style={styles.version}>Simplifica AI · v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 16, gap: 12 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 22, fontWeight: '700' },
  profileInfo: { gap: 2 },
  userName: { color: colors.text, fontSize: 17, fontWeight: '700' },
  userEmail: { color: colors.textMuted, fontSize: 13 },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  planInfo: { flex: 1, gap: 2 },
  planLabel: { color: colors.text, fontSize: 15, fontWeight: '700' },
  planSub: { color: colors.textMuted, fontSize: 12 },
  upgradeBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  upgradeBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
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
  menu: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  menuItemLeft: { flex: 1, gap: 2 },
  menuLabel: { color: colors.text, fontSize: 15 },
  menuSublabel: { color: colors.textMuted, fontSize: 12 },
  menuArrow: { color: colors.textMuted, fontSize: 22 },
  version: {
    color: colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 0.3,
  },
});
