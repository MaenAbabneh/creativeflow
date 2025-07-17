"use client";

import { AuthForm } from "@/components/forms/authform";
import { singInWithCredentials } from "@/lib/actions/auth.action";
import { SignInSchema } from "@/lib/validatoin";

export default function SignInPage() {
  return (
    <div>
      <div className="mb-6 text-center">
        <h2 className="h3-bold text-dark100_light900 mb-2">Sign In</h2>
        <p className="small-regular text-dark500_light400">
          Enter your credentials to access your account
        </p>
      </div>
      <AuthForm
        formType="SIGN_IN"
        schema={SignInSchema}
        defaultValues={{ email: "", password: "" }}
        onSubmit={singInWithCredentials}
      />
    </div>
  );
}
