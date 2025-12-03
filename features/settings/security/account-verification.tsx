import {ScrollView, TextInput, View, Text} from "react-native";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useRef} from "react";
import {z} from "zod";
import {VerifiedInput} from "@/components/shared/verified-input";
import {MaterialIcons} from "@expo/vector-icons";

const AccountVerificationSchema = z.object({
  name: z.string(),
  email: z
    .string()
    .min(3, 'Product name must be at least 3 characters long')
    .max(100, 'Product name cannot exceed 100 characters'),

  phoneNumber: z.string().min(1, 'Please select a category'),

});

type AccountVerificationFormType = z.infer<typeof AccountVerificationSchema>;

const AccountVerification = () => {

  const {control} = useForm<AccountVerificationFormType>({
    mode: 'onBlur',
    resolver: zodResolver(AccountVerificationSchema),
    defaultValues: {
      name: "Emmanuel Somuah",
      email: "EmmanuelSomuah@gmail.com",
      phoneNumber: "+233559286073"
    },
  });

  const nameRef = useRef<TextInput | null>(null);
  const emailRef = useRef<TextInput | null>(null);
  const phoneNumberRef = useRef<TextInput | null>(null);

  return(
    <ScrollView
      className="flex-1 p-4"
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior={"automatic"}
    >
     <View className="flex-col gap-4">
       <View className={"w-full flex-col gap-2"}>
         <View className="w-full flex-row items-center justify-center gap-1">
           <MaterialIcons name="lock" size={50} color="#25D366" />
           <MaterialIcons name="verified-user" size={50} color="#CFFFD1" />
         </View>
         <Text className="text-start text-base text-neutral-500 leading-6">
           Here are the details linked to your verified account.{" "}
           They help protect your identity and ensure your account {" "}
           remains secure. We never share this information with
           anyone.
         </Text>
       </View>
       <View className="flex-col gap-4">
         <VerifiedInput
           control={control}
           name="name"
           label="Name"
           type="text"
           nextRef={nameRef}
           showVerified={false}
           verifiedText="Name verified"
         />

         <VerifiedInput
           control={control}
           name="email"
           label="Email"
           type="email"
           nextRef={emailRef}
           showVerified={true}
           verifiedText={"Email verified"}
         />

         <VerifiedInput
           control={control}
           name="phoneNumber"
           label="Phone Number"
           type="number"
           nextRef={phoneNumberRef}
           showVerified={true}
           verifiedText={"Phone number verified"}
         />
       </View>
     </View>
    </ScrollView>
  )
}
export default AccountVerification