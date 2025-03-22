"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  //   submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!res || res.error) {
        setError("Invalid Credentials");
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6 ", className)}
      {...props}
    >
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
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Email" // empty placeholder triggers the peer selectors
            // required
            className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
          />
        </div>
        {/* Floating Password Input with Forgot Link */}
        <div className="relative">
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password "
            // required
            className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
          />

          <div className="absolute inset-y-0 right-3 flex items-center">
            <Link href="#" className="text-sm text-violet-600 hover:underline">
              Forgot?
            </Link>
          </div>
        </div>

        {error && (
          <div className="text-left w-fit py-1 px-3 rounded-md text-sm text-white bg-red-500">
            {error}
          </div>
        )}

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
