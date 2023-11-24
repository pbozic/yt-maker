
import type { RouterOutputs } from "~/trpc/shared";
export type MediaTags = RouterOutputs['file']['getAll']['files'][0];

export type FFProbeDataStreamArray = FFProbeDataStream[]

export interface FFProbeDataStream {
  index: number
  codec_name: string
  codec_long_name: string
  profile: string
  codec_type: string
  codec_tag_string: string
  codec_tag: string
  width?: number
  height?: number
  coded_width?: number
  coded_height?: number
  closed_captions?: number
  film_grain?: number
  has_b_frames?: number
  pix_fmt?: string
  level?: number
  color_range?: string
  color_space?: string
  color_transfer?: string
  color_primaries?: string
  chroma_location?: string
  field_order?: string
  refs?: number
  is_avc?: string
  nal_length_size?: string
  id: string
  r_frame_rate: string
  avg_frame_rate: string
  time_base: string
  start_pts: number
  start_time: string
  duration_ts: number
  duration: string
  bit_rate: string
  bits_per_raw_sample?: string
  nb_frames: string
  extradata_size: number
  disposition: Disposition
  tags?: Tags
  sample_fmt?: string
  sample_rate?: string
  channels?: number
  channel_layout?: string
  bits_per_sample?: number
}

export interface Disposition {
  default: number
  dub: number
  original: number
  comment: number
  lyrics: number
  karaoke: number
  forced: number
  hearing_impaired: number
  visual_impaired: number
  clean_effects: number
  attached_pic: number
  timed_thumbnails: number
  captions: number
  descriptions: number
  metadata: number
  dependent: number
  still_image: number
}

export interface Tags {
  language: string
  handler_name: string
  vendor_id: string
  encoder: string
}
