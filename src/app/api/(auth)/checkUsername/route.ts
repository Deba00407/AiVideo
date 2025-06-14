import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import { connectToDB } from "../../../../../lib/dbConnect";

export async function GET(req: NextRequest) {
    try {
        const { username } = await req.json()
        try {
            await connectToDB()

            const existingUsername = await User.exists({ username: username.trim() })
            return NextResponse.json({
                available: !existingUsername
            }, { status: 200 })
        } catch (error) {
            throw new Error("Unable to check for usernames")
        }
    } catch (error) {
        throw new Error("Failed operation for validating usernames")
    }
}