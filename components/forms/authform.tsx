"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { JSX } from "react";

import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  //   SubmitHandler,
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
        className="space-y-8 mt-5 w-full   "
      >
        {Object.keys(defaultValues).map((fieldName) => (
          <FormField
            key={fieldName}
            control={form.control}
            name={fieldName as Path<T>}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full min-w-full sm:max-w-[500px] mx-auto">
                <FormLabel className="text-dark100_light900 small-bold">
                  {fieldName === "email"
                    ? "Email Address"
                    : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                </FormLabel>
                <div className="flex items-center w-full ">
                  <FormControl>
                    <Input
                      className="w-full   py-6"
                      type={fieldName === "password" ? "password" : "text"}
                      placeholder={`Enter your ${fieldName} . . .`}
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="submit"
          className=" w-full primary-gradient-dark dark:primary-gradient-light text-light-900 py-6 font-semibold text-[16px] hover:opacity-90 transition-opacity"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>
        {formType === "SIGN_IN" ? (
          <p className="text-center paragraph-regular text-dark500_light400 m-0 p-0">
            dont have an account?{" "}
            <Link
              href={ROUTES.SIGNUP}
              className=" dark:dark-text-gradient light-text-gradient font-bold text-[16px]"
            >
              Sign Up
            </Link>
          </p>
        ) : (
          <p className="text-dark500_light400 text-center paragraph-regular m-0 p-0 ">
            Already have an account?{" "}
            <Link
              href={ROUTES.SIGNIN}
              className="dark:dark-text-gradient light-text-gradient font-bold text-[16px] "
            >
              Sign In
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
}
