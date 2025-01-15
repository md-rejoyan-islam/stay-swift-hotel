import User from "@/models/users.model";
import connectDB from "@/services/mongo";
import { hashPassword } from "@/utils/hash-password";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    await connectDB();

    const user = await User.findOne({
      email: body.email,
    });

    if (user) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        {
          status: 409,
        }
      );
    }

    await User.create({
      ...body,
      password: await hashPassword(body.password),
    });

    return new NextResponse("User created successfully", {
      status: 201,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, {
      status: 500,
    });
  }
};
