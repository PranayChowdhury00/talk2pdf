import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        // console.log("Name:", name);
        // console.log("Email:", email);
        // console.log("Password:", password);

        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json(
            { message: "User registered." },
            { status: 201 }
        );
    } catch {
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
}
