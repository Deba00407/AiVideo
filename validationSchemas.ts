import { z } from "zod"

const RegisterFormValidationSchema = z.object({
    username: z.string()
        .min(8, {
            message: "Username must be atleast 8 characters long"
        }).max(20, {
            message: "Username cannot have more than 10 characters"
        }).regex(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\\/]/
            , {
                message: "Username must contain atleast 1 special character"
            }),

    email: z.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, {
        message: "Email address is invalid"
    }),

    password: z.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"})
})

export {
    RegisterFormValidationSchema
}