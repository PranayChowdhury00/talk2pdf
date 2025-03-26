"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { BiLogOut } from "react-icons/bi";
import profile from "../../public/profile.jpg";

export default function UserInfo() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div>
                <Image
                    src={session?.user?.image || profile}
                    width={60}
                    height={60}
                    alt="User profile"
                    className="rounded-full"
                />
            </div>
            <div className="font-bold ">
                Name:{" "}
                <span className="text-violet-500">{session?.user?.name}</span>{" "}
                <br />
                {/* Email: <span>{session?.user?.email}</span> */}
            </div>
            <Button
                onClick={() => signOut()}
                className="bg-red-500 text-white font-bold mt-2 w-full"
            >
                <BiLogOut /> Log Out
            </Button>
        </div>
    );
}
