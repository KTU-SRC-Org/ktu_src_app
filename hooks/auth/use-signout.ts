import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSupabase } from "@/lib/supabase/use-supabase";

export function useSignOut() {
    const supabase = useSupabase();
    const queryClient = useQueryClient();

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            throw error;
        }
    };

    return useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            // Clear all queries from the cache to ensure no sensitive data remains
            // and to force a refetch when the user logs back in.
            queryClient.removeQueries();
        },
    });
}
