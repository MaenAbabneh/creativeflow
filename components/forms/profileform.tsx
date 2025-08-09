"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { updateUser } from "@/lib/actions/users.action";
import { ProfileSchema } from "@/lib/validatoin";
import { Users } from "@/types/global";

import { Textarea } from "../ui/textarea";

interface Params {
  user: Users;
}

const ProfileForm = ({ user }: Params) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      portfolio: user.portfolio || "",
      location: user.location || "",
      bio: user.bio || "",
    },
  });

  const handleUpdateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    startTransition(async () => {
      const result = await updateUser({
        ...values,
      });

      if (result.success) {
        toast.success("Success", {
          description: "Your profile has been updated successfully.",
        });

        router.push(ROUTES.PROFILE(user._id));
      } else {
        toast.error("Error", {
          description: result.error?.message,
        });
      }
    });
  };

  return (
    <div className="w-full background-light900_dark200 rounded-xl p-6 sm:p-8 lg:p-10 shadow-light-100 dark:shadow-none ml-0 sm:ml-11">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleUpdateProfile)}
          className="w-full space-y-6 sm:space-y-8"
        >
          {/* Name and Username Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-3.5">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Name <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border focus:ring-2 focus:ring-primary-500/20 transition-all"
                      placeholder="Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-3.5">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Username <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border focus:ring-2 focus:ring-primary-500/20 transition-all"
                      placeholder="Your username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Portfolio and Location Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem className="space-y-3.5">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Portfolio Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border focus:ring-2 focus:ring-primary-500/20 transition-all"
                      placeholder="Your Portfolio link"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="space-y-3.5">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Location <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border focus:ring-2 focus:ring-primary-500/20 transition-all"
                      placeholder="Where do you live?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Bio Field - Full Width */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Bio <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[120px] border focus:ring-2 focus:ring-primary-500/20 transition-all resize-none"
                    placeholder="What's special about you? Tell us about your skills, interests, and what makes you unique..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-center sm:justify-end pt-6 border-t border-light-700 dark:border-dark-400">
            <Button
              type="submit"
              className="primary-gradient-dark dark:primary-gradient-light w-full sm:w-auto min-w-[160px] h-12 text-base font-semibold transition-all hover:shadow-lg disabled:opacity-50"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  <span className="text-dark100_light900">Updating Profile...</span>
                </>
              ) : (
                <span className="text-dark100_light900">Update Profile</span>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
