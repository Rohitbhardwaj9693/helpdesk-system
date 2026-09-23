"use client";

import { useEffect, useState } from "react";
import {
    getCategories,
    Category,createCategory
} from "../services/categoryServices";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [page, setPage] = useState(1);

    const [totalCount, setTotalCount] = useState(0);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [previousPage, setPreviousPage] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const limit = 10;

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getCategories(page, limit);

            setCategories(response.results);
            setTotalCount(response.count);
            setNextPage(response.next);
            setPreviousPage(response.previous);
        } catch (error) {
            console.error(error);
            setError("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [page]);

    const getColorClass = (color: string) => {
        const colors: Record<string, string> = {
            Blue: "bg-blue-100 text-blue-700",
            Purple: "bg-purple-100 text-purple-700",
            Green: "bg-green-100 text-green-700",
            Red: "bg-red-100 text-red-700",
            Orange: "bg-orange-100 text-orange-700",
            Teal: "bg-teal-100 text-teal-700",
            Pink: "bg-pink-100 text-pink-700",
            Gray: "bg-gray-100 text-gray-700",
        };

        return colors[color] || "bg-gray-100 text-gray-700";
    };
    const [showAddModal, setShowAddModal] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        color: "",
        is_active: true,
    });

    const [creating, setCreating] = useState(false);
    const [formError, setFormError] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleCreateCategory = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setCreating(true);
            setFormError("");

            await createCategory(formData);

            setShowAddModal(false);

            setFormData({
                name: "",
                description: "",
                color: "",
                is_active: true,
            });

            setPage(1);
            fetchCategories();
        } catch (error) {
            console.error(error);
            setFormError("Failed to create category");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="min-h-full bg-[#f4f7fb] p-6">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h1 className="text-[22px] font-semibold text-[#111827]">
                        Categories
                    </h1>

                    <p className="mt-1 text-sm text-[#64748b]">
                        Manage ticket categories
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
                    Add Category
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
                                placeholder="Search categories..."
                                className="h-9 w-[256px] rounded-lg border border-[#cbd5e1] bg-white pl-9 pr-3 text-sm text-[#334155] outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                            />
                        </div>

                        {/* Status */}
                        <select
                            className="h-9 w-[125px] rounded-lg border border-[#cbd5e1] bg-white px-3 text-sm text-[#334155] outline-none focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                        >
                            <option>All Statuses</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="border-b border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse">
                        <thead>
                            <tr className="border-b border-[#e5eaf1] bg-white">
                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                                    Category
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                                    Description
                                </th>

                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                                    Ticket Count
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
                                        colSpan={6}
                                        className="px-4 py-10 text-center text-sm text-[#64748b]"
                                    >
                                        Loading categories...
                                    </td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-4 py-10 text-center text-sm text-[#64748b]"
                                    >
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="border-b border-[#edf1f5] last:border-b-0 hover:bg-[#fafcff]"
                                    >
                                        {/* Category */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`h-3 w-3 rounded-full ${getColorClass(
                                                        category.color
                                                    )
                                                        .split(" ")[0]
                                                        .replace("bg-", "bg-")}`}
                                                />

                                                <div>
                                                    <p className="text-sm font-semibold text-[#172033]">
                                                        {category.name}
                                                    </p>

                                                    <p className="text-xs text-[#64748b]">
                                                        #{category.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Description */}
                                        <td className="px-4 py-4 text-sm text-[#334155]">
                                            {category.description || "—"}
                                        </td>

                                        {/* Ticket Count */}
                                        <td className="px-4 py-4 text-sm font-semibold text-[#172033]">
                                            —
                                        </td>

                                        {/* Status */}
                                        <td className="px-4 py-4">
                                            {category.is_active ? (
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
                                                category.created_at
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
                {!loading && categories.length > 0 && (
                    <div className="flex items-center justify-between border-t border-[#e5eaf1] px-4 py-3">
                        <p className="text-sm text-[#64748b]">
                            Total categories:{" "}
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
                        className="w-full max-w-[500px] rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-[#e5eaf1] px-6 py-4">
                            <h2 className="text-base font-semibold text-[#172033]">
                                Add Category
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
                        <form onSubmit={handleCreateCategory}>
                            <div className="space-y-5 px-6 py-6">

                                {/* Name */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">
                                        Name <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Technical Support"
                                        required
                                        className="h-10 w-full rounded-lg border border-[#cbd5e1] px-3 text-sm outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#334155]">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter category description"
                                        rows={3}
                                        className="w-full resize-none rounded-lg border border-[#cbd5e1] px-3 py-2 text-sm outline-none placeholder:text-[#94a3b8] focus:border-[#155eef] focus:ring-1 focus:ring-[#155eef]"
                                    />
                                </div>

                                {/* Color */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#334155]">
                                        Color <span className="text-red-500">*</span>
                                    </label>

                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            { name: "Blue", className: "bg-blue-500" },
                                            { name: "Purple", className: "bg-purple-500" },
                                            { name: "Green", className: "bg-green-500" },
                                            { name: "Red", className: "bg-red-500" },
                                            { name: "Orange", className: "bg-orange-500" },
                                            { name: "Teal", className: "bg-teal-500" },
                                            { name: "Pink", className: "bg-pink-500" },
                                            { name: "Gray", className: "bg-gray-500" },
                                        ].map((color) => (
                                            <button
                                                key={color.name}
                                                type="button"
                                                onClick={() =>
                                                    setFormData((previous) => ({
                                                        ...previous,
                                                        color: color.name,
                                                    }))
                                                }
                                                className={`flex h-9 w-9 items-center justify-center rounded-full ${color.className
                                                    } ${formData.color === color.name
                                                        ? "ring-2 ring-[#155eef] ring-offset-2"
                                                        : ""
                                                    }`}
                                                aria-label={color.name}
                                            >
                                                {formData.color === color.name && (
                                                    <span className="text-sm font-bold text-white">
                                                        ✓
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {!formData.color && (
                                        <p className="mt-2 text-xs text-[#64748b]">
                                            Select a color
                                        </p>
                                    )}
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
                                    disabled={creating || !formData.color}
                                    className="rounded-lg bg-[#155eef] px-4 py-2 text-sm font-medium text-white hover:bg-[#1254d8] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {creating ? "Adding..." : "Add Category"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}