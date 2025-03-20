"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
// import User from "./../models/user";
// import User from "./../lib/mongodb"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // state info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // Submit info
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All Input field must be fill-up.");
      return;
    }

    // API call
    try {
      const resUserExist = await fetch("api/userExist", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const { user } = await resUserExist.json();

      if (user) {
        setError("User already exist.");
        return;
      }

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.ok) {
        const form = e.target as HTMLFormElement;
        form.reset();
        router.push("/");

        alert("User registered successfully!");
      } else {
        alert("User registration failed.");
      }
    } catch (err) {
      alert("Error during registration:" + err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col gap-8 px-4 py-6 rounded-lg bg-muted",
        className
      )}
      {...props}
      noValidate
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-gray-800 ">Sign Up</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create your account by entering your email and password below.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="relative">
          <Input
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="name"
            required
            className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
            placeholder="Enter Full Name"
          />
        </div>
        <div className="relative">
          <Input
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="relative">
          <Input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            aria-required="true"
            className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
          />
        </div>
        {/* <div className="relative">
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
            aria-required="true"
            className="peer block w-full border border-gray-300 rounded-md p-3 focus:border-none focus:outline-none"
          />
        </div> */}
        {error && (
          <div className="text-left w-fit py-1 px-3 rounded-md text-sm text-white bg-red-500">
            {error}
          </div>
        )}

        <div className="text-right">
          <Link href="#" className="text-sm text-violet-600 hover:underline">
            Forgot your password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-violet-500 hover:bg-violet-600"
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
