import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { brand } from '@/constants/Colors';

interface Workshop {
  id: string;
  name: string;
  category: string;
  emoji: string;
  memberCount: number;
  maxMembers: number;
  activeProject: string;
  description: string;
  color: string;
  joined: boolean;
}

const MOCK_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    name: 'Weekend Ceramics',
    category: 'Ceramics',
    emoji: '🏺',
    memberCount: 12,
    maxMembers: 15,
    activeProject: 'Raku firing techniques',
    description: 'A small group of weekend potters exploring wheel throwing, hand building, and glazing.',
    color: '#C2785C',
    joined: true,
  },
  {
    id: '2',
    name: 'Sourdough Starters',
    category: 'Baking',
    emoji: '🍞',
    memberCount: 18,
    maxMembers: 20,
    activeProject: 'Perfect scoring patterns',
    description: 'From feeding your starter to scoring your loaves. All skill levels welcome.',
    color: '#C4883A',
    joined: false,
  },
  {
    id: '3',
    name: 'Woodworking 101',
    category: 'Woodworking',
    emoji: '🪚',
    memberCount: 8,
    maxMembers: 12,
    activeProject: 'Dovetail joint practice',
    description: 'Learn the fundamentals of hand tool woodworking. Currently working through basic joinery.',
    color: '#8B6F47',
    joined: false,
  },
  {
    id: '4',
    name: 'Watercolor Wednesdays',
    category: 'Art',
    emoji: '🎨',
    memberCount: 14,
    maxMembers: 16,
    activeProject: 'Urban sketching challenge',
    description: 'Weekly watercolor sessions with prompts and feedback. We paint together on Wednesdays.',
    color: '#4A7BA7',
    joined: true,
  },
  {
    id: '5',
    name: 'Knit & Purl Club',
    category: 'Knitting',
    emoji: '🧶',
    memberCount: 9,
    maxMembers: 15,
    activeProject: 'Cable knit beanie',
    description: 'Cozy knitting circle for all levels. Share patterns, ask questions, show your WIPs.',
    color: '#9B6B8E',
    joined: false,
  },
  {
    id: '6',
    name: 'Fermentation Lab',
    category: 'Cooking',
    emoji: '🫙',
    memberCount: 11,
    maxMembers: 15,
    activeProject: 'Kimchi variations',
    description: 'Exploring the world of fermented foods: kombucha, kimchi, miso, tempeh, and more.',
    color: '#D4763A',
    joined: false,
  },
];

export default function WorkshopsScreen() {
  const [workshops, setWorkshops] = useState(MOCK_WORKSHOPS);

  const toggleJoin = (id: string) => {
    setWorkshops((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              joined: !w.joined,
              memberCount: w.joined ? w.memberCount - 1 : w.memberCount + 1,
            }
          : w
      )
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerSubtitle}>
          Small groups of makers learning together. Join a workshop to collaborate on projects.
        </Text>
      </View>

      {/* Workshop cards */}
      {workshops.map((workshop) => (
        <View key={workshop.id} style={styles.card}>
          <View style={styles.cardTop}>
            <View style={[styles.emojiCircle, { backgroundColor: workshop.color + '18' }]}>
              <Text style={styles.emoji}>{workshop.emoji}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.workshopName}>{workshop.name}</Text>
              <View style={styles.metaRow}>
                <View style={[styles.categoryBadge, { backgroundColor: workshop.color + '18' }]}>
                  <Text style={[styles.categoryText, { color: workshop.color }]}>
                    {workshop.category}
                  </Text>
                </View>
                <Ionicons name="people" size={14} color={brand.textSecondary} />
                <Text style={styles.memberCount}>
                  {workshop.memberCount}/{workshop.maxMembers}
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.workshopDescription}>{workshop.description}</Text>

          {/* Active project */}
          <View style={styles.activeProject}>
            <Ionicons name="construct-outline" size={14} color={brand.orange} />
            <Text style={styles.activeProjectLabel}>Active project:</Text>
            <Text style={styles.activeProjectName}>{workshop.activeProject}</Text>
          </View>

          {/* Join / Joined button */}
          <TouchableOpacity
            style={[styles.joinButton, workshop.joined && styles.joinedButton]}
            onPress={() => toggleJoin(workshop.id)}
            activeOpacity={0.7}
          >
            {workshop.joined ? (
              <>
                <Ionicons name="checkmark-circle" size={18} color={brand.success} />
                <Text style={styles.joinedText}>Joined</Text>
              </>
            ) : (
              <>
                <Ionicons name="add-circle-outline" size={18} color={brand.white} />
                <Text style={styles.joinText}>Join Workshop</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>More workshops coming soon</Text>
        <Text style={styles.footerSubtext}>
          Want to start one? Tap the + button to propose a new workshop.
        </Text>
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
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
  },
  headerSubtitle: {
    fontSize: 14,
    color: brand.textSecondary,
    lineHeight: 20,
  },
  card: {
    backgroundColor: brand.white,
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  cardInfo: {
    marginLeft: 12,
    flex: 1,
  },
  workshopName: {
    fontSize: 17,
    fontWeight: '700',
    color: brand.dark,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
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
  memberCount: {
    fontSize: 12,
    color: brand.textSecondary,
    fontWeight: '500',
  },
  workshopDescription: {
    fontSize: 14,
    color: brand.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  activeProject: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.lightOrange,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 14,
    gap: 6,
  },
  activeProjectLabel: {
    fontSize: 13,
    color: brand.textSecondary,
    fontWeight: '500',
  },
  activeProjectName: {
    fontSize: 13,
    color: brand.orange,
    fontWeight: '700',
    flex: 1,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brand.orange,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },
  joinedButton: {
    backgroundColor: brand.success + '12',
    borderWidth: 1.5,
    borderColor: brand.success + '30',
  },
  joinText: {
    fontSize: 15,
    fontWeight: '700',
    color: brand.white,
  },
  joinedText: {
    fontSize: 15,
    fontWeight: '700',
    color: brand.success,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 40,
  },
  footerText: {
    fontSize: 15,
    fontWeight: '600',
    color: brand.textSecondary,
  },
  footerSubtext: {
    fontSize: 13,
    color: brand.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});
