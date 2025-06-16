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
import { RegisterFormValidationSchema } from "../../../../validationSchemas"
import { useCallback, useState, useRef } from "react"
import axios from "axios"
import debounce from "debounce"



export default function SignUpPage() {

    const [creatingAccount, setcreatingAccount] = useState(false)
    const [available, setAvailable] = useState<boolean | null>(null)

    const latestUsername = useRef("")

    const registerNewUser = async (values: z.infer<typeof RegisterFormValidationSchema>) => {
        try {
            await axios.post("/api/register", {
                username: values.username,
                email: values.email,
                password: values.password
            });

            toast.success("Account created successfully. Please Login now")
            reset()
        } catch (err) {
            toast.error("Error occured while registering user");
            console.error(err)
        } finally {
            setcreatingAccount(false);
            setAvailable(null)
        }
    }

    function onSubmit(values: z.infer<typeof RegisterFormValidationSchema>) {
        setcreatingAccount(true);
        registerNewUser(values);
    }

    const checkUsername = useCallback(async (value: string) => {
        latestUsername.current = value;
        try {
            const response = await axios.post("/api/checkUsername", { username: value });
            if (latestUsername.current === value) {
                setAvailable(response.data?.available ?? false);
            }
        } catch (error) {
            console.error("Username check failed", error);
            setAvailable(false);
        }
    }, []);

    const checkUsernameDebounced = useCallback(
        debounce((value: string) => {
            if (value.length >= 8) {
                checkUsername(value);
            }
        }, 500),
        [checkUsername]
    );


    const form = useForm<z.infer<typeof RegisterFormValidationSchema>>({
        resolver: zodResolver(RegisterFormValidationSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    })

    const { reset } = form


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
                                            className="w-full bg-transparent dark:text-white rounded-md px-3 py-2 text-sm placeholder-white focus:outline-none focus:ring-0"
                                            value={field.value || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                field.onChange(value);

                                                checkUsernameDebounced(value);
                                                if (value.length < 8) {
                                                    setAvailable(null);
                                                }
                                            }}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                    {field.value && available !== null && (
                                        <p
                                            className={`text-xs mt-1 ${available
                                                ? 'text-green-400'
                                                : 'text-red-400'
                                                }`}
                                        >
                                            {available
                                                ? 'Username available'
                                                : 'Username is already taken'}
                                        </p>
                                    )}
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
                            disabled={!!!available}
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

                        <div className="text-center mt-6">
                            <span className="text-sm text-gray-400">Already have an account? </span>
                            <Link href={"/login"} className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>

        <Toaster position="bottom-right" />
    </>
}