// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { projectRouter } from "./projects";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("projects.", projectRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
