const API_URL = "http://127.0.0.1:8000/api";

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access: string;
  refresh: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    role: string;
    department: string;
  };
}

export async function loginUser(
  data: LoginData
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
}