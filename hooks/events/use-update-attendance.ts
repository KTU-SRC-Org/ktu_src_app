import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { EventAttendanceStatus } from '@/types/events.types';
import { useAppStore } from '@/store/store';
import { Toast } from 'toastify-react-native';

type UpdateAttendanceParams = {
  eventId: string;
  status: EventAttendanceStatus;
};

export function useUpdateAttendance() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const userId = useAppStore((s) => s.userId);

  const mutationFn = async ({ eventId, status }: UpdateAttendanceParams) => {
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // If status is null, delete the attendance record
    if (status === null || status === 'not_going') {
      const { error } = await client
        .from('event_attendance')
        .delete()
        .eq('event_id', eventId)
        .eq('profile_id', userId);

      if (error) {
        throw error;
      }

      return { status: null };
    }

    // Otherwise, upsert the attendance record
    const { data, error } = await client
      .from('event_attendance')
      .upsert(
        {
          event_id: eventId,
          profile_id: userId,
          status: status,
        },
        {
          onConflict: 'event_id,profile_id',
        }
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  };

  return useMutation({
    mutationFn,
    onSuccess: (_, variables) => {
      Toast.success('Attendance status updated!');

      // Invalidate the event details query to refetch with updated counts
      queryClient.invalidateQueries({ queryKey: ['event', variables.eventId] });

      // Also invalidate the events list to update counts there
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error: any) => {
      Toast.error(error.message || 'Failed to update attendance status');
    },
  });
}
