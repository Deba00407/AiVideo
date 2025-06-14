import { NextRequest, NextResponse } from "next/server";
import { User } from "../../../../../models/User";
import { connectToDB } from "../../../../../lib/dbConnect";

export async function POST(req: NextRequest) {
    try {
        const { username, email, password } = await req.json()

        // Basic validation
        if (!email || !password || !username) {
            return NextResponse.json(
                { "error": "Username, Email and Password fields are required" }, { status: 400 })
        }

        await connectToDB()

        // check for existing user
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { "error": "User already exists. Please log in" }, { status: 400 })
        }

        // Create new user
        await User.create({ username, email, password })
        return NextResponse.json(
            { "message": "User created successfully" }, { status: 201 })

    } catch (err) {
        console.error("User registration failed:", err)
        return NextResponse.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        "message": "Hello World"
    }, {status: 200})
}