"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterFormValues, registerSchema } from "../register/types";
import { register } from "../register/actions";

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function RegisterForm({
  onSuccess,
  redirectTo = "/auth/verify-email",
}: RegisterFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    mode: "onBlur", // Validate on blur for better user experience
  });

  async function onSubmit(data: RegisterFormValues) {
    try {
      setIsLoading(true);
      setError(null);

      const result = await register(data);

      // Type narrowing using 'in' operator
      if ('error' in result) {
        // Now TypeScript knows we're in the error variant
        setError(result.message || "An error occurred during registration. Please try again.");
        return;
      }

      // If we get here, we know it's a success
      onSuccess?.();
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4"
        aria-labelledby="registration-heading"
        noValidate
      >
        <div id="registration-heading" className="sr-only">Registration Form</div>
        
        {error && (
          <div 
            className="text-red-500 text-sm p-3 bg-red-50 border border-red-200 rounded-lg"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <FormControl>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="rounded-xl"
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage aria-live="polite" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <FormControl>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="rounded-xl"
                    aria-required="true"
                    {...field}
                  />
                </FormControl>
                <FormMessage aria-live="polite" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="displayName">Display Name</FormLabel>
              <FormControl>
                <Input
                  id="displayName"
                  placeholder="Enter your display name"
                  className="rounded-xl"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  className="rounded-xl"
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="rounded-xl pr-10"
                    aria-required="true"
                    aria-describedby="password-requirements"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <p id="password-requirements" className="text-xs text-muted-foreground mt-1">
                Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.
              </p>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm your password"
                    className="rounded-xl pr-10"
                    aria-required="true"
                    {...field}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage aria-live="polite" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  id="terms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-required="true"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-accent hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-accent hover:underline">
                    Privacy Policy
                  </Link>
                </FormLabel>
                <FormMessage aria-live="polite" />
              </div>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full rounded-full h-12 text-base bg-accent hover:bg-accent/90 text-accent-foreground"
          disabled={isLoading}
          aria-disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}