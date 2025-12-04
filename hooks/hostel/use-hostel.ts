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

export type HostelGalleryItem = {
  id: string;
  image: string;
  caption: string | null;
  position: number;
};

export type HostelDetails = HostelCard & {
  description: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  facilities: string[];
  type: string;
  campus: boolean;
  contact: string | null;
  paymentTerm: string | null;
  agent: {
    name: string | null;
    email: string | null;
    avatar: string | null;
  };
  gallery: HostelGalleryItem[];
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

export function useHostel(hostelId?: string) {
  const client = useSupabase();

  return useQuery<HostelDetails | null>({
    queryKey: ['hostel', hostelId],
    enabled: !!hostelId,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
    queryFn: async () => {
      if (!hostelId) return null;

      const { data, error } = await client
        .from('hostels')
        .select(
          `
          id,
          name,
          description,
          address,
          contact,
          bedrooms,
          bathrooms,
          campus,
          price,
          rating,
          type,
          payment_term,
          facilities,
          hero_image_url,
          agent_name,
          agent_email,
          agent_avatar_url,
          hostel_photos (
            id,
            storage_path,
            caption,
            position
          )
        `
        )
        .eq('id', hostelId)
        .order('position', { referencedTable: 'hostel_photos', ascending: true })
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      const gallery =
        (data.hostel_photos ?? []).map((p: any) => ({
          id: p.id as string,
          // NOTE: If storage_path is a relative path, wrap this in supabase.storage.from('...').getPublicUrl()
          image: p.storage_path as string,
          caption: p.caption ?? null,
          position: p.position ?? 0,
        })) ?? [];

      const facilities = (data.facilities ?? []) as string[];

      const details: HostelDetails = {
        id: data.id,
        image: data.hero_image_url ?? gallery[0]?.image ?? null,
        rating: data.rating,
        name: data.name,
        address: data.address,
        price: Number(data.price),

        description: data.description,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        facilities,
        type: data.type,
        campus: data.campus,
        contact: data.contact,
        paymentTerm: data.payment_term,
        agent: {
          name: data.agent_name,
          email: data.agent_email,
          avatar: data.agent_avatar_url,
        },
        gallery,
      };

      return details;
    },
  });
}
