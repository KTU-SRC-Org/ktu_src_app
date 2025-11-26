import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export type FeaturedListing = {
  id: string;
  title: string;
  price: number;
  hero_image_url: string | null;
  rating: number;
};

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

export function useFeaturedListings() {
  const client = useSupabase();
  const queryKey = ['market', 'listings', 'featured'];

  const queryFn = async (): Promise<FeaturedListing[]> => {
    const { data, error } = await client
      .from('market_listings')
      .select('id, title, price, hero_image_url, rating')
      .eq('is_featured', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10); // Limit to reasonable number of featured items

    if (error) throw error;

    return (data ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      price: Number(item.price),
      hero_image_url: item.hero_image_url,
      rating: Number(item.rating),
    }));
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
}
