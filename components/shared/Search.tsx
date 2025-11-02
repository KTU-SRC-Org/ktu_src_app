// Search.tsx
import { memo } from "react";
import { View } from "react-native";
import { Input } from "../ui/input";
import { Search as SearchIcon } from "lucide-react-native";

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onSubmit: () => void; // when user finishes typing
};

const Search = memo(({ value, onChangeText, onSubmit }: Props) => {
  return (
    <View className="flex flex-row items-center justify-between w-full px-4 py-2 mt-5">
      <View className="relative z-50 flex flex-row items-center justify-start flex-1">
        <View className="absolute z-10 left-2">
            <SearchIcon size={20} color="#9CA3AF" />
        </View>
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder="Search for anything"
          className="flex-1 pl-8 text-sm !border-none font-rubik"
          returnKeyType="search"
          submitBehavior="blurAndSubmit"
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
});

export default Search;
