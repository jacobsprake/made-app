import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { brand } from '@/constants/Colors';

const { width } = Dimensions.get('window');

type Reaction = 'inspired' | 'teach' | 'together';

interface Creation {
  id: string;
  maker: string;
  avatar: string;
  category: string;
  title: string;
  description: string;
  timeAgo: string;
  imageColor: string;
  imageEmoji: string;
  reactions: { inspired: number; teach: number; together: number };
}

const MOCK_FEED: Creation[] = [
  {
    id: '1',
    maker: 'Sarah Chen',
    avatar: 'SC',
    category: 'Ceramics',
    title: 'Morning tea bowl',
    description: 'Wheel-thrown with a celadon glaze. Third attempt and finally got the shape right.',
    timeAgo: '2h ago',
    imageColor: '#D4A574',
    imageEmoji: '🍵',
    reactions: { inspired: 24, teach: 8, together: 3 },
  },
  {
    id: '2',
    maker: 'Marcus Rivera',
    avatar: 'MR',
    category: 'Woodworking',
    title: 'Walnut cutting board',
    description: 'End-grain walnut with maple accents. Finished with food-safe mineral oil.',
    timeAgo: '4h ago',
    imageColor: '#8B6F47',
    imageEmoji: '🪵',
    reactions: { inspired: 41, teach: 15, together: 7 },
  },
  {
    id: '3',
    maker: 'Yuki Tanaka',
    avatar: 'YT',
    category: 'Cooking',
    title: 'Homemade udon from scratch',
    description: 'Hand-pulled udon noodles with dashi broth. The kneading took forever but so worth it.',
    timeAgo: '5h ago',
    imageColor: '#F5E6D3',
    imageEmoji: '🍜',
    reactions: { inspired: 67, teach: 32, together: 12 },
  },
  {
    id: '4',
    maker: 'Emma Johansson',
    avatar: 'EJ',
    category: 'Knitting',
    title: 'Cable knit scarf',
    description: 'Merino wool in oatmeal. Took about 3 weeks of evening knitting sessions.',
    timeAgo: '8h ago',
    imageColor: '#E8DDD0',
    imageEmoji: '🧶',
    reactions: { inspired: 35, teach: 19, together: 5 },
  },
  {
    id: '5',
    maker: 'Diego Morales',
    avatar: 'DM',
    category: 'Art',
    title: 'Watercolor study - morning light',
    description: 'Painted from my balcony this morning. Working on capturing light through wet-on-wet.',
    timeAgo: '12h ago',
    imageColor: '#B8D4E3',
    imageEmoji: '🎨',
    reactions: { inspired: 89, teach: 11, together: 2 },
  },
  {
    id: '6',
    maker: 'Priya Patel',
    avatar: 'PP',
    category: 'Baking',
    title: 'Sourdough boule',
    description: 'Fed my starter for 2 weeks to get it active enough. The ear came out perfect!',
    timeAgo: '1d ago',
    imageColor: '#D4A060',
    imageEmoji: '🍞',
    reactions: { inspired: 112, teach: 45, together: 18 },
  },
  {
    id: '7',
    maker: "Liam O'Brien",
    avatar: 'LO',
    category: 'Metalwork',
    title: 'Forged bottle opener',
    description: 'My first real forging project. Railroad spike + coal forge + lots of hammering.',
    timeAgo: '1d ago',
    imageColor: '#4A4A4A',
    imageEmoji: '🔨',
    reactions: { inspired: 56, teach: 28, together: 9 },
  },
  {
    id: '8',
    maker: 'Aisha Mohammed',
    avatar: 'AM',
    category: 'Sewing',
    title: 'Linen tote bag',
    description: 'Japanese-style with sashiko stitching detail. Natural linen with indigo thread.',
    timeAgo: '2d ago',
    imageColor: '#C5B8A5',
    imageEmoji: '🪡',
    reactions: { inspired: 43, teach: 21, together: 6 },
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Ceramics: '#C2785C',
  Woodworking: '#8B6F47',
  Cooking: '#D4763A',
  Knitting: '#9B6B8E',
  Art: '#4A7BA7',
  Baking: '#C4883A',
  Metalwork: '#5A5A5A',
  Sewing: '#7B8B6F',
};

function ReactionButton({
  icon,
  count,
  active,
  onPress,
}: {
  icon: string;
  label: string;
  count: number;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.reactionButton, active && styles.reactionButtonActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.reactionIcon}>{icon}</Text>
      <Text style={[styles.reactionCount, active && styles.reactionCountActive]}>
        {count}
      </Text>
    </TouchableOpacity>
  );
}

export default function FeedScreen() {
  const [activeReactions, setActiveReactions] = useState<
    Record<string, Reaction | null>
  >({});

  const toggleReaction = (postId: string, reaction: Reaction) => {
    setActiveReactions((prev) => ({
      ...prev,
      [postId]: prev[postId] === reaction ? null : reaction,
    }));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {MOCK_FEED.map((post) => (
        <View key={post.id} style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{post.avatar}</Text>
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.makerName}>{post.maker}</Text>
              <View style={styles.metaRow}>
                <View
                  style={[
                    styles.categoryBadge,
                    { backgroundColor: (CATEGORY_COLORS[post.category] || brand.orange) + '18' },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { color: CATEGORY_COLORS[post.category] || brand.orange },
                    ]}
                  >
                    {post.category}
                  </Text>
                </View>
                <Text style={styles.timeAgo}>{post.timeAgo}</Text>
              </View>
            </View>
          </View>

          {/* Image placeholder */}
          <View style={[styles.imagePlaceholder, { backgroundColor: post.imageColor }]}>
            <Text style={styles.imageEmoji}>{post.imageEmoji}</Text>
          </View>

          {/* Content */}
          <View style={styles.cardContent}>
            <Text style={styles.creationTitle}>{post.title}</Text>
            <Text style={styles.creationDescription}>{post.description}</Text>
          </View>

          {/* Reactions */}
          <View style={styles.reactionsRow}>
            <ReactionButton
              icon="💡"
              label="Inspired me"
              count={
                post.reactions.inspired +
                (activeReactions[post.id] === 'inspired' ? 1 : 0)
              }
              active={activeReactions[post.id] === 'inspired'}
              onPress={() => toggleReaction(post.id, 'inspired')}
            />
            <ReactionButton
              icon="📖"
              label="Teach me"
              count={
                post.reactions.teach +
                (activeReactions[post.id] === 'teach' ? 1 : 0)
              }
              active={activeReactions[post.id] === 'teach'}
              onPress={() => toggleReaction(post.id, 'teach')}
            />
            <ReactionButton
              icon="🤝"
              label="Let's make"
              count={
                post.reactions.together +
                (activeReactions[post.id] === 'together' ? 1 : 0)
              }
              active={activeReactions[post.id] === 'together'}
              onPress={() => toggleReaction(post.id, 'together')}
            />
          </View>
        </View>
      ))}

      <View style={styles.feedEnd}>
        <Text style={styles.feedEndText}>You're all caught up!</Text>
        <Text style={styles.feedEndSubtext}>Go make something.</Text>
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
    paddingTop: 8,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: brand.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    paddingBottom: 10,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: brand.lightOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: brand.orange,
  },
  headerInfo: {
    marginLeft: 10,
    flex: 1,
  },
  makerName: {
    fontSize: 15,
    fontWeight: '700',
    color: brand.dark,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeAgo: {
    fontSize: 12,
    color: brand.textSecondary,
    marginLeft: 8,
  },
  imagePlaceholder: {
    width: '100%',
    height: width - 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmoji: {
    fontSize: 80,
  },
  cardContent: {
    padding: 14,
    paddingBottom: 8,
  },
  creationTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: brand.dark,
    marginBottom: 4,
  },
  creationDescription: {
    fontSize: 14,
    color: brand.textSecondary,
    lineHeight: 20,
  },
  reactionsRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 12,
    gap: 6,
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.background,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  reactionButtonActive: {
    backgroundColor: brand.lightOrange,
  },
  reactionIcon: {
    fontSize: 16,
  },
  reactionCount: {
    fontSize: 13,
    fontWeight: '600',
    color: brand.textSecondary,
  },
  reactionCountActive: {
    color: brand.orange,
  },
  feedEnd: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  feedEndText: {
    fontSize: 16,
    fontWeight: '600',
    color: brand.textSecondary,
  },
  feedEndSubtext: {
    fontSize: 14,
    color: brand.orange,
    fontWeight: '600',
    marginTop: 4,
  },
});
