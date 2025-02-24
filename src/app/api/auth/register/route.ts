import { NextRequest, NextResponse } from 'next/server';
import User from '@/model/user.model';
import { connectToDB } from '@/lib/db';



export async function POST( request : NextRequest ){
  try {
    const {username, email, password} = await request.json();
    if(!username || !password|| !email) {
      return NextResponse.json(
      {message: "All fields are required"},
      {status: 404}
      )
    }

    await connectToDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {message: "User already exists"},
        {status: 409}
      )
    }

    await User.create({ username,email, password});
    return NextResponse.json(
      { message: "User registered successfully" }, 
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Faild to register user" },
      { status: 500 }
    );
  }
}