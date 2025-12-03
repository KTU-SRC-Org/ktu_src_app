import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Animated,
  Pressable,
  Text,
} from 'react-native';

const { height, width } = Dimensions.get('window');

interface FormModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fullScreen?: boolean;
  showCloseButton?: boolean;
  animationType?: 'slide' | 'fade' | 'none';
  heightRatio?: number; // between 0–1
  closeOnTouchOutside?: boolean;
  onSave: () => void;
  title?: string;
  disabledSave?: boolean
}

const EditModal = ({
  visible,
  onClose,
  children,
  fullScreen = false,
  animationType = 'slide',
  heightRatio = 0.8,
  closeOnTouchOutside = false,
  onSave,
  title,
  disabledSave = true
}: FormModalProps) => {
  const modalHeight = fullScreen ? height : height * heightRatio;

  return (
    <Modal visible={visible} animationType={animationType} transparent onRequestClose={onClose}>
      <View style={styles.centered}>
        <TouchableWithoutFeedback onPress={closeOnTouchOutside ? onClose : undefined}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            styles.container,
            {
              height: modalHeight,
              borderTopLeftRadius: fullScreen ? 0 : 12,
              borderTopRightRadius: fullScreen ? 0 : 12,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              top: fullScreen ? 0 : undefined,
              bottom: fullScreen ? undefined : 0,
            },
          ]}>
          <View className={'flex-row items-center justify-between px-4 py-6 mb-6'}>
            <Pressable onPress={onClose}>
              <Text className={"text-base text-red-600"}>Cancel</Text>
            </Pressable>

            {title ? (
              <View><Text className={"text-base"}>{title}</Text></View>
            ): <View/>}

            <Pressable onPress={onSave} disabled={disabledSave}>
              <Text  className={ disabledSave ? "text-base text-gray-300" : "text-base text-blue-600"}>
                Save
              </Text>
            </Pressable>
          </View>

          <View style={styles.content}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    overflow: 'hidden',
  },
  closeRow: {
    paddingVertical: height * 0.03,
    paddingHorizontal: width * 0.04,
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
