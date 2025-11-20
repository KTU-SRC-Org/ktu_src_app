import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export interface HostelCard {
  id: string;
  image: string | null;
  rating: number | null;
  name: string;
  address: string | null;
  price: number;
}

type HostelRow = {
  id: string;
  hero_image_url: string | null;
  rating: number | null;
  name: string;
  address: string | null;
  price: number;
};

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

export function useFeaturedHostels() {
  const client = useSupabase();
  const queryKey = ['hostels', 'featured'];

  const queryFn = async (): Promise<HostelCard[]> => {
    const { data, error } = await client
      .from('hostels')
      .select('id, hero_image_url, rating, name, address, price')
      .eq('is_featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const rows = (data ?? []) as HostelRow[];

    return rows.map((row) => ({
      id: row.id,
      image: row.hero_image_url,
      rating: row.rating,
      name: row.name,
      address: row.address,
      price: Number(row.price),
    }));
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR, // you can bump this if you want
  });
}

export function useRecommendedHostels() {
  const client = useSupabase();
  const queryKey = ['hostels', 'recommended'];

  const queryFn = async (): Promise<HostelCard[]> => {
    const { data, error } = await client
      .from('hostels')
      .select('id, hero_image_url, rating, name, address, price')
      .eq('is_featured', false)
      .order('rating', { ascending: false }) // or created_at, price, etc.
      .limit(15);

    if (error) throw error;

    const rows = (data ?? []) as HostelRow[];

    return rows.map((row) => ({
      id: row.id,
      image: row.hero_image_url,
      rating: row.rating,
      name: row.name,
      address: row.address,
      price: Number(row.price),
    }));
  };

  return useQuery({
    queryKey,
    queryFn,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
}
