import React from 'react';
import Link from 'next/link';
import { Title } from '@/app/components/Title';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background">
      <Card className="w-full max-w-md border-destructive/20 shadow-lg">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex items-center justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <Title 
            variant="h2" 
            color="destructive" 
            weight="bold" 
            className="text-center"
          >
            Authentication Error
          </Title>
        </CardHeader>
        
        <Separator className="bg-border/50" />
        
        <CardContent className="pt-6 pb-4">
          <Alert variant="destructive" className="mb-4 bg-destructive/5 border-destructive/20">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was a problem with your authentication request.
            </AlertDescription>
          </Alert>
          
          <div className="space-y-4">
            <div className="rounded-md bg-muted/50 p-4">
              <Title variant="h6" color="muted-foreground" size="sm" className="mb-2">
                Possible reasons:
              </Title>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Your session may have expired</li>
                <li>Invalid credentials were provided</li>
                <li>The authentication service is temporarily unavailable</li>
                <li>Your account may be locked or disabled</li>
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-3 pt-0">
          <Button className="w-full" asChild>
            <Link href="/auth/login">
              Return to Login
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Need help? <Link href="/contact" className="font-medium text-primary hover:underline">Contact Support</Link></p>
      </div>
    </div>
  );
}
