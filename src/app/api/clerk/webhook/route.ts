import { NextResponse } from "next/server";

type UserType = {
  data: {
    email: string;
    firstName: string;
    lastName: string;
  };
};
export const POST = async (request: Request) => {
  const userBody: UserType = (await request.json()) as UserType;
  console.log("clerk sending data", userBody);
  return NextResponse.json({ message: "", data: userBody }, { status: 201 });
};
