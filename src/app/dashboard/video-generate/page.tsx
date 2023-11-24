"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { api } from "~/trpc/react";
import type { VideoBlockInfo } from "./components/VideoBlock";
import { VideoBlock } from "./components/VideoBlock";

export default function Dashboard() {
    const { data: allFiles } = api.file.getAll.useQuery();
    console.log("all", allFiles?.files)
    const [videoFiles, setVideoFiles] = useState();
    const updateVideoBlock = (index: number, videoInfo: VideoBlockInfo) => {
        console.log("update", index, videoInfo)
    }
    return (
      <div className="flex w-full">
           <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Generate Video
              </CardTitle>
              <CardDescription>Generate a new video</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid w-100 grid-cols-4 gap-4">
                    {/* {allFiles.map((file) => {
                        return (<Card key={file.id}>
                            <CardContent>
                                File
                            </CardContent>
                        </Card>)
                    })} */}
                    <VideoBlock index={0} updateVideoBlock={updateVideoBlock} files={allFiles?.files ?? []} />
                </div>
            </CardContent>
          </Card>
      </div>
    );
  }