import { authOptions } from "@/lib/auth";
import { ConnectToDB } from "@/lib/db";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        await ConnectToDB();
        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if(!videos || videos.length === 0) {
            return Response.json({ message: "No videos found" }, { status: 200 });
        }

        return NextResponse.json({ videos });

    } catch (error) {
        console.error("Error fetching videos:", error);
        return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 });        
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);  // video timestamp 2:06:00 chai aur code for error
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await ConnectToDB();
        
        const body: IVideo = await request.json();

        if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            return NextResponse.json({ error: "Title, description, and video URL are required" }, { status: 400 });
        }

        const videoData: IVideo = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality || 100,
            },
        };

        const newVideo = await Video.create(videoData)
        
        return NextResponse.json({ message: "Video created successfully", video: newVideo }, { status: 201 });

    } catch (error) {
        console.error("Error creating video:", error);
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });        
    }
}