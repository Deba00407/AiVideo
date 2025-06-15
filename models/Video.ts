import {model, Schema, models} from "mongoose";
import { DEFAULT_VIDEO_DIMENSIONS, type FileType } from "../types";

const videoSchema = new Schema<FileType>({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true, 
        maxlength: 4096
    }, 

    tags: [{type: String}],

    fileURL: {
        type: String,
        required: true
    },

    thumbnailURL: {
        type: String,
        required: true
    },

    category: {
        type: String
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

export default Video