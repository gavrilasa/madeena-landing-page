// File: src/components/admin/login-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils"; // Use tilde path
import { Button } from "~/components/ui/button"; // Use tilde path
import { Card, CardContent } from "~/components/ui/card"; // Use tilde path
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field"; // Assuming you have these
import { Input } from "~/components/ui/input"; // Use tilde path
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"; // Use tilde path
import { AlertTriangle } from "lucide-react";
import Image from "next/image"; // Import Next Image

// Import the signIn function from your auth client instance
import { authClient } from "~/lib/auth-client"; // Use tilde path

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await authClient.signIn.email(
        { email, password },
        {
          onSuccess: () => {
            router.push("/admin");
          },
          onError: (ctx) => {
            console.error("Login failed:", ctx.error);
            setError(
              ctx.error?.message ||
                "Login failed. Please check your credentials.",
            );
          },
        },
      );
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Outer container - adjust styling in the parent page component if needed
    <div className={cn("flex w-full flex-col gap-6", className)} {...props}>
      {/* You can add min-height or height styling here or in the parent if desired */}
      <Card className="w-full overflow-hidden p-0">
        <CardContent className="grid h-full p-0 md:grid-cols-2">
          {/* Form Section */}
          <div className="flex flex-col justify-center p-6 md:p-8">
            {" "}
            {/* Added justify-center */}
            <form onSubmit={handleSubmit}>
              <FieldGroup className="flex flex-col gap-4">
                {" "}
                {/* Added gap */}
                <div className="mb-6 flex flex-col items-center gap-2 text-center">
                  {" "}
                  {/* Increased margin */}
                  <h1 className="text-2xl font-bold">Admin Login</h1>
                  <p className="text-muted-foreground text-balance">
                    Access the Al Madeena admin panel
                  </p>
                </div>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    {" "}
                    {/* Added margin */}
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Login Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </Field>
                <Field>
                  {/* Removed the div container and forgot password link */}
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </Field>
                <Field className="mt-6">
                  {" "}
                  {/* Increased margin */}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </Field>
                {/* Removed FieldSeparator and OAuth Buttons */}
                {/* Removed Sign Up Link FieldDescription */}
              </FieldGroup>
            </form>
          </div>

          {/* Image Section (Right Side) */}
          <div className="bg-muted relative hidden h-full min-h-[400px] md:block">
            {" "}
            {/* Added min-h */}
            <Image
              // Use a relevant image URL
              src="https://res.cloudinary.com/dah2v3xbg/image/upload/w_3824,q_auto:good,f_auto/v1761338343/DSCF7772_1_nwjcdw.webp"
              alt="Al Madeena Students"
              fill
              style={{ objectFit: "cover" }}
              className="dark:brightness-[0.2] dark:grayscale"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </CardContent>
      </Card>
      {/* Removed Terms of Service FieldDescription */}
    </div>
  );
}

// export default AdminLoginForm; // Uncomment if needed
