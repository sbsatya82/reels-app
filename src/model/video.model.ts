import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  height: 1920
} as const


export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  dimensions?: {
    height : number;
    width : number;
    quality? : number;
  },
  createdAt?: Date;
  updatedAt?: Date;
}



const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  controls: { type: Boolean, default: true },
  dimensions: {
    height: { type: Number, default: VIDEO_DIMENSIONS.height },
    width: { type: Number, default: VIDEO_DIMENSIONS.width },
    quality: { type: Number, default: 75 }
  }
},{ timestamps : true});


const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;