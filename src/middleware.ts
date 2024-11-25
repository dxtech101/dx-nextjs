import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

const protectedRoutes = ["/developer/dashboard"];
const privateRoutes = ["/developer/login"];

export default function middleware(req: NextRequest) {
  const cookieStore = cookies()
  const isUserAuthenticated = cookieStore.get('userToken')

  if (!isUserAuthenticated && protectedRoutes.includes(req?.nextUrl?.pathname)) {
    const absoluteUrl = new URL("/developer/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if(isUserAuthenticated && privateRoutes.includes(req?.nextUrl?.pathname)) {
    const absoluteUrl = new URL("/developer/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}