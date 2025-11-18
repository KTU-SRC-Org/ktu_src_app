import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function useDepartments(facultyId: string | null) {
  const client = useSupabase();
  const queryKey = ['departments', facultyId];

  const queryFn = async () => {
    if (!facultyId) return [];

    const { data, error } = await client
      .from('departments')
      .select('id, name')
      .eq('faculty_id', facultyId);

    if (error) {
      throw error;
    }

    return data;
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!facultyId, // Only run the query if a facultyId is provided
  });
}
