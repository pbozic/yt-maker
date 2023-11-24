"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import type { MediaTags } from '~/server/types';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { PlusIcon } from "@heroicons/react/24/outline";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
   
export type VideoBlockInfo = {
    mediaId: string;
    type: VideoBlockType;
}
interface VideoBlockProps {
    index: number;
    updateVideoBlock: (index: number, videoInfo: VideoBlockInfo) => void;
    files: MediaTags[]
}
type VideoBlockType = "video" | "image" | "transition" | "audio"
export function VideoBlock() { //{index, updateVideoBlock, files}: VideoBlockProps
    // const [videoInfo, setVideoInfo] = useState<VideoBlockInfo | null>(null);
    // const [type, setType] = useState<VideoBlockType>("video");
    // const [mediaId, setMediaId] = useState<VideoBlockType>("video");
    // function handleUpdateVideoBlock() {
     
    //     updateVideoBlock(index, videoInfo!)
    // }
    // function handleSetMediaId(mediaId: string) {

    // }
    const [type, setType] = useState<VideoBlockType>("video");
    return (
      <div className="flex w-full">
           <Card className="w-full h-48">
            <CardHeader>

            </CardHeader>
            <CardContent>
            {/* {!videoInfo && <div className="w-full h-100 text-center"> */}
                    <Sheet >
                        <SheetTrigger asChild className="items-end cursor-pointer text-blue-500">
                            <div>
                                <div className="pt-4 flex flex-col items-center justify-center">
                                    <PlusIcon className="w-8 h-8"/>
                                    <span>Add a Block</span>
                                </div>
                            </div>
                        </SheetTrigger>
                        <SheetContent className="w-full h-100">
                            <SheetHeader>
                                <SheetTitle>Configure Block</SheetTitle>
                                <SheetDescription>
                                   
                                </SheetDescription>
                            </SheetHeader>
                            <SelectType value={type} setValue={setType}></SelectType>
                            {type === "video" && <VideoConfig />}
                            {type === "audio" && <AudioConfig />}
                            {type === "image" && <ImageConfig />}
                            {type === "transition" && <TransitionConfig />}
                            
                        </SheetContent>
                    </Sheet>
                {/* </div>} */}
            </CardContent>
          </Card>
      </div>
    );
  }
type SelectTypeProps = {
    value: VideoBlockType;
    setValue: (value: VideoBlockType) => void;
}
const VideoConfig = () => {
    return "Video Config"
}
const AudioConfig = () => {
    return "Audio Config"
}
const ImageConfig = () => {
    return "Image Config"
}
const TransitionConfig = () => {
    return "Transition Config"
}

const SelectType = ({value, setValue}: SelectTypeProps) => {
    return (<Select defaultValue={value} onValueChange={setValue}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="transition">Transition</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
        </SelectContent>
      </Select>)
}