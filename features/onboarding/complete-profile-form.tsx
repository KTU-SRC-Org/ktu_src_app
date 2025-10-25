import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import { useForm } from 'react-hook-form';
import { FormField } from '@/components/builders/form-field';
import { AuthButton } from '@/components/shared/auth-button';
import {CompleteProfileFormType, CompleteProfileSchema} from '@/lib/schemas/onboarding';
import {zodResolver} from "@hookform/resolvers/zod";

interface CompleteProfileFormProps {
  onSubmitPress: (data: CompleteProfileFormType) => void;
  isSubmitting: boolean;
}

const CompleteProfileForm = ({ onSubmitPress, isSubmitting }: CompleteProfileFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CompleteProfileFormType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(CompleteProfileSchema),
    defaultValues: {
      fullName: '',
      program: '',
      indexNumber: '',
      phoneNumber: '',
      level: '',
    },
  });

  const programOptions = [
    { label: 'BTech Computer Science', value: 'btech_cs' },
    { label: 'BTech Information Technology', value: 'btech_it' },
    { label: 'BTech Cyber Security', value: 'btech_cybersec' },
    { label: 'BTech Data Science', value: 'btech_datasci' },
    { label: 'BTech Electrical & Electronic Engineering', value: 'btech_eee' },
    { label: 'BTech Mechanical Engineering', value: 'btech_mecheng' },
    { label: 'BTech Civil Engineering', value: 'btech_civileng' },
    { label: 'BTech Accounting with Computing', value: 'btech_acccomp' },
    { label: 'BTech Marketing', value: 'btech_marketing' },
    { label: 'BTech Procurement & Supply Chain Management', value: 'btech_pscm' },
    { label: 'HND Computer Science', value: 'hnd_cs' },
    { label: 'HND Information Technology', value: 'hnd_it' },
    { label: 'HND Statistics', value: 'hnd_stats' },
    { label: 'HND Building Technology', value: 'hnd_buildingtech' },
    { label: 'HND Fashion Design & Textiles', value: 'hnd_fashion' },
    { label: 'HND Hospitality Management', value: 'hnd_hospitality' },
    { label: 'Diploma in Business Studies (Accounting)', value: 'dip_business_acc' },
    { label: 'Diploma in Computer Networking', value: 'dip_networking' },
    { label: 'Diploma in Graphic Design', value: 'dip_graphicdesign' },
    { label: 'Diploma in Software Engineering', value: 'dip_softeng' },
  ];


  const levelOptions = [
    { label: 'Level 100', value: 'l100' },
    { label: 'Level 200', value: 'l200' },
    { label: 'Level 300', value: 'l300' },
    { label: 'Level 400', value: 'l400' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className={"pt-16"}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Please fill in your student details to finish registration.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <FormField
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <FormField
            control={control}
            name="indexNumber"
            label="Index Number"
            placeholder="B202210330"
            type="text"
          />

          <FormField
            control={control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="024 123 4567"
            type="phone"
          />

          <FormField
            control={control}
            name="program"
            label="Program of Study"
            placeholder="Select your program"
            type="select"
            options={programOptions}
          />

          <FormField
            control={control}
            name="level"
            label="Level"
            placeholder="Select your level"
            type="select"
            options={levelOptions}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <AuthButton
          title="Continue"
          onPress={handleSubmit(onSubmitPress)}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          className="rounded-sm p-0 py-2"
        />
      </View>
    </View>
  );
};

export default CompleteProfileForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  formContainer: {
    gap: 16,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});