import {model, Schema, models} from "mongoose";
import type { UserType } from "../types";
import bcrypt from "bcryptjs";

const userSchema = new Schema<UserType>({
    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    }
}, {timestamps: true})

// Defining a prehook for the user password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

// Edge function friendly
const User = models?.User || model<UserType>("User", userSchema)

export {User}