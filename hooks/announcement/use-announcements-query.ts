import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { AnnouncementItem } from '@/features/info-center/types';

interface UseAnnouncementsQueryProps {
  enabled?: boolean;
}

const STALE_TIME_1_HOUR = 1000 * 60 * 60;

// Helper to map DB result to AnnouncementItem
const mapAnnouncementFromDB = (item: any): AnnouncementItem => {
  return {
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    summary: item.summary,
    body: item.body,
    notice: item.notice,
    headsUp: item.heads_up,
    category: item.category,
    isImportant: item.is_important,
    pinned: item.pinned,
    startsAt: item.starts_at,
    endsAt: item.ends_at,
    isPublic: item.is_public,
    location: item.location,
    address: item.address,
    contact: item.contact,
    quickFacts: item.quick_facts,
    attachments: item.attachments,
    authorId: item.author_id,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
  };
};

export const useAnnouncementsQuery = ({ enabled = true }: UseAnnouncementsQueryProps = {}) => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ['announcements'],
    queryFn: async (): Promise<AnnouncementItem[]> => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const newData = data.map((item) => {
        return {
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          summary: item.summary,
          body: item.body,
          notice: item.notice,
          headsUp: item.heads_up,
          category: item.category,
          isImportant: item.is_important,
          pinned: item.pinned,
          startsAt: item.starts_at,
          endsAt: item.ends_at,
          isPublic: item.is_public,
          location: item.location,
          address: item.address,
          contact: item.contact,
          quickFacts: item.quick_facts,
          attachments: item.attachments,
          authorId: item.author_id,
          createdAt: item.created_at,
          updatedAt: item.updated_at,
        };
      });

      console.log('Fetched announcements:', newData);

      return newData as AnnouncementItem[];
    },
    enabled,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
};

export const useAnnouncementQuery = (id: string) => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ['announcement', id],
    queryFn: async (): Promise<AnnouncementItem | null> => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return mapAnnouncementFromDB(data);
    },
    enabled: !!id,
    staleTime: STALE_TIME_1_HOUR,
    gcTime: STALE_TIME_1_HOUR,
  });
};
