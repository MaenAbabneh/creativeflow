"use client";

import { AuthForm } from "@/components/forms/authform";
import { SignInSchema } from "@/lib/validatoin";

export default function signIn() {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
}
