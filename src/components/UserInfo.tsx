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
            <div className="flex items-center gap-2 border rounded-2xl p-2">
                <Image
                    src={session?.user?.image || profile}
                    width={30}
                    height={15}
                    alt="User profile"
                    className="rounded-full"
                />
                <span className="font-bold">{session?.user?.name}</span> <br />
                {/* Email: <span>{session?.user?.email}</span> */}
            </div>
            <Button
                variant="outline"
                onClick={() => signOut()}
                className="font-bold mt-2 w-full cursor-pointer"
            >
                <BiLogOut /> Log Out
            </Button>
        </div>
    );
}
