import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { clsx } from 'clsx';

type AuthButtonProps = {
  title: string;
  variant?: "primary" | "outline";
  loading?: boolean;
} & TouchableOpacityProps;

export const AuthButton = forwardRef<View, AuthButtonProps>(
  (
    {
      title,
      variant = "primary",
      loading = false,
      disabled,
      className,
      ...touchableProps
    }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <TouchableOpacity
        ref={ref}
        disabled={isDisabled}
        {...touchableProps}
        className={clsx(
          "items-center rounded-full shadow-md p-4 w-full",
          variant === "primary" && "bg-[#F5882B]",
          variant === "outline" && "border border-[#F5882B] bg-transparent",
          isDisabled && "opacity-50",
          className
        )}
      >
        <Text
          className={clsx(
            "text-lg font-semibold text-center",
            variant === "primary" ? "text-white" : "text-[#F58220]"
          )}
        >
          {loading ? "Please wait..." : title}
        </Text>
      </TouchableOpacity>
    );
  }
);

AuthButton.displayName = "AuthButton";
