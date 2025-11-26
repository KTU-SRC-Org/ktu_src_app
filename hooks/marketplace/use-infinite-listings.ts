import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export type MarketListing = {
  id: string;
  title: string;
  price: number;
  hero_image_url: string | null;
  rating: number;
  category_id: string | null;
};

const PAGE_SIZE = 15;
const STALE_TIME_1_HOUR = 1000 * 60 * 60;

export function useInfiniteListings(categoryId: string, search: string) {
  const client = useSupabase();
  const normalizedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: ['market', 'listings', categoryId, normalizedSearch],
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const currentPage = pageParam as number;

      const from = currentPage * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = (client as any)
        .from('market_listings')
        .select('id, title, price, hero_image_url, rating, category_id', { count: 'exact' })
        .eq('is_active', true)
        .eq('is_approved', true) // Assuming we only want approved listings
        .order('created_at', { ascending: false })
        .range(from, to);

      if (categoryId && categoryId !== 'all') {
        query = query.eq('category_id', categoryId);
      }

      if (normalizedSearch) {
        query = query.or(
          `title.ilike.%${normalizedSearch}%,description.ilike.%${normalizedSearch}%`
        );
      }

      const { data, error, count } = await query;
      if (error) throw error;

      const items = (data ?? []).map((item: any) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price),
        hero_image_url: item.hero_image_url,
        rating: Number(item.rating),
        category_id: item.category_id,
      }));

      return { items, count };
    },

    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (!lastPage || lastPage.items.length < PAGE_SIZE) return undefined;
      return lastPageParam + 1;
    },
  });
}
