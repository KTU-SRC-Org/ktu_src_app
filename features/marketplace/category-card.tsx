import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, icon, color }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={id}
      className="h-[100px] w-[100px] items-center justify-center rounded-2xl"
      style={{ backgroundColor: color }}
      onPress={() =>
        router.push({
          pathname: '/market-place-screen/category/[id]',
          params: { id: id },
        })
      }>
      <Text className="text-[30px]">{icon}</Text>{' '}
      <Text className="text-sm font-semibold text-white">{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
