// hooks/profile/use-profile-bootstrap.ts
import { useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/use-supabase';
import { useAppStore } from '@/store/store';

export function useProfileBootstrap() {
  const client = useSupabase();
  const setProfileSummary = useAppStore((s) => s.setProfileSummary);
  const userId = useAppStore((s) => s.userId);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    async function load() {
      const { data, error } = await client
        .from('profiles')
        .select('id, username, full_name, avatar_url, completed')
        .eq('id', userId!)
        .single();

      if (!cancelled && data) {
        setProfileSummary(data);
      }

      if (error) {
        console.warn('Failed to load profile:', error);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [userId, client, setProfileSummary]);
}
