import { authOptions } from "@/lib/auth";
import { connectToDB } from "@/lib/db";
import Video, { IVideo } from "@/model/video.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
  try {
    await connectToDB();
    const videos = await Video.find({}).sort({createdAt: -1}).lean();
    if(!videos || videos.length === 0){
      return NextResponse.json([], {status: 200});
    }
    return NextResponse.json(videos, {status: 200});
  }
  catch (err) {
    console.log(err);
    return NextResponse.json({error: "Faild to fatch"}, {status:400}); //
  }
}

export async function POST(request: NextRequest){
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        {error:"Unauthorized"},
        {status:401},
      );
    }

    await connectToDB();
    const body:IVideo = await request.json();

    if(!body.title ||!body.description ||!body.videoUrl ||!body.thumbnailUrl){
      return NextResponse.json(
        {message: "All fields are required"},
        {status: 404},
      )
    }

    const videoData = {
      ...body,
      controls: body.controls ?? true,
      dimensions: {
        heeight: 1980,
        width: 1080,
        quality: body.dimensions?.quality ?? 100 
      }
    }
    const newVideo =await Video.create(videoData);
    return NextResponse.json(newVideo, {status: 201});

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Faild to create video" },
      { status: 400 }
    );
  }
}