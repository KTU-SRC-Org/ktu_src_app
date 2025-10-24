import React, { useState, useEffect } from "react";
import {View, Text, TouchableWithoutFeedback, Keyboard} from "react-native";
import {Controller, useForm} from "react-hook-form";
import {OTPFormType, OTPSchema} from "@/lib/schemas/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import OTPInput from "@/components/shared/otp-input";
import {AuthButton} from "@/components/shared/auth-button";
import {BackButton} from "@/components/shared/back-button";
import { SafeAreaView } from "react-native-safe-area-context";


const Verify = () => {
  const [timer, setTimer] = useState(180); //180 => 3min

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Helper for timer count down
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const form = useForm<OTPFormType>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otpCode: '' },
  });

  // Handle otp verification
  const handleSubmitOTP = (data: OTPFormType) => {
    if (data.otpCode === '1234') {
      console.log('OTP Verified Successfully');
      Keyboard.dismiss();
    } else {
      form.setError('otpCode', { message: 'Invalid PIN' });
      Keyboard.dismiss();
    }
  };

  const handleOtpResend = () => {
    setTimer(180)
    form.reset({'otpCode': ''});
  }

  return (
   <SafeAreaView edges={["top", "bottom"]} className="flex-1 bg-[#043270]">
     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
       <View className="px-8 pt-16">
         <BackButton />

         <View className="flex flex-col items-center justify-center gap-12 pt-16">
           <View className="w-full items-center">
             <Text className="text-center text-2xl font-bold text-white">Check your email.</Text>
             <Text className="mt-1 text-center text-base text-white">
               We’ve sent the code to fedejnr08@gmail.com.
             </Text>
           </View>

           <Controller
             control={form.control}
             name="otpCode"
             render={({ field, fieldState }) => (
               <OTPInput
                 length={4}
                 value={(field.value ?? '').split('')}
                 setValue={(val) => field.onChange(val.join(''))}
                 isValid={fieldState.error ? false : field.value.length === 4 ? true : null}
               />
             )}
           />

           <View className="flex w-full flex-col items-center gap-4">
             {form.formState.errors.otpCode ? (
               <Text className="mt-2 text-center text-[#FF4D4D]">
                 {form.formState.errors.otpCode.message}
               </Text>
             ) : (
               <Text className={`mt-2 text-center ${timer < 10 ? "text-red-500" : "text-white"}`}>
                 Code expires in {formatTime(timer)}
               </Text>
             )}

             <AuthButton
               title="Verify"
               onPress={form.handleSubmit(handleSubmitOTP)}
               loading={form.formState.isSubmitting}
               disabled={!form.formState.isValid || timer === 0 || form.formState.isSubmitting}
             />
             <AuthButton
               title="Send again"
               variant="outline"
               onPress={handleOtpResend}
               disabled={timer > 0}
             />
           </View>
         </View>
       </View>
     </TouchableWithoutFeedback>
   </SafeAreaView>
  );
};
export default Verify;
