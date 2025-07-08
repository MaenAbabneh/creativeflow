"use client"

import { AuthForm } from "@/components/forms/authform";
import { singUpWithCredentials } from "@/lib/actions/auth.action";
import { SignUpSchema } from "@/lib/validatoin";

export default function signUp() {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "" , username: "", name: "" }}
      onSubmit={singUpWithCredentials}
    />
  );
}
