const API_URL = "http://127.0.0.1:8000/api";

export interface Customer {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  company: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[];
}

export interface CreateCustomerData {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  is_active: boolean;
}

export async function createCustomer(
  data: CreateCustomerData
): Promise<Customer> {
  const token = localStorage.getItem("access");

  const response = await fetch(`${API_URL}/customers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create customer");
  }

  return response.json();
}

export async function getCustomers(
  search = "",
  status = "",
  page = 1,
  limit = 10
): Promise<CustomerResponse> {
  const token = localStorage.getItem("access");

  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (status) params.append("status", status);

  params.append("page", String(page));
  params.append("limit", String(limit));

  const response = await fetch(
    `${API_URL}/customers/list/?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch customers");
  }

  return response.json();
}