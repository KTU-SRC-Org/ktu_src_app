import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

const queryKey = ['faculties'];

export function useFaculties() {
  const client = useSupabase();

  const queryFn = async () => {
    const { data, error } = await client.from('faculties').select('id, name');

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery({
    queryKey,
    queryFn,
  });
}
