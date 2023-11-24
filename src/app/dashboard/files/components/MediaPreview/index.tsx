"use client"

import Image from 'next/image';
import { MediaTags } from '~/server/types';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import type {FFProbeDataStream} from "~/server/types";
  import { ScrollArea } from "@/components/ui/scroll-area"

// eslint-disable-next-line @typescript-eslint/require-await
export default function MediaPreview({media}: {media: MediaTags}) {
   
    return ( 
        <div className="flex text-center justify-between items-start gap-4">
            <div className="w-2/12">
                <MediaView  media={media} />
            </div>
            <div className="w-4/12">
                <MediaStreamTabs media={media}/>
            </div>
            <div className="w-4/12">
                More info?
            </div>
        </div>
    );
}
const MediaStreamTabs = ({media}:{media: MediaTags}) => {
    const audio_streamS: string = media.audio_stream ?? "";
    const video_streamS: string = media.video_stream ?? "";
    let audio_stream: FFProbeDataStream | null = null;
    let video_stream: FFProbeDataStream | null = null;;
    try {
        audio_stream = JSON.parse(audio_streamS) as FFProbeDataStream;
        video_stream = JSON.parse(video_streamS) as FFProbeDataStream;
    } catch (error) {
        
    }
    if (!audio_stream && !video_stream) return null;
    return (
            <Tabs defaultValue="video">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="video">Video Stream</TabsTrigger>
                <TabsTrigger value="audio">Audio Stream</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-96 rounded-md border">
                    {video_stream && <TabsContent value="video">
                        <MediaStreamView stream={video_stream} />
                    </TabsContent>}
                    {audio_stream && <TabsContent value="audio">
                        <MediaStreamView stream={audio_stream} />
                    </TabsContent>}
                </ScrollArea>
            </Tabs>
    )

}
const StreamRow = ({key1, value}:{key1:string, value:string}) => {
    return <div className="flex flex-row text-left px-2">
        <div className="w-4/12 bg-slate-200 font-bold">{key1}</div>
        <div className="w-8/12 pl-2">{value}</div>
    </div>
}
const MediaStreamView = ({stream}:{stream: FFProbeDataStream | null}) => {
            if (!stream) return <div>no stream</div>
            return <div className="flex flex-col">
                  {Object.entries(stream).map(([key1, value]) => {
                    if (typeof value === "object") {
                        Object.entries(stream).map(([key1, value]) => {
                            return <StreamRow key={key1} key1={key1} value={value as string} />
                        })
                    } else {
                        return <StreamRow key={key1} key1={key1} value={value as string} />
                    }
                  
                  })}
            </div>     
}
const MediaView = ({media}:{media:MediaTags}) => {
    if(media.type==="VIDEO"){
        return <video controls>
            <source src={media.url ?? ""} type="video/mp4" />
        </video>
    }
    if(media.type==="AUDIO"){
        return <audio controls>
            <source src={media.url ?? ""} type="audio/mp3" />
        </audio>
    }
    if(media.type==="IMAGE"){
        return <Image width={450} height={250} src={media.url ?? ""} alt={media.title}/>
    }   

   
}