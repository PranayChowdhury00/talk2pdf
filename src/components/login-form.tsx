"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                {/* Floating Email Input */}
                <div className="relative">
                    <Input
                        id="email"
                        type="email"
                        placeholder=" " // empty placeholder triggers the peer selectors
                        required
                        className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
                    />
                    <Label
                        htmlFor="email"
                        className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                        peer-focus:-top-3  px-2 peer-focus:bg-muted"
                    >
                        Email
                    </Label>
                </div>
                {/* Floating Password Input with Forgot Link */}
                <div className="relative">
                    <Input
                        id="password"
                        type="password"
                        placeholder=" "
                        required
                        className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
                    />
                    <Label
                        htmlFor="password"
                        className="absolute left-3 top-3 text-gray-500 transition-all duration-200 
                        peer-placeholder-shown:top-2 peer-placeholder-shown:text-sm
                        peer-focus:-top-3  px-2 peer-focus:bg-muted"
                    >
                        Password
                    </Label>
                    <div className="absolute inset-y-0 right-3 flex items-center">
                        <Link
                            href="#"
                            className="text-sm text-violet-600 hover:underline"
                        >
                            Forgot?
                        </Link>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full bg-violet-500 hover:bg-violet-600"
                >
                    Login
                </Button>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-muted px-2 text-muted-foreground">
                        Or continue with
                    </span>
                </div>
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                >
                    <FaGoogle className="h-5 w-5" />
                    <span>Login with Google</span>
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="underline underline-offset-4 text-violet-500"
                >
                    Sign up
                </Link>
            </div>
        </form>
    );
}
