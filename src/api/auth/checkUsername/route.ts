import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../models/User";

export async function GET(req: NextRequest) {
    try {
        const { username } = await req.json()
        try {
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