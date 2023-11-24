import { z } from "zod";

import { postSignedUrl, getSignedUrl } from "~/server/aws";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { getVideoInfo } from "~/server/ffmpeg";
import type { FfprobeData } from "fluent-ffmpeg";
import { FFProbeDataStream } from "~/server/types";
const ACCEPTED_MEDIA_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/mpeg",
  "video/ogg",
  "video/webm",
  "video/3gpp",
  "video/3gpp2",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-matroska",
  "video/x-flv",
  "video/x-ms-wmv",
  "audio/mpeg",
  "audio/ogg",
  "audio/wav",
  "audio/webm",
  "audio/3gpp",
  "audio/3gpp2"
]
export const UploadFileQuery = z.object({
  name: z.string().min(2),
  fileKey: z.string(),
  fileType: z.string(),
  fileName: z.string(),
  tags: z.array(z.string()),
})

function getMediaFileType(type: string) {
  if (type.includes("image")) {
    return "IMAGE"
  } else if (type.includes("video")) {
    return "VIDEO"
  } else if (type.includes("audio")) {
    return "AUDIO"
  } else if (type.includes("text")) {
    return "TEXT"
  } else {
    return "TEXT"
  }
}
export const filesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(UploadFileQuery)
    .mutation(async ({ ctx, input }) => {
      console.log("input", input);
      const userId = ctx.session.user.id;
      const key = userId + input.fileKey
      const url = await postSignedUrl({fileKey: key, fileType: input.fileType});
      const media = await ctx.db.media.create({
        data: {
          title: input.name,
          description: "",
          type: getMediaFileType(input.fileType),
          url: "",
          key,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: userId,
          tags: {
            connectOrCreate: input.tags.map((tag) => {
              console.log("tag", tag)
              return {
                where: { id: tag },
                create: { name: tag },
              }
            }),
          }
        }
      })
      return {id: media.id, url};
    }),


  getAll: protectedProcedure.query(async ({ctx}) => {
    const files = await ctx.db.media.findMany({
      include: {
        tags: true
      }
    });
    const filesWithSignedUrls = await Promise.all(files.map(async (file) => {
      const url = await getSignedUrl({fileKey: file.key, fileType: file.type});
      return {...file, url}
    }))
    console.log("files", filesWithSignedUrls)
    return {
      files: filesWithSignedUrls
    }
  }),

  updateAfterAWS: protectedProcedure.input(z.string()).mutation(async ({ctx, input}) => {
    const mediaOrg = await ctx.db.media.findFirst({
      where: {id: input},
     
    });
    let media;
    if (!mediaOrg) return;
    if (mediaOrg.type === "VIDEO" || mediaOrg.type === "AUDIO") {
      const url = await getSignedUrl({fileKey: mediaOrg.key, fileType: mediaOrg.type});
      const videoInfo: FFProbeDataStream[] = await getVideoInfo(url);
      console.log("videoInfo", videoInfo);
      for(const stream of videoInfo) {
        if (stream.codec_type === "video") {
          media = await ctx.db.media.update({
            where: {id: input},
            data: {
              url: input,
             duration: Number(stream.duration),
              width: stream.width,
              height: stream.height,
              video_codec: stream.codec_name,
             video_stream: JSON.stringify(stream),
              updatedAt: new Date()
            }
          });
        } else if (stream.codec_type === "audio") {
          media = await ctx.db.media.update({
            where: {id: input},
            data: {
              url: input,
              duration: Number(stream.duration),
              audio_codec: stream.codec_name,
              audio_stream: JSON.stringify(stream),
              updatedAt: new Date()
            }
          });
        }
      }
      media = await ctx.db.media.update({
        where: {id: input},
        data: {
          url: input,
          updatedAt: new Date()
        }
      });
    }
   

    // TODO: grab file from aws
    // run ffprobe to get audio and video data
    return media;
  }),
  update: protectedProcedure.input(z.object({
    id: z.string(),
    data: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
    }).optional()
  })).query(async ({ctx, input}) => {
    const media = await ctx.db.media.update({
      where: {id: input.id},
      data: {
        ...input.data,
        tags: {
          connectOrCreate: input.data?.tags.map((tag) => {
            return {
              where: { id: tag },
              create: { name: tag },
            }
          }),
        },
        updatedAt: new Date()
      }
    })
    return media;
  }),
});
