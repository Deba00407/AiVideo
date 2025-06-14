import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const authParams = getUploadAuthParams({
            privateKey: process.env.PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string
        })

        return NextResponse.json({ authParams, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
    } catch (error) {
        console.error("Failed to generate auth params for file upload")
        return NextResponse.json({
            "message": "Failed to generate auth params for file upload"
        }, { status: 400 })
    }
}