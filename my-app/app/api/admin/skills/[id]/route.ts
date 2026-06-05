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

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, { params }: RouteParams) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const response = await fetch(
    `https://shikoskillsapi.azurewebsites.net/Skills/${id}`,
    {
      method: "DELETE",
      headers: {
        "x-api-key": process.env.SKILLS_API_KEY!,
      },
    }
  );

  if (response.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await response.text();

  return new NextResponse(data, {
    status: response.status,
  });
}