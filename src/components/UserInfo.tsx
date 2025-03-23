"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function UserInfo() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="font-bold ">
        Name: <span>{session?.user?.name}</span> <br />
        Email: <span>{session?.user?.email}</span>
      </div>
      <Button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold mt-2"
      >
        Log Out
      </Button>
    </div>
  );
}
