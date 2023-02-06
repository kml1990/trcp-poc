import { AppRouter } from '@/pages/api/trpc/[trpc]';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

function getBseUrl() {
  if (typeof window !== 'undefined') {
    return '';
  }

  return `http://localhost:3000/api/trpc}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        })
      ]
    }
  }
});