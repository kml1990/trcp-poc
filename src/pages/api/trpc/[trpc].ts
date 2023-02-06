import { initTRPC } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

interface User {
  id: string;
  name: string;
  age: number;
}
 
const userList: User[] = [
  {
    id: '1',
    name: 'Kamil',
    age: 6,
  },
];

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  users: publicProcedure
    .query(() => {
      return userList;
    }),
  userById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const input = req.input;
      const user = userList.find((it) => it.id === input);
 
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), age: z.number(), }))
    .mutation((req) => {
      const id = `${Math.random()}`;
 
      const user: User = {
        id,
        name: req.input.name,
        age: req.input.age,
      };
 
      userList.push(user);
 
      return user;
    }),
});

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})