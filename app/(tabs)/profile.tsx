import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { brand } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const GRID_GAP = 3;
const GRID_COLS = 3;
const GRID_ITEM_SIZE = (width - GRID_GAP * (GRID_COLS - 1)) / GRID_COLS;

interface UserCreation {
  id: string;
  title: string;
  category: string;
  emoji: string;
  color: string;
  daysAgo: number;
}

const MY_CREATIONS: UserCreation[] = [
  { id: '1', title: 'Sourdough boule', category: 'Baking', emoji: '🍞', color: '#D4A060', daysAgo: 1 },
  { id: '2', title: 'Ceramic mug', category: 'Ceramics', emoji: '☕', color: '#C2785C', daysAgo: 3 },
  { id: '3', title: 'Pasta from scratch', category: 'Cooking', emoji: '🍝', color: '#F5E6D3', daysAgo: 5 },
  { id: '4', title: 'Watercolor sunset', category: 'Art', emoji: '🌅', color: '#E8A87C', daysAgo: 7 },
  { id: '5', title: 'Knitted hat', category: 'Knitting', emoji: '🧢', color: '#9B6B8E', daysAgo: 10 },
  { id: '6', title: 'Wooden spoon', category: 'Woodworking', emoji: '🥄', color: '#8B6F47', daysAgo: 14 },
  { id: '7', title: 'Lemon tart', category: 'Baking', emoji: '🍋', color: '#F5D76E', daysAgo: 18 },
  { id: '8', title: 'Macrame hanger', category: 'Crafts', emoji: '🪴', color: '#C5B8A5', daysAgo: 21 },
  { id: '9', title: 'Ramen from scratch', category: 'Cooking', emoji: '🍜', color: '#F5E6D3', daysAgo: 25 },
];

const STATS = {
  creations: MY_CREATIONS.length,
  workshops: 2,
  inspired: 347,
};

export default function ProfileScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>YO</Text>
        </View>
        <Text style={styles.displayName}>You</Text>
        <Text style={styles.bio}>Making things with my hands, one project at a time.</Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{STATS.creations}</Text>
          <Text style={styles.statLabel}>Creations</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{STATS.workshops}</Text>
          <Text style={styles.statLabel}>Workshops</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <View style={styles.inspiredStat}>
            <Ionicons name="bulb" size={16} color={brand.orange} />
            <Text style={styles.statNumber}>{STATS.inspired}</Text>
          </View>
          <Text style={styles.statLabel}>Inspired</Text>
        </View>
      </View>

      {/* Creations grid */}
      <View style={styles.gridHeader}>
        <Ionicons name="grid-outline" size={18} color={brand.dark} />
        <Text style={styles.gridHeaderText}>Your Creations</Text>
      </View>

      <View style={styles.grid}>
        {MY_CREATIONS.map((creation) => (
          <View
            key={creation.id}
            style={[styles.gridItem, { backgroundColor: creation.color }]}
          >
            <Text style={styles.gridEmoji}>{creation.emoji}</Text>
            <Text style={styles.gridTitle} numberOfLines={1}>
              {creation.title}
            </Text>
          </View>
        ))}
      </View>

      {/* Maker since */}
      <View style={styles.makerSince}>
        <Ionicons name="heart" size={16} color={brand.orange} />
        <Text style={styles.makerSinceText}>Making things since March 2026</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 40,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: brand.lightOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: brand.orange + '30',
  },
  avatarLargeText: {
    fontSize: 28,
    fontWeight: '800',
    color: brand.orange,
  },
  displayName: {
    fontSize: 22,
    fontWeight: '800',
    color: brand.dark,
  },
  bio: {
    fontSize: 14,
    color: brand.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    backgroundColor: brand.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 8,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: brand.dark,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: brand.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: brand.border,
  },
  inspiredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 6,
  },
  gridHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: brand.dark,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  gridItem: {
    width: GRID_ITEM_SIZE,
    height: GRID_ITEM_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridEmoji: {
    fontSize: 40,
  },
  gridTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
    paddingHorizontal: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  makerSince: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    gap: 6,
  },
  makerSinceText: {
    fontSize: 13,
    color: brand.textSecondary,
    fontWeight: '500',
  },
});
