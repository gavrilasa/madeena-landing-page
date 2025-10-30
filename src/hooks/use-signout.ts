"use client";

import { authClient } from "~/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter();

  const handleSignout = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Sign Out Success");
        },
        onError: () => {
          toast.error("Failed to Sign Out");
        },
      },
    });
  };

  return handleSignout;
}
