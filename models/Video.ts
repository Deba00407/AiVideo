import {model, Schema, models} from "mongoose";
import { DEFAULT_VIDEO_DIMENSIONS, type VideoType } from "../types";

const videoSchema = new Schema<VideoType>({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
        minlength: 100, 
        maxlength: 4096
    }, 

    fileURL: {
        type: String,
        required: true
    },

    thumbnailURL: {
        type: String,
        required: true
    },

    controls: {
        type: Boolean,
        default: true
    },

    transformation: {
        height: {
            type: Number, default: DEFAULT_VIDEO_DIMENSIONS.height
        },
        width: {
            type: Number, default: DEFAULT_VIDEO_DIMENSIONS.width
        },
        quality: {
            type: Number, min: 1, max: 100
        }
    }
}, {timestamps: true})

const Video = models?.Video || model("Video", videoSchema)