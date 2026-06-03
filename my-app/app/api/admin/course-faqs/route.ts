import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

type JwtPayload = {
  role?: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
};

function getRole(decoded: JwtPayload) {
  return (
    decoded.role ??
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  );
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  let decoded: JwtPayload;

  try {
    decoded = jwtDecode<JwtPayload>(token);
  } catch {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (getRole(decoded) !== "Admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const response = await fetch(
    "https://shiko-coursefaq-webapp.azurewebsites.net/api/course-faqs",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.COURSE_FAQ_API_KEY!,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, {
    status: response.status,
  });
}