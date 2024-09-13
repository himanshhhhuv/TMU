'use client'

import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { toast } from 'react-hot-toast';
import { FirebaseError } from 'firebase/app';
import { z } from 'zod';

// Define the schema for form validation
const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Validate the form data
      const validatedData = formSchema.parse({ email, password });

      console.log('Attempting to authenticate with:', validatedData.email);

      if (isSignUp) {
        console.log('Signing up...');
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Sign up successful, sending verification email...');
        await sendEmailVerification(userCredential.user);
        toast.success("Verification email sent. Please check your inbox.");
      } else {
        console.log('Logging in...');
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful, checking email verification...');
        if (!userCredential.user.emailVerified) {
          setError('Please verify your email before logging in.');
          return;
        }
        toast.success("Successfully logged in");
        // Redirect to student information page
        window.location.href = '/student-info';
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors
        setError(error.errors[0].message);
        toast.error(error.errors[0].message);
      } else if (error instanceof FirebaseError) {
        console.log('Firebase Error Code:', error.code);
        console.log('Firebase Error Message:', error.message);
      }
      let errorMessage = 'Authentication failed. ';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            errorMessage += 'Invalid email or password.';
            break;
          case 'auth/user-not-found':
            errorMessage += 'No user found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage += 'Incorrect password.';
            break;
          case 'auth/email-already-in-use':
            errorMessage += 'Email already in use. Try logging in instead.';
            break;
          default:
            errorMessage += error.message;
        }
      }
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[360px] h-[350px]">
        <CardHeader>
          <CardTitle className="text-xl">{isSignUp ? 'Sign Up' : 'Login'}</CardTitle>
          <CardDescription className='text-sm'>{isSignUp ? 'Create a new account' : 'Enter your email and password'}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mb-4"
              autoComplete="email"
            />
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mb-4"
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full mb-4">{isSignUp ? 'Sign Up' : 'Login'}</Button>
          </form>
          <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="w-full">
            {isSignUp ? 'Already have an account? Login' : 'Need an account? Sign Up'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
