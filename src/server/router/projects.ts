import { z } from "zod";
import { createRouter } from "./context";

export const projectRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      try {
        return await ctx.prisma.project.findMany();
      } catch (error) {
        console.log(error);
      }
    },
  })
  .mutation("postProject", {
    input: z.object({
      name: z.string(),
      hours: z.number(),
      note: z.string(),
    }),
    async resolve({ ctx, input }) {
      try {
        await ctx.prisma.project.create({
          data: {
            name: input.name,
            hours: input.hours,
            note: input.note,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });
