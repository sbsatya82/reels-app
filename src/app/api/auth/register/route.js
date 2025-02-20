import connectDB from '@/utils/connectDB.js';
import User from '@/models/user.model.js';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';


export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: 'All fields are required.' },
        {status: 404});
    }
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists." }, { status: 400 });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return NextResponse.json({ message: "User registered successfully!", user: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to register user", error: error.message }, { status: 500 });
  }
}