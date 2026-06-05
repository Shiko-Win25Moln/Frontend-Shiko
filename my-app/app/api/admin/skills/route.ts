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

function isAdminRole(role?: string) {
  return role === "Admin" || role === "Administrator";
}

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const role = getRole(decoded);

    return isAdminRole(role);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();

  const response = await fetch(
    "https://shikoskillsapi.azurewebsites.net/AddSkills",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.SKILLS_API_KEY!,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json().catch(() => null);

  return NextResponse.json(data, {
    status: response.status,
  });
}