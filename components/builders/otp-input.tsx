import React, { useRef } from 'react';
import { View, TextInput } from 'react-native';

interface OTPInputProps {
  length?: number;
  value: string[];
  setValue: (val: string[]) => void;
  isValid: boolean | null;
  onComplete?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 4,
  value,
  setValue,
  isValid,
  onComplete,
}) => {
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...value];
    newOtp[index] = text;
    setValue(newOtp);

    if (text && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (newOtp.every((digit) => digit !== '')) {
      onComplete?.(newOtp.join(''));
    }
  };

  return (
    <View className="flex w-full flex-row justify-between gap-2">
      {Array.from({ length }).map((_, i) => {
        let borderColor = 'transparent';
        let textColor = '#FFFFFF';
        let bgColor = 'rgba(255,255,255,0.26)';

        if (value[i]) {
          borderColor = '#FFFFFF';
          textColor = '#FFFFFF';
        }

        if (isValid === true) {
          borderColor = '#F5882B';
          textColor = '#F5882B';
        } else if (isValid === false) {
          borderColor = '#FF4D4D';
          textColor = '#FF4D4D';
        }

        return (
          <TextInput
            key={i}
            ref={(ref) => {
              inputs.current[i] = ref!;
            }}
            selection={{ start: 0, end: 1 }}
            className="h-[90px] flex-1 rounded-xl border-2 text-center text-2xl font-bold"
            style={{
              borderColor,
              color: textColor,
              backgroundColor: bgColor,
            }}
            keyboardType="numeric"
            maxLength={1}
            value={value[i]}
            onChangeText={(text) => handleChange(text, i)}
          />
        );
      })}
    </View>
  );
};

export default OTPInput;
