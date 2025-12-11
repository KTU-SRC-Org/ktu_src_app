import { useQuery } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { NotificationItem } from '@/features/info-center/types';

interface UseNotificationsQueryProps {
  enabled?: boolean;
  userId?: string;
}

export const useNotificationsQuery = ({ enabled = true, userId }: UseNotificationsQueryProps = {}) => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ['notifications', { recipientId: userId }],
    queryFn: async (): Promise<NotificationItem[]> => {
      // Stub implementation - replace with actual Supabase call
      // const { data, error } = await supabase
      //   .from('notifications')
      //   .select('*')
      //   .eq('recipient_id', userId)
      //   .order('created_at', { ascending: false });

      // if (error) throw error;
      // return data as NotificationItem[];
      
      // Mock data for now
      await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
      return [
        {
          id: '1',
          recipientId: userId || 'user-1',
          type: 'info',
          title: 'System Update Available',
          body: 'A new system update is now available for your student app.',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        },
        {
          id: '3',
          recipientId: userId || 'user-1',
          type: 'alert',
          title: 'Power Interruption',
          body: 'Scheduled maintenance in Engineering Block today.',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        },
        {
          id: '6',
          recipientId: userId || 'user-1',
          type: 'feature',
          title: 'Dark Mode Available',
          body: 'You can now switch to Dark Mode in settings.',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
        },
      ];
    },
    enabled,
  });
};

export const useNotificationQuery = (id: string) => {
  const supabase = useSupabase();

  return useQuery({
    queryKey: ['notification', id],
    queryFn: async (): Promise<NotificationItem | null> => {
       // Mock fetch
       await new Promise((resolve) => setTimeout(resolve, 500));
       return {
          id,
          recipientId: 'user-1',
          type: 'info',
          title: 'System Update Available',
          body: 'A new system update is now available for your student app.',
          read: false,
          createdAt: new Date().toISOString(),
          // Add other fields as needed
       };
    },
    enabled: !!id,
  });
};
