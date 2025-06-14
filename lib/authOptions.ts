import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./dbConnect";
import { User } from "../models/User";
import bcrypt from "bcryptjs"

import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },

            // authorization logic
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.email || !credentials?.password) {
                    throw new Error("All fields are required")
                }

                try {
                    await connectToDB()

                    const { username, email, password } = credentials

                    const user = await User.findOne({ $or: [{ email }, { username }] })
                    if (!user) {
                        throw new Error("User not found for the given credentials")
                    }

                    // validate password
                    const user_pass_validated = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (!user_pass_validated) {
                        throw new Error("Password entered was incorrect")
                    }

                    return {
                        id: user._id.toString(),
                        username: user.username,
                        email: user.email
                    }
                } catch (error) {
                    console.error("Error authenticating user")
                    throw error
                }
            },
        }),

        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT as string,
            clientSecret: process.env.GITHUB_SECRET as string
        })
    ],

    callbacks: {
        async jwt({token, user}) {
            if(user){
                token.id = user.id
            }

            return token
        },

        async session({session, token}){
            if(session.user){
                session.user.id = token.id as string
            }
            return session
        },

        async redirect({url, baseUrl}){
            return url.startsWith(baseUrl) ? url : `${baseUrl}/${url}`
        }
    },

    pages: {
        signIn: "/sign-in",
        error: "/sign-in"
    },

    session:{
        strategy: "jwt",
        maxAge: 2 * 24 * 60 * 60 
    },

    secret: process.env.NEXTAUTH_SECRET
}