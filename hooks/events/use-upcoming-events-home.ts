import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { Event } from '@/types/events.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/types_db';

const STALE_TIME_10_MINS = 1000 * 60 * 10;

const fetchUpcomingEvents = async (client: SupabaseClient<Database>) => {
  const now = new Date().toISOString();

  const { data, error } = await client
    .from('events')
    .select('id, title, starts_at, location')
    .gte('starts_at', now)
    .order('starts_at', { ascending: true })
    .limit(5);

  if (error) {
    throw new Error(error.message);
  }

  return data as Event[];
};

export const useUpcomingEventsHome = () => {
  const client = useSupabase();

  return useQuery({
    queryKey: ['upcoming-events-home'],
    queryFn: () => fetchUpcomingEvents(client),
    staleTime: STALE_TIME_10_MINS,
    gcTime: STALE_TIME_10_MINS,
  });
};
