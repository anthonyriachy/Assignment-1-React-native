import React, { useState } from 'react';
import { Modal, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { BackArrow } from '../../atoms/BackArrow';
import { createStyles } from './FullScreenImageViewer.style';
import { useTheme } from '../../../hooks/UseTheme';
import DownloadIcon from '../../../assets/icons/download-minimalistic-svgrepo-com.svg';
import { FullScreenImageViewerProps } from './FullScreenImageViewer.type';
import { downloadImage } from '../../../lib/imageDownloadUtils';

export function FullScreenImageViewer({ visible, onClose, imageUrl }: FullScreenImageViewerProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      await downloadImage(imageUrl, {
        onSuccess: () => {
          Alert.alert('Success', 'Image downloaded successfully!');
        },
        onError: (error) => {
          Alert.alert('Error', error.message || 'Failed to download image. Please try again.');
        }
      });
    } catch (error) {
      // Error is already handled in the options
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <BackArrow onPress={onClose} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleDownload} 
            style={styles.downloadButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <DownloadIcon width={24} height={24} fill={colors.primary} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
} 