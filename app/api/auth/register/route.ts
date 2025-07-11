import { ConnectToDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 }

            )
        }
        
        if (password.length < 6) {
            return NextResponse.json({ error: "Password must be at least 6 characters long" }, { status: 400 })
        }

        await ConnectToDB();
        const existingUser = await User.findOne({ email: email });
        
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 })
        }

        await User.create({
            email: email,
            password: password
        })
        return NextResponse.json({ message: "User registered successfully" }, { status: 201 })

    } catch (error) {
        console.error("Error in registration:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}