"use client"

import { AuthForm } from "@/components/forms/authform";
import { SignUpSchema } from "@/lib/validatoin";

export default function signUp() {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "" , username: "", name: "" }}
      onSubmit={(data) => Promise.resolve({ success: true, data })}
    />
  );
}
