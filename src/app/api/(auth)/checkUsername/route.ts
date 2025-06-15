import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import { connectToDB } from "../../../../../lib/dbConnect";

export async function POST(req: NextRequest) {
    try {
        const { username } = await req.json()
        
        await connectToDB()

        const existingUsername = await User.exists({ username: username.trim() })
        return NextResponse.json({
            available: !existingUsername
        }, { status: 200 })

    } catch (error) {
        console.log("Failed operation for validating usernames")
        return NextResponse.json({
            message: "Failed operation for validating usernames"
        }, { status: 500 })
    }
}