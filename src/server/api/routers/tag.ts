import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const CreateTagQuery = z.object({
  name: z.string().min(2),
  id: z.string()
})

export const tagsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateTagQuery)
    .mutation(async ({ ctx, input }) => {
      const tag = await ctx.db.tag.create({
        data: {
          name: input.name,
        }
      })
      return {
        tag
      }
    }),
  getAll: protectedProcedure.query(async ({ctx}) => {
    const tags = await ctx.db.tag.findMany()
    return {
      tags
    }
  }),
});
