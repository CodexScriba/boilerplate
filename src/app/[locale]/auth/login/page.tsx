// app/auth/login/page.tsx
import { LoginForm } from "../components/LoginForm";
import { SocialButtons } from "../components/SocialButtons";
import { Separator } from "@/components/ui/separator";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Stars, Rocket, Users } from "lucide-react";
import { Title } from "@/app/components/Title";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--muted))]">
      <div className="container max-w-5xl mx-auto py-8 flex-grow flex items-center justify-center">
        <Card className="w-full rounded-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Form */}
            <div className="md:w-7/12 p-6 md:p-8 overflow-y-auto">
              <CardHeader className="space-y-6 p-0 mb-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Title size="xl" className="flex items-center gap-2">
                      <span>👋</span>
                      Welcome back
                      <Stars className="w-6 h-6 text-[hsl(var(--accent2))]" />
                    </Title>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <BookOpen className="w-6 h-6 text-[hsl(var(--secondary))]" />
                    <p className="text-lg font-medium text-[hsl(var(--secondary))]">
                      Sign in to continue to your account
                    </p>
                  </div>
                </div>
                <CardDescription className="text-base flex items-center gap-2 mt-4">
                  <Users className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                  Do not have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-[hsl(var(--accent2))] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    Sign up
                    <Rocket className="w-4 h-4" />
                  </Link>
                </CardDescription>
              </CardHeader>

              <LoginForm />

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

            {/* Right side - Image */}
            <div className="md:w-5/12 p-4 hidden md:flex items-center justify-center">
              <div className="relative w-full h-full rounded-xl overflow-hidden p-1">
                <Image
                  src="/images/login_image.png"
                  alt="Login illustration"
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}