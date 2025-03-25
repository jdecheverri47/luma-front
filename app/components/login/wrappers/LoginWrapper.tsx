"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { AlertDestructive } from "@/app/components/dashboard/AlertDestructive";
import {
  TypographyP,
  TypographyH3,
  TypographySmall,
} from "@/app/components/ui/Typography";
import LumaInput from "../ui/LumaInput";
import {
  signInSchema,
  resetPasswordSchema,
  newPasswordSchema,
} from "@/app/schemas/loginFormSchema";
import { Loader2 } from "lucide-react";

type FormData = z.infer<typeof signInSchema>;
type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
type NewPasswordData = z.infer<typeof newPasswordSchema>;

const LoginForm: React.FC<{ onResetPassword: () => void }> = ({
  onResetPassword,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback(async (values: FormData) => {
    try {
      setErrorMessage("");
      const result = await signIn("credentials", {
        redirect: true,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 max-w-md w-full mt-6"
        noValidate
      >
        {errorMessage && <AlertDestructive description={errorMessage} />}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LumaInput
                  placeholder="Email"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LumaInput
                  placeholder="Password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full mt-4 rounded-sm shadow-none"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : null}
          {form.formState.isSubmitting ? "Processing..." : "Login"}
        </Button>

        <div className="w-full flex items-center justify-center">
          <TypographySmall
            className={`mt-2 text-center ${
              process.env.NEXT_PUBLIC_DEPLOYMENT !== "local"
                ? "cursor-pointer hover:opacity-70"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={
              process.env.NEXT_PUBLIC_DEPLOYMENT !== "local"
                ? onResetPassword
                : undefined
            }
          >
            Forgot Password?
          </TypographySmall>
        </div>
      </form>
    </Form>
  );
};

const ResetPasswordForm: React.FC<{ onCancel: () => void }> = ({
  onCancel,
}) => {
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const handleSubmit = useCallback(
    async (values: ResetPasswordData) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: values.email }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || `HTTP error! status: ${response.status}`
          );
        }

        // Success handling
        toast.message("A code has been sent to your email", {
          description:
            "Please check your inbox and follow the link we’ve sent you to reset your password.",
        });
        onCancel();
      } catch (error) {
        let errorMessage = "Failed to send recovery email";

        // Handle specific error cases
        if (error instanceof Error) {
          errorMessage = error.message;

          // Special case for network errors
          if (error.message.includes("Failed to fetch")) {
            errorMessage =
              "Network error. Please check your internet connection";
          }
        }

        // Error toast with dynamic message
        toast.error("Error", {
          description: errorMessage,
        });

        // Clear form on specific errors
        if (errorMessage.toLowerCase().includes("not found")) {
          form.reset();
        }
      }
    },
    [onCancel, form]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 max-w-md w-full mt-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LumaInput
                  placeholder="Enter your email"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : null}
            {form.formState.isSubmitting ? "Sending..." : "Send Instructions"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

const NewPasswordForm: React.FC<{ verificationCode: string }> = ({
  verificationCode,
}) => {
  const router = useRouter();
  const form = useForm<NewPasswordData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: NewPasswordData) => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              verificationCode,
              newPassword: values.newPassword,
              confirmPassword: values.confirmPassword,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || `HTTP error! status: ${response.status}`
          );
        }

        toast.message("Password updated", {
          description: "Your password has been successfully updated",
        });
        router.push("/login");
      } catch (error) {
        let errorMessage = "Failed to update password";

        if (error instanceof Error) {
          errorMessage = error.message;

          // Manejo específico de errores comunes
          if (error.message.includes("Failed to fetch")) {
            errorMessage =
              "Network error. Please check your internet connection";
          } else if (error.message.includes("400")) {
            errorMessage = "Invalid or expired verification code";
          } else if (error.message.includes("401")) {
            errorMessage = "Passwords do not match";
          }
        }

        toast.error("Error", {
          description: errorMessage,
        });
      }
    },
    [router, verificationCode]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 max-w-md w-full mt-6"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LumaInput
                  placeholder="New Password"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <LumaInput
                  placeholder="Confirm Password"
                  type="password"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : null}
          {form.formState.isSubmitting ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </Form>
  );
};

const LoginWrapper: React.FC<{ verificationCode?: string | null }> = ({
  verificationCode,
}) => {
  const [showResetPassword, setShowResetPassword] = useState(false);

  if (verificationCode) {
    return (
      <div className="w-full h-full place-items-center p-10 relative">
        <div className="flex flex-col items-center justify-center h-full relative">
          <TypographyH3>Set New Password</TypographyH3>
          <TypographyP className="text-center mb-6">
            Enter your new password and confirm it
          </TypographyP>
          <NewPasswordForm verificationCode={verificationCode} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full place-items-center p-10 relative">
      <div className="flex flex-col items-center justify-center h-full relative">
        <TypographyH3>
          {showResetPassword ? "Forgot Password" : "Welcome Back!"}
        </TypographyH3>
        <TypographyP className="text-center max-w-sm mt-2">
          {showResetPassword
            ? "Enter your email and we’ll send you a link to reset your password"
            : "Enter your credentials to login to your account"}
        </TypographyP>

        {showResetPassword ? (
          <ResetPasswordForm onCancel={() => setShowResetPassword(false)} />
        ) : (
          <LoginForm onResetPassword={() => setShowResetPassword(true)} />
        )}
      </div>
    </div>
  );
};

export default LoginWrapper;
