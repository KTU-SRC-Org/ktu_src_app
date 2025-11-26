import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export type ProductVariant = {
  id: string;
  label: string;
  price: number | null;
  stock_qty: number | null;
  is_in_stock: boolean;
  attributes: Record<string, any>;
};

export type ProductDetails = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  stock_qty: number | null;
  is_in_stock: boolean;
  hero_image_url: string | null;
  rating: number;
  rating_count: number;
  call_contact: string | null;
  whatsapp_contact: string | null;
  seller: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  } | null;
  variants: ProductVariant[];
  images: string[];
};

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

export function useProductDetails(id: string) {
  const client = useSupabase();
  const queryKey = ['market', 'product', id];

  const queryFn = async (): Promise<ProductDetails | null> => {
    // Fetch listing details
    const { data: listing, error: listingError } = await client
      .from('market_listings')
      .select(`
        *,
        seller:profiles (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('id', id)
      .single();

    if (listingError) throw listingError;
    if (!listing) return null;

    // Fetch variants
    const { data: variants, error: variantsError } = await client
      .from('market_listing_variants')
      .select('*')
      .eq('listing_id', id)
      .eq('is_active', true);

    if (variantsError) throw variantsError;

    // Fetch photos
    const { data: photos, error: photosError } = await client
      .from('market_photos')
      .select('storage_path')
      .eq('listing_id', id)
      .order('position', { ascending: true });

    if (photosError) throw photosError;

    const images = (photos ?? []).map((p) => p.storage_path);
    // Ensure hero image is included if no photos found, or just use photos if available
    // Assuming photos table contains all images including hero.
    // If photos is empty, fallback to hero_image_url
    const finalImages = images.length > 0 ? images : (listing.hero_image_url ? [listing.hero_image_url] : []);

    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      price: Number(listing.price),
      currency: listing.currency,
      stock_qty: listing.stock_qty,
      is_in_stock: listing.is_in_stock,
      hero_image_url: listing.hero_image_url,
      rating: Number(listing.rating),
      rating_count: listing.rating_count,
      call_contact: listing.call_contact,
      whatsapp_contact: listing.whatsapp_contact,
      seller: listing.seller,
      variants: (variants ?? []).map((v: any) => ({
        id: v.id,
        label: v.label,
        price: v.price ? Number(v.price) : null,
        stock_qty: v.stock_qty,
        is_in_stock: v.is_in_stock,
        attributes: v.attributes,
      })),
      images: finalImages,
    };
  };

  return useQuery({
    queryKey,
    queryFn,
    enabled: !!id,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
}
