const API_URL = "http://127.0.0.1:8000/api";

export interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
}

export interface CreateCategoryData {
  name: string;
  description: string;
  color: string;
  is_active: boolean;
}

export async function createCategory(
  data: CreateCategoryData
): Promise<Category> {
  const token = localStorage.getItem("access");

  const response = await fetch(`${API_URL}/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}

export async function getCategories(
  page = 1,
  limit = 10
): Promise<CategoryResponse> {
  const token = localStorage.getItem("access");

  const response = await fetch(
    `${API_URL}/categories/list/?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}