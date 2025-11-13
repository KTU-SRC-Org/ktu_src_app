// lib/supabase/use-supabase.ts
import { useMemo } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { getSupabaseBrowserClient } from '@/utils/supabase';

export function useSupabase<Db = unknown>() {
  return useMemo(() => getSupabaseBrowserClient<Db>(), []);
}
