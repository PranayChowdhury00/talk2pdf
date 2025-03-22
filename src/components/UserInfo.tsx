// "use client";

// import { SessionProvider, signOut, useSession } from "next-auth/react";
// import { Button } from "./ui/button";
// export default function UserInfo() {
//   const { data: session } = useSession();
//   return (
//     <SessionProvider>
//       {" "}
//       <div>
//         <div className="font-bold pl-14">
//           Name: <span>{session?.user?.name}</span> <br></br>
//           Email: <span>{session?.user?.email}</span>
//         </div>
//         <Button
//           onClick={() => signOut()}
//           className="bg-red-500 text-white font-bold"
//         >
//           Log Out
//         </Button>
//       </div>
//     </SessionProvider>
//   );
// }

// ===========================
// components/UserInfo.tsx
"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function UserInfo() {
  const { data: session, status } = useSession();

  // Show loading state while session is loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Show content when session is available
  return (
    <div>
      <div className="font-bold pl-14">
        Name: <span>{session?.user?.name}</span> <br />
        Email: <span>{session?.user?.email}</span>
      </div>
      <Button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold"
      >
        Log Out
      </Button>
    </div>
  );
}
