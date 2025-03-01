import Link from "next/link";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RegisterForm } from "../components/RegistrationForm";
import { SocialButtons } from "../components/SocialButtons";


export default function RegisterPage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))]">
      <div className="container max-w-5xl mx-auto py-8">
        <Card className="w-full flex flex-col md:flex-row rounded-3xl">
          {/* Left side - Form */}
          <div className="md:w-7/12 p-6 md:p-8">
            <CardHeader className="space-y-4 p-0 mb-8">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-primary">
                  Create an Account
                </h1>
                <p className="text-lg font-medium text-secondary">
                  Sign up to get started
                </p>
              </div>
              <CardDescription className="text-base">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-accent hover:underline font-bold"
                >
                  Log in
                </Link>
              </CardDescription>
            </CardHeader>

            <RegisterForm />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <SocialButtons className="mt-6" />
            </div>
          </div>

          {/* Right side - Image/Content */}
          <div className="md:w-5/12 relative hidden md:flex bg-muted rounded-r-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
            <div className="flex items-center justify-center h-full p-6 relative z-10">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-primary">Join Our Community</h2>
                <p className="text-muted-foreground">
                  Access premium features and connect with like-minded individuals
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}