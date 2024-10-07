import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "~/server/db";

type UserType = {
  data: Prisma.UserCreateInput;
};

export const POST = async (request: Request) => {
  const userBody = (await request.json()) as UserType;
  const { data } = userBody;
  try {
    const createdUser = await db.user.create({
      data: {
        ...data,
      },
    });
    return NextResponse.json(
      { message: "User created successfully", data: createdUser },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create user", error: error },
      { status: 400 },
    );
  }
};
