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

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RegisterFormValidationSchema } from "../../../../validationSchemas"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import axios from "axios"



export default function SignUpPage() {

    const [creatingAccount, setcreatingAccount] = useState(false)

    const registerNewUser = async (values: z.infer<typeof RegisterFormValidationSchema>) => {
        try {
            await axios.post("/api/register", {
                username: values.username,
                email: values.email,
                password: values.password
            });

            toast.success("Account created successfully")
        } catch (err: any) {
            toast.error(err.response.data.error);
        } finally {
            setcreatingAccount(false);
        }
    }

    function onSubmit(values: z.infer<typeof RegisterFormValidationSchema>) {
        setcreatingAccount(true);
        registerNewUser(values);
    }


    const form = useForm<z.infer<typeof RegisterFormValidationSchema>>({
        resolver: zodResolver(RegisterFormValidationSchema),
    })


    return <>
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md  rounded-xl p-8">
                <span className="dark:dark:text-white font-semibold block mb-6 text-3xl">Register</span>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter username"
                                            className="w-full bg-transparent  dark:text-white rounded-md px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-0"
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
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            className="w-full bg-transparent  dark:text-white rounded-md px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-0"
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
                                            className="w-full bg-transparent  dark:text-white rounded-md px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-0"
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
                            {creatingAccount ? (
                                <>
                                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                                    Creating Account
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </Button>

                        <Button
                            type="button"
                            onClick={() => signIn("github", { redirect: true })}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2 text-sm rounded-md dark:bg-white dark:text-black hover:dark:bg-gray-300 bg-[#F8FAFC]"
                        >
                            <Image src="/github.svg" alt="GitHub logo" height={20} width={20} />
                            Sign in with GitHub
                        </Button>
                    </form>
                </Form>
            </div>
        </div>

        <Toaster position="bottom-right" />
    </>
}