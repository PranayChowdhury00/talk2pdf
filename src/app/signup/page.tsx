// import { GalleryVerticalEnd } from "lucide-react";

// ----------------------------------------------------SignUp page-------------------------------------------------------------------
import logo from "@/app/assets/PDF.jpg";
import { SignupForm } from "@/components/signup-form";
import Image from "next/image";

export default function Signup() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full">
                        {/* <LoginForm /> */}
                        <SignupForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block w-full h-full">
                {/* <Image
          src={logo}
          alt="Talk2PDF Signup Logo"
          layout="fill"
          objectFit="cover" // Ensures it covers the whole area
          priority
        /> */}
                <Image
                    src={logo}
                    fill // ✅ Replaces "layout='fill'"
                    style={{ objectFit: "cover" }} // ✅ Replaces "objectFit='cover'"
                    alt="Description"
                />
            </div>
        </div>
    );
}
