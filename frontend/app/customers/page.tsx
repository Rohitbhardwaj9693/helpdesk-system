"use client";

import { useEffect, useState } from "react";
import { getCustomers, Customer } from "../services/customerServices";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers();

      setCustomers(response.results);
    } catch (error) {
      console.error(error);
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) {
    return <div className="p-6">Loading customers...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-semibold">Customers</h1>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="space-y-3">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="rounded border p-4"
            >
              <p className="font-semibold">{customer.full_name}</p>
              <p>{customer.email}</p>
              <p>{customer.phone}</p>
              <p>{customer.company}</p>
              <p>
                {customer.is_active ? "Active" : "Inactive"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}