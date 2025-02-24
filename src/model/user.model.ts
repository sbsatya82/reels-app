import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";


export interface IUser{
  username: string;
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  created_at?: Date;
  updated_at?: Date;
}


const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    match: /^[a-zA-Z0-9]+$/ // Only allow alphanumeric characters and underscores
  },
  email:{
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Hide the password from the output
  }
},{ timestamps : true });



userSchema.pre('save', async function (next) {
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

const User = models?.User || model<IUser>("User", userSchema);

export default User;