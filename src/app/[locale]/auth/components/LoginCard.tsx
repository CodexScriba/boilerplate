// components/LoginCard.tsx
"use client"

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"

// Define the form data type
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data)
    // Handle login submission
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden flex flex-col md:flex-row">
        {/* Left side with image - background color matches card */}
        <div className="w-full md:w-2/5 relative bg-card rounded-l-lg overflow-hidden">
          <Image 
            src="/login-image.jpg" 
            alt="Login" 
            width={500} 
            height={700} 
            className="object-cover h-64 md:h-full w-full"
            priority
          />
        </div>
        
        {/* Right side with form */}
        <div className="w-full md:w-3/5 p-6 md:p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-6">Login to your account</p>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2 mb-4">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="Enter your email"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="#" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { 
                      required: "Password is required"
                    })}
                    placeholder="Enter your password"
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-6">
                <Checkbox 
                  id="rememberMe" 
                  {...register("rememberMe")}
                />
                <Label 
                  htmlFor="rememberMe" 
                  className="text-sm font-normal leading-none cursor-pointer"
                >
                  Remember me
                </Label>
              </div>
              
              <Button className="w-full" type="submit">
                Log in
              </Button>
            </form>
            
            <div className="my-6 flex items-center">
              <Separator className="flex-grow" />
              <span className="mx-2 text-sm text-muted-foreground">or</span>
              <Separator className="flex-grow" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" className="h-5 w-5">
                  <path fill="#FFC107" d="M43.6,20H24v8h11.3c-1.1,5.4-5.9,8-11.3,8c-6.6,0-12-5.4-12-12s5.4-12,12-12c3.1,0,5.9,1.2,8,3.1l6.1-6.1C33.7,5.4,29.1,4,24,4C12.9,4,4,12.9,4,24s8.9,20,20,20s20-8.9,20-20C44,22.7,43.9,21.3,43.6,20z" />
                  <path fill="#FF3D00" d="M6.3,14.7l7.1,5.2C15.2,14.5,19.4,10,24,10c3.1,0,5.9,1.2,8,3.1l6.1-6.1C33.7,5.4,29.1,4,24,4C16.3,4,9.7,8.3,6.3,14.7z" />
                  <path fill="#4CAF50" d="M24,44c5.2,0,9.9-1.8,13.4-4.8l-6.5-5.5c-2,1.3-4.5,2.2-7,2.2c-5.4,0-10-3.5-11.8-8.4l-7.1,5.4C8.7,39.6,15.6,44,24,44z" />
                  <path fill="#1976D2" d="M43.6,20H24v8h11.3c-0.6,2.6-2.1,4.7-4.3,6.1l6.5,5.5c4.1-3.8,6.5-9.3,6.5-15.6C44,22.7,43.9,21.3,43.6,20z" />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-blue-600">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </Button>
            </div>
            
            <p className="text-center mt-6 text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}