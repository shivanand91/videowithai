import { ConnectToDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST (request: NextRequest){
   try {
       const { email, password } = await request.json()
       if (!email || !password) {
           return new Response('Email and password are required', {
               status: 400,
               
       }
   } catch (error) {
    
   }
}