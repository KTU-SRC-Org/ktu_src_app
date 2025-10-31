import {useRef} from "react";
import {View, ScrollView, Text, KeyboardAvoidingView, Platform, TextInput} from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthButton } from "@/components/shared/auth-button";
import { CreateProductSchema, CreateProductInput } from "@/lib/schemas/marketplace";
import {ALL_CATEGORIES} from "@/features/marketplace/index";
import {TextInputField} from "@/components/builders/text-input-field";
import {SelectInputField} from "@/components/builders/select-input-field";
import {TextareaInputField} from "@/components/builders/textarea-input-field";
import {ImageField} from "@/components/builders/image-field";

const NewProductForm = () => {
  const { control, handleSubmit, formState: { isValid } } = useForm<CreateProductInput>({
    mode: "onBlur",
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      name: "",
      price: undefined,
      stock: undefined,
      category: "",
      description: "",
      images: [],
      sizes: [],
    },
  });

  const nameRef = useRef<TextInput | null>(null);
  const priceRef = useRef<TextInput | null>(null);
  const stockRef = useRef<TextInput | null>(null);
  const descriptionRef = useRef<TextInput | null>(null);
  const sizesRef = useRef<TextInput | null>(null);
  const categoryRef = useRef<TextInput | null>(null);

  const categoryOptions = ALL_CATEGORIES.map(
    (category) => ({
      label: category.name,
      value: category.id,
    }));

  const onSubmit = (data: CreateProductInput) => {
    console.log(data);
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View className="flex-1 bg-white">
        <ScrollView
          className="flex-1 pb-4"
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-4">
            <Text className="mb-1 text-2xl font-bold text-gray-900">
              Create New Product
            </Text>
            <Text className="text-sm text-gray-500">
              Fill in product details below
            </Text>
          </View>

          <View className="flex flex-col w-full gap-4">
            <TextInputField
              control={control}
              name="name"
              label="Product Name"
              placeholder="Enter product name"
              type="text"
              nextRef={nameRef}
            />

            <TextInputField
              control={control}
              name="price"
              label="Price"
              placeholder="Enter price"
              type="number"
              nextRef={priceRef}
            />

            <TextInputField
              control={control}
              name="stock"
              label="Stock Quantity"
              placeholder="Enter available stock"
              type="number"
              nextRef={stockRef}
            />

            <SelectInputField
              control={control}
              name="category"
              label="Category"
              placeholder="Select category"
              options={categoryOptions}
              nextRef={categoryRef}
            />

            <TextareaInputField
              control={control}
              name="description"
              label="Description"
              placeholder="Enter product description"
              nextRef={descriptionRef}
            />

            <TextInputField
              control={control}
              name="sizes"
              label="Available Sizes(comma separated)"
              placeholder="Enter sizes (M, S, L, 256GB)"
              type="list"
              nextRef={sizesRef}
            />

            <ImageField
              control={control}
              name="images"
              label="Product Images"
            />
          </View>
          <View className="pt-4">
            <AuthButton
              title="Create Product"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              className="py-3 rounded-md"
            />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewProductForm;
