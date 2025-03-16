"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    return (
        <form
            className={cn(
                "flex flex-col gap-8 px-4 py-6 rounded-lg bg-muted",
                className
            )}
            {...props}
            noValidate
        >
            <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Create your account by entering your email and password
                    below.
                </p>
            </div>
            <div className="flex flex-col gap-6">
                <div className="relative">
                    <Input
                        id="email"
                        type="email"
                        required
                        className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
                        placeholder=" " // Set an empty placeholder so that the label shows up
                    />
                    <label
                        htmlFor="email"
                        className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
               peer-focus:-top-3  px-2 peer-focus:bg-muted"
                    >
                        Email Address
                    </label>
                </div>
                <div className="relative">
                    <Input
                        id="password"
                        type="password"
                        placeholder=""
                        required
                        aria-required="true"
                        className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
                    />
                    <label
                        htmlFor="password"
                        className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                        peer-focus:-top-3  px-2 peer-focus:bg-muted"
                    >
                        Password
                    </label>
                </div>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder=""
                        required
                        aria-required="true"
                        className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
                    />
                    <label
                        htmlFor="confirmPassword"
                        className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
               peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
               peer-focus:-top-3  px-2 peer-focus:bg-muted"
                    >
                        Confirm Password
                    </label>
                </div>
                <div className="text-right">
                    <Link
                        href="#"
                        className="text-sm text-violet-600 hover:underline"
                    >
                        Forgot your password?
                    </Link>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-violet-500 hover:bg-violet-600"
                >
                    Sign Up
                </Button>
                <div className="relative text-center text-sm">
                    <span className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-300" />
                    </span>
                    <span className="relative bg-muted px-2 text-gray-500">
                        Or continue with
                    </span>
                </div>
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                >
                    <FaGoogle className="h-5 w-5" />
                    <span>Continue with Google</span>
                </Button>
            </div>
            <div className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-violet-600 hover:underline">
                    Log in
                </Link>
            </div>
        </form>
    );
}
