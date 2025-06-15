"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2Icon } from "lucide-react"
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { LoginFormValidationSchema } from "../../../../validationSchemas"
import { signIn } from "next-auth/react"

export default function LoginPage() {
    const [loggingIn, setLoggingIn] = useState(false)

    const loginUser = async (values: z.infer<typeof LoginFormValidationSchema>) => {
        try {

            await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: "/home"
            })

            toast.success("Login successful!")
            reset()
        } catch (err) {
            toast.error("Login failed")
            console.error(err)
        } finally {
            setLoggingIn(false);
        }
    }

    function onSubmit(values: z.infer<typeof LoginFormValidationSchema>) {
        setLoggingIn(true);
        loginUser(values);
    }

    const form = useForm<z.infer<typeof LoginFormValidationSchema>>({
        resolver: zodResolver(LoginFormValidationSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const { reset } = form

    return <>
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-xl p-8">
                <span className="dark:text-white font-semibold block mb-6 text-3xl">Sign In</span>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            className="w-full bg-transparent dark:text-white rounded-md px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-0"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter password"
                                            className="w-full bg-transparent dark:text-white rounded-md px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-0"
                                            value={field.value || ''}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full text-sm rounded-md"
                        >
                            {loggingIn ? (
                                <>
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                    Signing In
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>

                        <div className="text-center mt-6">
                            <span className="text-sm text-gray-400">Don&apos;t have an account? </span>
                            <Link href={"/register"} className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>

        <Toaster position="bottom-right" />
    </>
}