"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import z, { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { ActionResponse } from "@/types/global";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<ActionResponse>;
  formType: "SIGN_IN" | "SIGN_UP";
}

export function AuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  formType,
}: AuthFormProps<T>) {
  const router = useRouter();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = (await onSubmit(data)) as ActionResponse;
    if (result?.success) {
      toast.success("success", {
        description:
          formType === "SIGN_IN"
            ? "You have successfully signed in."
            : "You have successfully signed up.",
      });
      router.push(ROUTES.HOME);
    } else {
      toast.error(`error ${result?.statusCode}`, {
        description: result?.error?.message,
      });
    }
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 mt-8 w-full max-w-md mx-auto"
      >
        {Object.keys(defaultValues).map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormLabel className="text-dark100_light900 small-bold">
                  {fieldName === "email"
                    ? "Email Address"
                    : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full h-12 px-4 paragraph-regular text-dark300_light700 background-light700_dark300 light-border-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    type={fieldName === "password" ? "password" : "text"}
                    placeholder={`Enter your ${fieldName}...`}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 small-regular" />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full h-12 primary-gradient-dark dark:primary-gradient-light text-light-900 font-semibold paragraph-regular hover:opacity-90 transition-opacity duration-200 disabled:opacity-50"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        <div className="text-center mt-6">
          {formType === "SIGN_IN" ? (
            <p className="paragraph-regular text-dark500_light400">
              Don't have an account?{" "}
              <Link
                href={ROUTES.SIGNUP}
                className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p className="paragraph-regular text-dark500_light400">
              Already have an account?{" "}
              <Link
                href={ROUTES.SIGNIN}
                className="text-primary-500 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
