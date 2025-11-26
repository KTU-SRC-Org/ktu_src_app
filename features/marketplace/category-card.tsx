import { Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const CategoryCard = ({ id, name, icon, color }: CategoryCardProps) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      key={id}
      className="h-[100px] w-[100px] items-center justify-center rounded-2xl"
      style={{ backgroundColor: color }}
      onPress={() =>
        router.push({
          pathname: '/marketplace/category/[id]',
          params: { id: id, title: name },
        })
      }>
      <Text className="text-[30px]">{icon}</Text>
      <Text className="text-sm font-semibold text-white">{name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
