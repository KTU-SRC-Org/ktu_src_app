import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { Event, TabKeys } from '@/types/events.types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/types_db';

const EVENTS_PER_PAGE = 10;

type FetchEventsParams = {
  pageParam?: number;
  filter: TabKeys;
  client: SupabaseClient<Database>;
};

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

const fetchEvents = async ({ pageParam = 0, filter, client }: FetchEventsParams) => {
 
  const from = pageParam * EVENTS_PER_PAGE;
  const to = from + EVENTS_PER_PAGE - 1;

  let query = client
    .from('events')
    .select('id, title, starts_at, location')
    .range(from, to);

  const now = new Date().toISOString();

  switch (filter) {
    case 'featured':
      query = query.eq('is_featured', true).gte('starts_at', now).order('starts_at', { ascending: true });
      break;
    case 'popular':
      // Popular events: most going_count in the next 7 days
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      query = query
        .gte('starts_at', now)
        .lte('starts_at', nextWeek.toISOString())
        .order('going_count', { ascending: false });
      break;
    case 'upcoming':
      query = query.gte('starts_at', now).order('starts_at', { ascending: true });
      break;
  }

  const { data, error } = await query;
  console.log(error);

  if (error) {
    throw new Error(error.message);
  }

  return data as Event[];
};

export const useInfiniteEvents = (filter: TabKeys) => {

   const client = useSupabase();
  return useInfiniteQuery({
    queryKey: ['events', filter],
    queryFn: ({ pageParam }) => fetchEvents({ pageParam, filter, client }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < EVENTS_PER_PAGE) {
        return undefined;
      }
      return allPages.length;
    },
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
};
