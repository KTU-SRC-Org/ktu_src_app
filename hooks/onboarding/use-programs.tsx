import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function usePrograms(departmentId: string | null) {
  const client = useSupabase();
  const queryKey = ['programs', departmentId];

  const queryFn = async () => {
    if (!departmentId) return [];

    const { data, error } = await client
      .from('programs')
      .select('id, name')
      .eq('department', departmentId);

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!departmentId, // Only run the query if a departmentId is provided
  });
}
