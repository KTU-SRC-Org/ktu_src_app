import type { SupabaseClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { NotificationItem } from '@/features/info-center/types';

interface UseNotificationsQueryProps {
  enabled?: boolean;
  userId?: string;
}

const STALE_TIME_30_MIN = 1000 * 60 * 30;

const mapNotificationFromDB = (item: any): NotificationItem => ({
  id: item.id,
  recipientId: item.recipient_id,
  actorId: item.actor_id,
  type: item.type,
  title: item.title,
  body: item.body,
  data: item.data ?? {},
  linkType: item.link_type,
  linkId: item.link_id,
  read: item.read,
  createdAt: item.created_at,
});

const resolveRecipientId = async (supabase: SupabaseClient, userId?: string) => {
  if (userId) return userId;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) throw new Error('No authenticated user found');

  return user.id;
};

export const useNotificationsQuery = ({ enabled = true, userId }: UseNotificationsQueryProps = {}) => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ['notifications', { recipientId: userId }],
    queryFn: async (): Promise<NotificationItem[]> => {
      const recipientId = await resolveRecipientId(supabase, userId);

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('recipient_id', recipientId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(mapNotificationFromDB);
    },
    enabled,
    staleTime: STALE_TIME_30_MIN,
    gcTime: STALE_TIME_30_MIN,
  });
};

export const useNotificationQuery = (id: string) => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ['notification', id],
    queryFn: async (): Promise<NotificationItem | null> => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) return null;

      return mapNotificationFromDB(data);
    },
    enabled: !!id,
    staleTime: STALE_TIME_30_MIN,
    gcTime: STALE_TIME_30_MIN,
  });
};
