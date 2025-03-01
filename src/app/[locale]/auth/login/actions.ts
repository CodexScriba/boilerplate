'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LoginFormValues } from "./types";

export async function login(data: LoginFormValues) {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signInWithOAuth(provider: string) {
  const supabase = await createClient();
  
  const { data } = await supabase.auth.signInWithOAuth({
    provider: provider as any,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

export async function loginAsGuest() {
  const supabase = await createClient();
  
  const { error: signInError } = await supabase.auth.signInAnonymously();
  
  if (signInError) {
    return { error: signInError.message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}