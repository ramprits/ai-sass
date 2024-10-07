import { NextResponse } from "next/server";
import { db } from "~/server/db";

type UserType = {
  data: {
    first_name: string;
    last_name: string;
    email_addresses?: [
      {
        email_address: string;
      },
    ];
    gender?: string | null;
    image_url?: string | null;
  };
};

export const POST = async (request: Request) => {
  const userBody = (await request.json()) as UserType;
  const { data } = userBody;
  try {
    const createdUser = await db.user.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data?.email_addresses?.at(0)?.email_address,
        gender: data.gender,
        image_url: data.image_url,
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
