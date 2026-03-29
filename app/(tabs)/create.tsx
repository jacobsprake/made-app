import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { brand } from '@/constants/Colors';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { label: 'Cooking', emoji: '🍳' },
  { label: 'Baking', emoji: '🍞' },
  { label: 'Ceramics', emoji: '🍵' },
  { label: 'Woodworking', emoji: '🪵' },
  { label: 'Knitting', emoji: '🧶' },
  { label: 'Sewing', emoji: '🪡' },
  { label: 'Art', emoji: '🎨' },
  { label: 'Metalwork', emoji: '🔨' },
  { label: 'Gardening', emoji: '🌱' },
  { label: 'Jewelry', emoji: '💍' },
  { label: 'Leather', emoji: '👜' },
  { label: 'Other', emoji: '✨' },
];

export default function CreateScreen() {
  const [captured, setCaptured] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCapture = () => {
    setCaptured(true);
  };

  const handleRetake = () => {
    setCaptured(false);
    setTitle('');
    setDescription('');
    setSelectedCategory(null);
  };

  const handleShare = () => {
    // In a real app, this would upload the creation
    alert('Creation shared! 🎉');
    handleRetake();
  };

  if (!captured) {
    return (
      <View style={styles.cameraContainer}>
        {/* Camera viewfinder mockup */}
        <View style={styles.viewfinder}>
          <View style={styles.viewfinderInner}>
            {/* Corner brackets */}
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Center content */}
            <View style={styles.cameraPrompt}>
              <Ionicons name="camera" size={48} color="rgba(255,255,255,0.6)" />
              <Text style={styles.cameraPromptText}>
                Point at what you made
              </Text>
              <Text style={styles.cameraPromptSubtext}>
                Only things you made with your hands
              </Text>
            </View>
          </View>

          {/* Grid overlay */}
          <View style={styles.gridOverlay}>
            <View style={[styles.gridLine, styles.gridLineH1]} />
            <View style={[styles.gridLine, styles.gridLineH2]} />
            <View style={[styles.gridLine, styles.gridLineV1]} />
            <View style={[styles.gridLine, styles.gridLineV2]} />
          </View>
        </View>

        {/* Bottom controls */}
        <View style={styles.cameraControls}>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.flashButton}>
              <Ionicons name="flash-off" size={24} color={brand.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
              activeOpacity={0.8}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.flipButton}>
              <Ionicons name="camera-reverse-outline" size={24} color={brand.white} />
            </TouchableOpacity>
          </View>

          <Text style={styles.cameraHint}>
            No photo library — capture it now, fresh from your hands
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Captured image placeholder */}
        <View style={styles.capturedImage}>
          <Text style={styles.capturedEmoji}>📸</Text>
          <Text style={styles.capturedText}>Photo captured!</Text>
          <TouchableOpacity onPress={handleRetake} style={styles.retakeButton}>
            <Ionicons name="refresh" size={16} color={brand.orange} />
            <Text style={styles.retakeText}>Retake</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>What did you make?</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="e.g., Sourdough boule, Ceramic mug..."
            placeholderTextColor="#B0B0B0"
            value={title}
            onChangeText={setTitle}
            maxLength={60}
          />
        </View>

        {/* Category */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Category</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.label}
                style={[
                  styles.categoryChip,
                  selectedCategory === cat.label && styles.categoryChipSelected,
                ]}
                onPress={() => setSelectedCategory(cat.label)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryChipEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.categoryChipText,
                    selectedCategory === cat.label && styles.categoryChipTextSelected,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Description */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>The process (optional)</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Tell us how you made it, what materials you used, what you learned..."
            placeholderTextColor="#B0B0B0"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.charCount}>{description.length}/500</Text>
        </View>

        {/* Share button */}
        <TouchableOpacity
          style={[
            styles.shareButton,
            (!title || !selectedCategory) && styles.shareButtonDisabled,
          ]}
          onPress={handleShare}
          disabled={!title || !selectedCategory}
          activeOpacity={0.8}
        >
          <Ionicons name="sparkles" size={20} color={brand.white} />
          <Text style={styles.shareButtonText}>Share Creation</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brand.background,
  },
  // Camera view
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  viewfinder: {
    flex: 1,
    position: 'relative',
  },
  viewfinderInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  corner: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderColor: brand.orange,
  },
  cornerTL: {
    top: 40,
    left: 24,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: 40,
    right: 24,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: 24,
    left: 24,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: 24,
    right: 24,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 8,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  gridLineH1: {
    left: 24,
    right: 24,
    top: '33%',
    height: 1,
  },
  gridLineH2: {
    left: 24,
    right: 24,
    top: '66%',
    height: 1,
  },
  gridLineV1: {
    top: 40,
    bottom: 24,
    left: '33%',
    width: 1,
  },
  gridLineV2: {
    top: 40,
    bottom: 24,
    left: '66%',
    width: 1,
  },
  cameraPrompt: {
    alignItems: 'center',
    gap: 8,
  },
  cameraPromptText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  cameraPromptSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  cameraControls: {
    paddingBottom: Platform.OS === 'ios' ? 44 : 24,
    paddingTop: 20,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
  },
  flashButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: brand.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: brand.orange,
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraHint: {
    marginTop: 16,
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  // Form view
  formScroll: {
    flex: 1,
  },
  formContent: {
    padding: 16,
    paddingBottom: 48,
  },
  capturedImage: {
    backgroundColor: '#2A2A2A',
    height: 240,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  capturedEmoji: {
    fontSize: 48,
  },
  capturedText: {
    fontSize: 16,
    fontWeight: '600',
    color: brand.white,
    marginTop: 8,
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(232,93,58,0.15)',
    borderRadius: 20,
  },
  retakeText: {
    fontSize: 14,
    fontWeight: '600',
    color: brand.orange,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: brand.dark,
    marginBottom: 8,
  },
  titleInput: {
    backgroundColor: brand.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: brand.dark,
    borderWidth: 1,
    borderColor: brand.border,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: brand.white,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: brand.border,
    gap: 4,
  },
  categoryChipSelected: {
    borderColor: brand.orange,
    backgroundColor: brand.lightOrange,
  },
  categoryChipEmoji: {
    fontSize: 16,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: brand.textSecondary,
  },
  categoryChipTextSelected: {
    color: brand.orange,
  },
  descriptionInput: {
    backgroundColor: brand.white,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: brand.dark,
    borderWidth: 1,
    borderColor: brand.border,
    minHeight: 100,
  },
  charCount: {
    fontSize: 12,
    color: brand.textSecondary,
    textAlign: 'right',
    marginTop: 4,
  },
  shareButton: {
    backgroundColor: brand.orange,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 14,
    gap: 8,
    marginTop: 8,
  },
  shareButtonDisabled: {
    opacity: 0.4,
  },
  shareButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: brand.white,
  },
});
