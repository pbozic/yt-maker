import { TRPCClientError } from '@trpc/client';
import { spawnSync } from 'child_process';
import type { FFProbeDataStream } from '~/server/types';

async function get_video_meta_data(url: string): Promise<FFProbeDataStream[]> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const ffProbe = spawnSync("ffprobe", ["-print_format", "json", "-show_format", "-show_streams", "-show_error", "-show_chapters", url]);
    console.log("ffprobe", ffProbe.stdout.toString());
    try {
        const ast =  ffProbe.stdout.toString()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
        const a: {streams: FFProbeDataStream[]} = JSON.parse(ast);
        const streams: FFProbeDataStream[] = a.streams;
        resolve(streams);
    } catch (e) {
        console.log(e)
        return reject(e); // error in the above string (in this case, yes)!
    }
  });
}

export const getVideoInfo = async (url: string) => {

  
    const info: FFProbeDataStream[] = await get_video_meta_data(url);
    return info
    
   
};