"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "../services/authServices";
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            const data = await loginUser({
                email,
                password,
            });

            console.log("Login response:", data);
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);
            localStorage.setItem("user", JSON.stringify(data.user));
            router.push("/users");
            console.log("Login response:", data);
        } catch (error) {
            console.error("Login error:", error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                <h1 className="text-2xl font-bold text-slate-900">
                    Welcome Back
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Sign in to your SupportHub account
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <button
                            type="button"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}