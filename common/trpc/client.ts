'use client';

import { createTRPCReact } from '@trpc/react-query';
import appRouter from '@/server/trpc/router/app.router';

const trpc = createTRPCReact<typeof appRouter>();

export default trpc;
