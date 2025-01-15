import { UserType } from "@/lib/types";
import User from "@/models/users.model";
import mongoose from "mongoose";

export const getUserByEmail = async (email: string) => {
  const user = await User.findOne<Promise<UserType>>({
    email: email,
  }).lean();

  if (!user) return new Error("User not found");

  return {
    ...user,
    _id: (user._id as mongoose.Types.ObjectId).toString(),
  };
};
