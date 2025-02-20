import connectDB from '@/utils/connectDB.js';
import User from '@/models/user.model.js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';




export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if(!email || !password) {
      return new NextResponse.json(
        { message: 'All fields are required.' },
        {status: 404}
      );
    }

    await connectDB();
    const user = await User.findOne({ email });
    if(!user) {
      return new NextResponse.json(
        { message: 'User not found.' },
        {status: 404}
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return new NextResponse.json(
        { message: 'Invalid credentials.' },
        {status: 401}
      );
    }


    
  } catch (error) {
    
  }
}