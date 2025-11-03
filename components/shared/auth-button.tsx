import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { clsx } from 'clsx';

type AuthButtonProps = {
  title: string;
  variant?: 'primary' | 'outline';
  loading?: boolean;
} & TouchableOpacityProps;

export const AuthButton = forwardRef<View, AuthButtonProps>(
  (
    { title, variant = 'primary', loading = false, disabled, className, ...touchableProps },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        ref={ref}
        disabled={isDisabled}
        {...touchableProps}
        className={clsx(
          'w-full items-center rounded-full p-4 shadow-md',
          variant === 'primary' && 'bg-[#F5882B]',
          variant === 'outline' && 'border border-[#F5882B] bg-transparent',
          isDisabled && 'opacity-50',
          className
        )}>
        <Text
          className={clsx(
            'text-center text-lg font-semibold',
            variant === 'primary' ? 'text-white' : 'text-[#F58220]'
          )}>
          {loading ? 'Please wait...' : title}
        </Text>
      </TouchableOpacity>
    );
  }
);

AuthButton.displayName = 'AuthButton';
