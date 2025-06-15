import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/dbConnect";
import VideoModel from "../../../../models/Video"
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/authOptions";
import { DEFAULT_VIDEO_DIMENSIONS, FileType } from "../../../../types";

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({
                "message": "User is not authorized"
            }, { status: 400 })
        }
        
        await connectToDB()

        const videos = await VideoModel.find().sort({ createdAt: -1 }).lean()
        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 })
        }

        return NextResponse.json({
            videos
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            "message": "Failed to get videos data"
        }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({
                "message": "User is not authorized"
            }, { status: 400 })
        }

        await connectToDB()

        const body: FileType = await req.json()
        console.log("Received data: ", body)

        if(!body.fileURL || !body.thumbnailURL){
            return NextResponse.json({
                "message": "Upload files are missing"
            }, { status: 400 })
        }

        const videoData = {
            ...body,
            controls: body.controls ?? true,
            transformation: {
                height: body.transformation?.height ?? DEFAULT_VIDEO_DIMENSIONS.height,
                width: body.transformation?.width ?? DEFAULT_VIDEO_DIMENSIONS.width,
                quality: body.transformation?.quality ?? 100
            }
        }

        await VideoModel.create(videoData)

        return NextResponse.json({
            "message": "Video record created successfully"
        }, {status: 201})

    } catch (error) {
        return NextResponse.json({
            "message": "Video record creation failed"
        }, {status: 500})
    }
}