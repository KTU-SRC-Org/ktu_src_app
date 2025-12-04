import { useInfiniteQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { Event, TabKeys } from '@/types/events.types';

const EVENTS_PER_PAGE = 10;

type FetchEventsParams = {
  pageParam?: number;
  filter: TabKeys;
  client: any;
};

const fetchEvents = async ({ pageParam = 0, filter, client }: FetchEventsParams) => {
 
  const from = pageParam * EVENTS_PER_PAGE;
  const to = from + EVENTS_PER_PAGE - 1;

  let query = client
    .from('events')
    .select(
      `
      *,
      organizer:profiles(full_name, avatar_url)
    `
    )
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
  });
};
