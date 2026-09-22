"use client";
import ProtectedRoute from "../components/ProtectedRoute";
import { useEffect, useState } from "react";
import { getUsers, User } from "../services/userServices";
import RoleGuard from "../components/RoleGuard";
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const response = await getUsers();

      console.log("Users API response:", response);

      setUsers(response.results);
    } catch (error) {
      console.error("Users API error:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalUsers = users.length;

  const admins = users.filter(
    (user) => user.role === "ADMIN"
  ).length;

  const managers = users.filter(
    (user) => user.role === "MANAGER"
  ).length;

  const agents = users.filter(
    (user) => user.role === "AGENT"
  ).length;

  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={["ADMIN"]}>
        <div className="min-h-full bg-slate-100 p-6">

          {/* Page Heading */}
          <div className="mb-6 flex items-start justify-between">

            <div>
              <h1 className="text-[22px] font-bold text-slate-900">
                User Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage system users and their roles
              </p>
            </div>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              + Add User
            </button>

          </div>


          {/* Statistics */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <StatCard
              title="Total Users"
              value={totalUsers.toString()}
            />

            <StatCard
              title="Admins"
              value={admins.toString()}
            />

            <StatCard
              title="Managers"
              value={managers.toString()}
            />

            <StatCard
              title="Agents"
              value={agents.toString()}
            />

          </div>


          {/* Main Table Card */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

            {/* Search / Filter */}
            <div className="flex items-center gap-3 border-b border-slate-200 p-4">

              <div className="flex h-9 w-[255px] items-center rounded-md border border-slate-300 px-3">

                <svg
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

                <input
                  type="text"
                  placeholder="Search users..."
                  className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />

              </div>


              <select className="h-9 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-600 outline-none">

                <option>All Roles</option>
                <option>ADMIN</option>
                <option>MANAGER</option>
                <option>AGENT</option>

              </select>

            </div>


            {/* Loading */}
            {loading && (
              <div className="p-8 text-center text-sm text-slate-500">
                Loading users...
              </div>
            )}


            {/* Table */}
            {!loading && (
              <div className="overflow-x-auto">

                <table className="w-full min-w-[1050px]">

                  <thead>
                    <tr className="border-b border-slate-200">

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        USER
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        EMAIL
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        ROLE
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        DEPARTMENT
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        STATUS
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        LAST LOGIN
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        CREATED
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">
                        ACTIONS
                      </th>

                    </tr>
                  </thead>


                  <tbody>

                    {users.map((user) => (

                      <tr
                        key={user.id}
                        className="border-b border-slate-100 hover:bg-slate-50"
                      >

                        {/* User */}
                        <td className="px-4 py-3">

                          <div className="flex items-center gap-3">

                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                              {getInitials(user.full_name)}
                            </div>

                            <span className="text-sm font-semibold text-slate-900">
                              {user.full_name}
                            </span>

                          </div>

                        </td>


                        {/* Email */}
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {user.email}
                        </td>


                        {/* Role */}
                        <td className="px-4 py-3">

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.role === "ADMIN"
                              ? "bg-red-100 text-red-500"
                              : user.role === "MANAGER"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-blue-100 text-blue-600"
                              }`}
                          >
                            {user.role}
                          </span>

                        </td>


                        {/* Department */}
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {user.department || "-"}
                        </td>


                        {/* Status */}
                        <td className="px-4 py-3">

                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${user.is_active
                              ? "bg-emerald-100 text-emerald-600"
                              : "bg-red-100 text-red-500"
                              }`}
                          >

                            <span
                              className={`h-1.5 w-1.5 rounded-full ${user.is_active
                                ? "bg-emerald-500"
                                : "bg-red-500"
                                }`}
                            />

                            {user.is_active ? "Active" : "Disabled"}

                          </span>

                        </td>


                        {/* Last Login */}
                        <td className="px-4 py-3 text-sm text-slate-500">
                          {user.last_login
                            ? new Date(user.last_login).toLocaleString()
                            : "Never"}
                        </td>


                        {/* Created */}
                        <td className="px-4 py-3 text-sm text-slate-500">
                          {new Date(user.date_joined).toLocaleDateString()}
                        </td>


                        {/* Actions */}
                        <td className="px-4 py-3">

                          <button className="text-lg text-slate-500 hover:text-slate-800">
                            ⋮
                          </button>

                        </td>

                      </tr>

                    ))}


                    {users.length === 0 && (
                      <tr>

                        <td
                          colSpan={8}
                          className="px-4 py-10 text-center text-sm text-slate-500"
                        >
                          No users found.
                        </td>

                      </tr>
                    )}

                  </tbody>

                </table>

              </div>
            )}


            {/* Pagination */}
            <div className="flex h-14 items-center justify-between border-t border-slate-200 px-4">

              <div className="flex items-center gap-3 text-sm text-slate-500">

                <span>Rows per page</span>

                <select className="h-8 rounded border border-slate-300 bg-white px-2">
                  <option>10</option>
                </select>

                <span>
                  1–{users.length} of {users.length}
                </span>

              </div>


              <div className="flex items-center gap-1">

                <button className="h-8 w-8 rounded text-slate-400">
                  «
                </button>

                <button className="h-8 w-8 rounded text-slate-400">
                  ‹
                </button>

                <button className="h-8 w-8 rounded bg-blue-600 text-sm font-semibold text-white">
                  1
                </button>

                <button className="h-8 w-8 rounded text-slate-400">
                  ›
                </button>

                <button className="h-8 w-8 rounded text-slate-400">
                  »
                </button>

              </div>

            </div>

          </div>

        </div>
      </RoleGuard>
    </ProtectedRoute>
  );
}


/* =========================
   Helper
========================= */

function getInitials(name: string): string {

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

}


/* =========================
   Stat Card
========================= */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (

    <div className="flex h-[88px] items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 shadow-sm">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />

          <circle
            cx="9"
            cy="7"
            r="4"
          />

          <path d="M22 21v-2a4 4 0 00-3-3.87" />

          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>

      </div>


      <div>

        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="text-xl font-bold text-slate-900">
          {value}
        </p>

      </div>

    </div>

  );
}