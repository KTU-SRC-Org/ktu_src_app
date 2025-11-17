import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSupabase } from '@/lib/supabase/use-supabase';

export function useSignUpWithEmail(props: { onError?: () => void }) {
  const client = useSupabase();
  const qc = useQueryClient();
  const mutationKey = ['auth', 'sign-up-with-email-password'];

  const signUp = async (payload: { email: string; password: string; options?: any }) => {
    const res = await client.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: payload.options,
    });
    if (res.error) throw res.error;
    return res.data;
  };

  return useMutation({
    mutationFn: signUp,
    mutationKey,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['supabase', 'user'] });
    },
    onError: props.onError,
  });
}
