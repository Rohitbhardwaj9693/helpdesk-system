

"use client";

import { useEffect, useState } from "react";
import {
  getCustomers,
  Customer,
} from "../services/customerServices";
import { createCustomer } from "../services/customerServices";


export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [totalCount, setTotalCount] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 10;

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers(
        search,
        status,
        page,
        limit
      );

      setCustomers(response.results);
      setTotalCount(response.count);
      setNextPage(response.next);
      setPreviousPage(response.previous);
    } catch (error) {
      console.error(error);
      setError("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [search, status, page]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };



  const avatarColors = [
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
  ];

  const getAvatarColor = (index: number) => {
    return avatarColors[index % avatarColors.length];
  };

  // Add Customer
  const [showAddModal, setShowAddModal] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    company: "",
    is_active: true,
  });

  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState("");

  // handle Customer Chnage
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Create Customer
  const handleCreateCustomer = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setCreating(true);
      setFormError("");

      await createCustomer(formData);

      // Close modal
      setShowAddModal(false);

      // Clear form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        company: "",
        is_active: true,
      });

      // Refresh customer list
      setPage(1);
      fetchCustomers();
    } catch (error) {
      console.error(error);
      setFormError("Failed to create customer");
    } finally {
      setCreating(false);
    }
  };
  return (
    <div className="min-h-full bg-[#f4f7fb] p-6">
      {/* Page Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-[#111827]">
            Customers
          </h1>

          <p className="mt-1 text-sm text-[#64748b]">
            Manage your customer accounts
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setFormError("");
            setShowAddModal(true);
          }}
          className="rounded-lg bg-[#155eef] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#1254d8]"
        >
          <span className="mr-1">+</span>
          Add Customer
        </button>
      </div>

      {/* Main Card */}
      <div className="overflow-hidden rounded-xl border border-[#dbe3ee] bg-white shadow-sm">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4 border-b border-[#e5eaf1] p-4">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search customers..."
                className="h-9 w-[256px] rounded-lg border border-[#cbd5e1] bg-white pl-9 pr-3 text-sm text-[#334155] outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={handleStatusChange}
              className="h-9 w-[125px] rounded-lg border border-[#cbd5e1] bg-white px-3 text-sm text-[#334155] outline-none focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Export */}
          <button
            type="button"
            className="h-9 rounded-lg border border-[#cbd5e1] bg-white px-4 text-sm font-medium text-[#334155] hover:bg-[#f8fafc]"
          >
            ↥ Export
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] border-collapse">
            <thead>
              <tr className="border-b border-[#e5eaf1] bg-white">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Customer
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Phone
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Total Tickets
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Open
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Status
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Created
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-[#64748b]"
                  >
                    Loading customers...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-10 text-center text-sm text-[#64748b]"
                  >
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className="border-b border-[#edf1f5] last:border-b-0 hover:bg-[#fafcff]"
                  >
                    {/* Customer */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white ${getAvatarColor(
                            index
                          )}`}
                        >
                          {getInitials(customer.full_name)}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#172033]">
                            {customer.full_name}
                          </p>

                          <p className="text-xs text-[#64748b]">
                            {customer.company || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-4 text-sm text-[#334155]">
                      {customer.email}
                    </td>

                    {/* Phone */}
                    <td className="px-4 py-4 text-sm text-[#334155]">
                      {customer.phone || "—"}
                    </td>

                    {/* Total Tickets */}
                    <td className="px-4 py-4 text-sm font-semibold text-[#172033]">
                      —
                    </td>

                    {/* Open */}
                    <td className="px-4 py-4 text-sm text-[#334155]">
                      —
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      {customer.is_active ? (
                        <span className="inline-flex rounded-full bg-[#d1fae5] px-2.5 py-1 text-xs font-medium text-[#047857]">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-[#f1f5f9] px-2.5 py-1 text-xs font-medium text-[#475569]">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Created */}
                    <td className="px-4 py-4 text-sm text-[#64748b]">
                      {new Date(
                        customer.created_at
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="text-lg leading-none text-[#64748b] hover:text-[#172033]"
                      >
                        ⋮
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && customers.length > 0 && (
          <div className="flex items-center justify-between border-t border-[#e5eaf1] px-4 py-3">
            <p className="text-sm text-[#64748b]">
              Total customers:{" "}
              <span className="font-medium text-[#334155]">
                {totalCount}
              </span>
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!previousPage}
                onClick={() =>
                  setPage((current) => Math.max(1, current - 1))
                }
                className="rounded-lg border border-[#cbd5e1] px-3 py-1.5 text-sm text-[#334155] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-lg bg-[#155eef] px-3 py-1.5 text-sm font-medium text-white">
                {page}
              </span>

              <button
                type="button"
                disabled={!nextPage}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-[#cbd5e1] px-3 py-1.5 text-sm text-[#334155] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="w-full max-w-[495px] rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e5eaf1] px-6 py-4">
              <h2 className="text-base font-semibold text-[#172033]">
                Add Customer
              </h2>

              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-xl text-[#64748b] hover:text-[#172033]"
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateCustomer}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 px-6 py-6">
                {/* Full Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#334155]">
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="h-10 w-full rounded-lg border border-[#cbd5e1] px-3 text-sm text-[#334155] outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#334155]">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="h-10 w-full rounded-lg border border-[#cbd5e1] px-3 text-sm text-[#334155] outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#334155]">
                    Phone
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="h-10 w-full rounded-lg border border-[#cbd5e1] px-3 text-sm text-[#334155] outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[#334155]">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Corp"
                    className="h-10 w-full rounded-lg border border-[#cbd5e1] px-3 text-sm text-[#334155] outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                  />
                </div>
              </div>

              {/* Error */}
              {formError && (
                <div className="mx-6 mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                  {formError}
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 border-t border-[#e5eaf1] px-6 py-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-lg border border-[#cbd5e1] px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-lg bg-[#155eef] px-4 py-2 text-sm font-medium text-white hover:bg-[#1254d8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {creating ? "Adding..." : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}