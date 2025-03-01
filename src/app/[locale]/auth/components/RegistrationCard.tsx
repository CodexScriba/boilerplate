// components/RegistrationCard.tsx
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
import Image from "next/image"

// Define the form data type
interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  password: string;
  terms: boolean;
}

export default function RegistrationCard() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<RegistrationFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      displayName: "",
      password: "",
      terms: false
    }
  })

  const onSubmit: SubmitHandler<RegistrationFormData> = (data) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <Card className="overflow-hidden flex flex-col md:flex-row">
        {/* Left side with image - background color matches card */}
        <div className="w-full md:w-2/5 relative bg-card rounded-l-lg overflow-hidden">
          <Image 
            src="/signup-image.jpg" 
            alt="Sign Up" 
            width={500} 
            height={700} 
            className="object-cover h-64 md:h-full w-full"
            priority
          />
        </div>
        
        {/* Right side with form */}
        <div className="w-full md:w-3/5 p-6 md:p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Create your account</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input 
                    id="firstName"
                    {...register("firstName", { required: "First name is required" })}
                    placeholder="First name"
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && (
                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input 
                    id="lastName"
                    {...register("lastName", { required: "Last name is required" })}
                    placeholder="Last name"
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName && (
                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              
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
                <Label htmlFor="displayName">Display name</Label>
                <Input 
                  id="displayName"
                  {...register("displayName", { required: "Display name is required" })}
                  placeholder="Choose a display name"
                  aria-invalid={errors.displayName ? "true" : "false"}
                />
                {errors.displayName && (
                  <p className="text-sm text-destructive">{errors.displayName.message}</p>
                )}
              </div>
              
              <div className="space-y-2 mb-6">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { 
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                      }
                    })}
                    placeholder="Create a password"
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
                  id="terms" 
                  {...register("terms", { required: "You must agree to the terms" })}
                />
                <Label 
                  htmlFor="terms" 
                  className="text-sm font-normal leading-none cursor-pointer"
                >
                  I agree to the Terms and Conditions
                </Label>
              </div>
              {errors.terms && (
                <p className="text-sm text-destructive -mt-4 mb-6">{errors.terms.message}</p>
              )}
              
              <Button className="w-full" type="submit">
                Register
              </Button>
            </form>
            
            <div className="my-6 flex items-center">
              <Separator className="flex-grow" />
              <span className="mx-2 text-sm text-muted-foreground">or</span>
              <Separator className="flex-grow" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </Button>
              <Button variant="outline" className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M15.5 8.5 12 12" />
                </svg>
                Apple
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}