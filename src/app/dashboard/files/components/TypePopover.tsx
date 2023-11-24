import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { FilmIcon, GifIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline"

export function TypePopover ({type}: {type: string}) {
    return (<HoverCard>
        <HoverCardTrigger asChild>
            <div className="flex flex-wrap">
                {type === "VIDEO" && <FilmIcon className="w-5 h-5 mr-1" />}
                {type === "IMAGE" && <GifIcon className="w-5 h-5 mr-1" />}
                {type === "AUDIO" && <SpeakerWaveIcon className="w-5 h-5 mr-1" />}
            </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-full">
          <div className="flex text-center justify-between space-x-4">
            {type.toLowerCase()}
          </div>
        </HoverCardContent>
      </HoverCard>)
}