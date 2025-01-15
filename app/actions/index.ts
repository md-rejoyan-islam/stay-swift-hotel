"use server";
import { signIn } from "@/lib/auth";
import User from "@/models/users.model";
import { verifyPassword } from "@/utils/hash-password";
import { AuthError } from "next-auth";

export async function login(data: { email: string; password: string }) {
  const user = await User.findOne({
    email: data.email,
  });

  if (!user) {
    throw new Error("Couldn't find any user");
  }

  if (!user?.password) {
    throw new Error("Please sign in with your social account");
  }

  // compare the password
  const isValid = await verifyPassword(data.password, user.password);

  if (!isValid) {
    throw new Error("Invalid password");
  }

  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      // redirect: true, // Prevents automatic redirect
      // redirectTo: "/",
    });
    return response;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}

import Hotel from "@/models/hotel.model";
import Review from "@/models/review.model";
import mongoose from "mongoose";

interface Review {
  content: string;
  rating: number;
  user: string;
  hotel: string;
}

export async function giveReview(data: Review) {
  const { hotel, user } = data;
  try {
    // check hotel and user
    const userExists = await User.exists({
      _id: user,
    });

    if (!userExists) {
      throw new Error("User not found");
    }

    const hotelExists = await Hotel.exists({
      _id: hotel,
    });

    if (!hotelExists) {
      throw new Error("Hotel not found");
    }
    const review = await Review.create({
      ...data,
    });

    const reviewData = await Review.findById<Promise<Review>>(review._id)
      .populate("user")
      .populate("hotel")
      .lean()
      .exec();

    if (!reviewData) {
      throw new Error("Review data not found");
    }

    return {
      message: "Review added successfully",
      status: "success",
      data: {
        ...reviewData,
        user: {
          ...reviewData.user,
          _id: reviewData.user._id.toString(),
        },
        hotel: {
          ...reviewData.hotel,
          _id: reviewData.hotel._id.toString(),
        },
        _id: (reviewData._id as mongoose.Types.ObjectId).toString(),
      },
    };
  } catch (error) {
    throw error;
  }
}
