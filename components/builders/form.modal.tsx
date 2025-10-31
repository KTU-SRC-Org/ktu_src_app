import {
  Modal,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface FormModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
  showCloseButton?: boolean;
  animationType?: 'slide' | 'fade' | 'none';
  heightRatio?: number; // between 0–1
  closeOnTouchOutside?: boolean;
}

const FormModal = ({
  visible,
  onClose,
  children,
  fullScreen = false,
  showCloseButton = true,
  animationType = 'slide',
  heightRatio = 0.7,
  closeOnTouchOutside = false,
}: FormModalProps) => {
  const modalHeight = fullScreen ? height : height * heightRatio;

  return (
    <Modal visible={visible} animationType={animationType} transparent onRequestClose={onClose}>
      <View style={styles.centered}>
        {closeOnTouchOutside && (
          <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.background} />
          </TouchableWithoutFeedback>
        )}

        <Animated.View
          style={[
            styles.container,
            {
              height: modalHeight,
              borderRadius: fullScreen ? 0 : 16,
              top: fullScreen ? 0 : undefined,
              bottom: fullScreen ? undefined : 0,
            },
          ]}>
          {showCloseButton && (
            <View style={styles.closeRow}>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Ionicons name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  closeRow: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
