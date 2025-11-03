// Search.tsx
import { memo } from 'react';
import { View } from 'react-native';
import { Input } from '../ui/input';
import { Search as SearchIcon } from 'lucide-react-native';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onSubmit?: () => void; // when user finishes typing
};

const Search = memo(({ value, onChangeText, onSubmit }: Props) => {
  return (
    <View className="mt-5 flex w-full flex-row items-center justify-between px-4 py-2">
      <View className="relative z-50 flex flex-1 flex-row items-center justify-start">
        <View className="absolute left-2 z-10">
          <SearchIcon size={20} color="#9CA3AF" />
        </View>
        <Input
          value={value}
          onChangeText={onChangeText}
          placeholder="Search for anything"
          className="font-rubik flex-1 !border-none pl-8 text-sm"
          returnKeyType="search"
          submitBehavior="blurAndSubmit"
          onSubmitEditing={onSubmit}
        />
      </View>
    </View>
  );
});

export default Search;
