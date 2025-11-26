import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export type MarketCategory = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
};

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

export function useMarketCategories() {
  const client = useSupabase();
  const queryKey = ['market', 'categories'];

  const queryFn = async (): Promise<MarketCategory[]> => {
    const { data, error } = await (client as any)
      .from('market_categories')
      .select('id, name, icon, color')
      .order('name', { ascending: true });

    if (error) throw error;

    return (data as any ?? []) as MarketCategory[];
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
}
