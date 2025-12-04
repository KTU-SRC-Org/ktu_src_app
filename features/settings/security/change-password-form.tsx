import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInputField } from '@/components/builders/text-input-field';
import { AuthButton } from '@/components/shared/auth-button';
import { ChangePasswordFormType, ChangePasswordSchema } from '@/lib/schemas/settings';

const STEPS = {
  OLD: 'OLD',
  NEW: 'NEW',
} as const;

interface ChangePasswordProps {
  onSubmit: () => void;
  setCanSave: Dispatch<SetStateAction<boolean>>;
}

const passwordLength = 8;

const ChangePasswordForm = forwardRef(({ onSubmit, setCanSave }: ChangePasswordProps, ref) => {
  const [step, setStep] = useState<(typeof STEPS)[keyof typeof STEPS]>(STEPS.OLD);
  const [oldPasswordError, setOldPasswordError] = useState<string>('');
  const [enableVerify, setEnableVerify] = useState<boolean>(false);

  const oldPassRef = useRef<TextInput | null>(null);
  const newPassRef = useRef<TextInput | null>(null);
  const confirmPassRef = useRef<TextInput | null>(null);

  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
    defaultValues: {
      oldPass: '',
      newPass: '',
      confirmPass: '',
    },
  });

  // Watch all fields to trigger validation
  const oldPass = watch('oldPass');
  const newPass = watch('newPass');
  const confirmPass = watch('newPass');

  // Expose submit handler to parent
  useImperativeHandle(ref, () => ({
    submitForm: () => handleSubmit(onSubmit)(),
  }));

  //Check form state validity and enable save button
  useEffect(() => {
    if (step === STEPS.OLD) {
      setCanSave(false);
      setEnableVerify(oldPass ? oldPass?.length >= passwordLength : false);
    }
    console.log('isValid', isValid);
    console.log('step', step);

    if (step === STEPS.NEW && isValid) {
      console.log('setCanSave');
      setCanSave(true);
    }
  }, [isValid, oldPass?.length, setCanSave, step]);

  // Handle old password submission
  const handleOldPasswordSubmit = () => {
    const oldPass = getValues('oldPass');

    if (oldPass !== '12345678') {
      setOldPasswordError('Incorrect old password');
      setValue('oldPass', '');
      return;
    }
    setOldPasswordError('');
    setStep(STEPS.NEW);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center">
          {step === STEPS.OLD ? (
            <View className="w-full flex-col">
              <Text className="text-start text-lg font-semibold">Enter your old password</Text>
              <View className={'flex-col gap-1'}>
                <TextInputField
                  control={control}
                  name="oldPass"
                  label=""
                  placeholder="Enter your password"
                  type="password"
                  nextRef={oldPassRef}
                />
                {oldPasswordError && (
                  <Text className={'text-sm text-red-600'}>{oldPasswordError}</Text>
                )}
              </View>

              <View className={'pt-8'}>
                <AuthButton
                  title={'Verify'}
                  onPress={handleOldPasswordSubmit}
                  disabled={!enableVerify}
                />
              </View>
            </View>
          ) : (
            <View className="w-full flex-col gap-4">
              <Text className="text-start text-lg font-semibold">Set your new password</Text>

              <View className={'flex-col gap-4'}>
                <TextInputField
                  control={control}
                  name="newPass"
                  label="New Password"
                  placeholder="Enter your password"
                  type="password"
                  nextRef={newPassRef}
                />
                <TextInputField
                  control={control}
                  name={'confirmPass'}
                  label={'Confirm Password'}
                  type="password"
                  nextRef={confirmPassRef}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

export default ChangePasswordForm;
