import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import { AuthButton } from '@/components/shared/auth-button';
import { CompleteProfileFormType, CompleteProfileSchema } from '@/lib/schemas/onboarding';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInputField } from '@/components/builders/text-input-field';
import { SelectInputField } from '@/components/builders/select-input-field';
import { useFaculties } from '@/hooks/onboarding/use-faculties';
import { useDepartments } from '@/hooks/onboarding/use-departments';
import { usePrograms } from '@/hooks/onboarding/use-programs';
import { LEVEL_OPTIONS } from '@/constants/profile.constants';

interface CompleteProfileFormProps {
  onSubmitPress: (data: CompleteProfileFormType) => void;
  isSubmitting: boolean;
}

const CompleteProfileForm = ({ onSubmitPress, isSubmitting }: CompleteProfileFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<CompleteProfileFormType>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    resolver: zodResolver(CompleteProfileSchema),
    defaultValues: {
      fullName: '',
      faculty: '',
      department: '',
      program: '',
      indexNumber: '',
      phoneNumber: '',
      level: '',
    },
  });

  const selectedFaculty = watch('faculty');
  const selectedDepartment = watch('department');

  const { data: faculties, isLoading: isLoadingFaculties } = useFaculties();
  const { data: departments, isLoading: isLoadingDepartments } = useDepartments(selectedFaculty);
  const { data: programs, isLoading: isLoadingPrograms } = usePrograms(selectedDepartment);

  const facultyOptions = faculties?.map((f) => ({ label: f.name, value: f.id })) || [];
  const departmentOptions = departments?.map((d) => ({ label: d.name, value: d.id })) || [];
  const programOptions = programs?.map((p) => ({ label: p.name, value: p.id.toString() })) || [];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        className={'pt-8'}>
        <View style={styles.header}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Please fill in your student details to finish registration.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInputField
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />

          <TextInputField
            control={control}
            name="indexNumber"
            label="Index Number"
            placeholder="B202210330"
            type="text"
          />

          <TextInputField
            control={control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="024 123 4567"
            type="phone"
          />

          <SelectInputField
            control={control}
            name="faculty"
            label="Faculty"
            placeholder="Select your faculty"
            options={facultyOptions}
            disabled={isLoadingFaculties}
          />

          <SelectInputField
            control={control}
            name="department"
            label="Department"
            placeholder="Select your department"
            options={departmentOptions}
            disabled={!selectedFaculty || isLoadingDepartments}
          />

          <SelectInputField
            control={control}
            name="program"
            label="Program of Study"
            placeholder="Select your program"
            options={programOptions}
            disabled={!selectedDepartment || isLoadingPrograms}
          />

          <SelectInputField
            control={control}
            name="level"
            label="Level"
            placeholder="Select your level"
            options={LEVEL_OPTIONS}
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
