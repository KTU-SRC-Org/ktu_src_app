import { useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { router, useLocalSearchParams } from 'expo-router';

export function useSearchSync() {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query ?? '');

  // ① Debounce local state — used for API fetching
  const [debouncedSearch] = useDebounce(search, 600);

  // ② Debounce shallow URL updates (optional)
  const debouncedSetParams = useDebouncedCallback((text: string) => {
    router.setParams({ query: text || undefined });
  }, 800);

  const handleChange = (text: string) => {
    setSearch(text);
    debouncedSetParams(text); // keep URL in sync lazily
  };

  return {
    search, // immediate typing value
    debouncedSearch, // stable value to feed into API or useQuery
    handleChange,
  };
}
