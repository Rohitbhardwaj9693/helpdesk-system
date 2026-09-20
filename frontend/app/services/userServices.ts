const API_URL = "http://127.0.0.1:8000/api";

export interface User {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  is_active: boolean;
  last_login: string | null;
  date_joined: string;
}

export interface UserResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

// export async function getUsers(): Promise<UserResponse> {
//   const response = await fetch(`${API_URL}/users/`);

//   if (!response.ok) {
//     throw new Error("Failed to fetch users");
//   }

//   return response.json();
// }

export async function getUsers(): Promise<UserResponse> {
  const token = localStorage.getItem("access");

  const response = await fetch(`${API_URL}/users/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}