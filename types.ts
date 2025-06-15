import mongoose from "mongoose"

export type UserType = {
    _id?: mongoose.Types.ObjectId
    email: string
    username: string
    password: string
    createdAt?: Date
    updatedAt?: Date
}

export type FileType = {
    _id?: mongoose.Types.ObjectId
    title: string
    description: string
    category: string
    tags: string[]
    fileURL: string
    thumbnailURL: string
    controls?: boolean
    transformation?: {
        height: number,
        width: number,
        quality?: number
    }
}

export const DEFAULT_VIDEO_DIMENSIONS = {
    height: 1920,
    width: 1080
} as const