import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { useApp } from '../../context/AppContext';

export default function SubmissionModal({
  visible,
  competitionId,
  onSubmit,
  onClose,
  existingSubmission,
}) {
  const { t, showToast } = useApp();
  const [title, setTitle] = useState(existingSubmission?.title || '');
  const [danceStyle, setDanceStyle] = useState(existingSubmission?.danceStyle || 'Kathak');
  const [videoUrl, setVideoUrl] = useState(
    existingSubmission?.videoUrl || 'https://drive.google.com/file/d/feedants_kathak_demo/view'
  );
  const [notes, setNotes] = useState(existingSubmission?.notes || '');
  const [selectedFileName, setSelectedFileName] = useState(
    existingSubmission?.fileName || 'kathak_performance_final.mp4'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const danceStyles = ['Kathak', 'Bharatanatyam', 'Odissi', 'Mohiniyattam', 'Other'];

  const handleSimulateFilePick = () => {
    const sampleFiles = [
      'kathak_teentaal_manju_tribute.mp4 (48.2 MB)',
      'bharatanatyam_alarippu_recital.mov (62.1 MB)',
      'odissi_mangalacharan_solo.mp4 (54.0 MB)',
    ];
    const picked = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    setSelectedFileName(picked);
    setVideoUrl(`https://storage.feedants.com/submissions/${picked.split(' ')[0]}`);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      setErrorMsg('Please enter a performance title.');
      return;
    }
    if (!videoUrl.trim() && !selectedFileName) {
      setErrorMsg('Please provide a video link or choose a video file.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        danceStyle,
        videoUrl: videoUrl.trim(),
        notes: notes.trim(),
        fileName: selectedFileName,
        fileSize: 48500000,
      });
      showToast(t('submissionSuccess'));
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{t('uploadSubmission')}</Text>
              <Text style={styles.subtitle}>Feedants Classical Dance Competition</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {errorMsg ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color="#EF4444" />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* Performance Title */}
            <View style={styles.field}>
              <Text style={styles.label}>Performance Title *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Kathak Tarana in Teentaal"
                value={title}
                onChangeText={setTitle}
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Dance Form Selector */}
            <View style={styles.field}>
              <Text style={styles.label}>Classical Dance Style</Text>
              <View style={styles.styleSelector}>
                {danceStyles.map((style) => (
                  <TouchableOpacity
                    key={style}
                    style={[
                      styles.stylePill,
                      danceStyle === style && styles.stylePillActive,
                    ]}
                    onPress={() => setDanceStyle(style)}
                  >
                    <Text
                      style={[
                        styles.styleText,
                        danceStyle === style && styles.styleTextActive,
                      ]}
                    >
                      {style}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Video File Picker Simulation */}
            <View style={styles.field}>
              <Text style={styles.label}>Select Video File</Text>
              <TouchableOpacity
                style={styles.filePickerBtn}
                onPress={handleSimulateFilePick}
                activeOpacity={0.7}
              >
                <Feather name="upload-cloud" size={20} color={theme.colors.primary} />
                <Text style={styles.filePickerText}>
                  {selectedFileName ? selectedFileName : 'Browse video file (.mp4, .mov)'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.hintText}>Max duration: 3 minutes. Supported: MP4, MOV up to 100MB</Text>
            </View>

            {/* Video Link */}
            <View style={styles.field}>
              <Text style={styles.label}>Or Paste Cloud Video Link (Google Drive, YouTube)</Text>
              <TextInput
                style={styles.input}
                placeholder="https://drive.google.com/..."
                value={videoUrl}
                onChangeText={setVideoUrl}
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Notes */}
            <View style={styles.field}>
              <Text style={styles.label}>Performance Notes / Description (Optional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Share any context about the choreography, taal, or gharana..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                placeholderTextColor="#94A3B8"
              />
            </View>
          </ScrollView>

          {/* Footer Submit CTA */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={handleSubmit}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.submitBtnText}>Submit Entry For Judging</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 16,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 8,
    gap: 8,
    marginBottom: 12,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  styleSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  stylePill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  stylePillActive: {
    backgroundColor: theme.colors.primaryDark,
  },
  styleText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#475569',
  },
  styleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  filePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#E8F7F5',
    borderWidth: 1,
    borderColor: '#B2DFDB',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 14,
    justifyContent: 'center',
  },
  filePickerText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  hintText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  submitBtn: {
    backgroundColor: theme.colors.primaryDark,
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
