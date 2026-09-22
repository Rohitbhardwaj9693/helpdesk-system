"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface RoleGuardProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      router.replace("/login");
      return;
    }

    try {
      const user = JSON.parse(userData);

      if (!allowedRoles.includes(user.role)) {
        router.replace("/");
        return;
      }

      setChecking(false);
    } catch (error) {
      console.error("Invalid user data:", error);
      router.replace("/login");
    }
  }, [allowedRoles, router]);

  if (checking) {
    return null;
  }

  return <>{children}</>;
}