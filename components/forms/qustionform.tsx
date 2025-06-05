"use client";
import { QuestionSchema } from "@/lib/validatoin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path, useForm } from "react-hook-form";
import z, { ZodType } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { Link } from "lucide-react";
import { title } from "process";
const QustionForm = () => {
  const form = useForm({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handleCreateQuestion = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="flex flex-col gap-6 sm:gap-8 items-center justify-center sm:ml- md:ml-0 "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="  w-[94vw] sm:w-[94vw] md:w-[66vw] lg:w-[64vw] xl:w-[50vw] gap-3 ">
              <FormLabel className="text-dark100_light900 small-bold">
                Qustion Title <span className="text-primary-500">*</span>
              </FormLabel>
              <div className="flex items-center w-full ">
                <FormControl>
                  <Input
                    className="paragraph-regular text-dark300_light700 background-light700_dark300 light-border-2 w-full min-h-[56px]"
                    placeholder="Enter your question title"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormDescription className="!text-dark300_light800 small-regular">
                Be specific and imagine you’re asking a question to another
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-[94vw] sm:w-[94vw] md:w-[66vw] lg:w-[64vw] xl:w-[50vw] gap-3 ">
              <FormLabel className="text-dark100_light900 small-bold">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <div className="flex items-center w-full ">
                <FormControl>editor</FormControl>
              </div>
              <FormDescription className="!text-dark300_light800 small-regular">
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters. person.{" "}
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-[94vw] sm:w-[94vw] md:w-[66vw] lg:w-[64vw] xl:w-[50vw] gap-3">
              <FormLabel className="text-dark100_light900 small-bold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <div className="flex items-center w-full ">
                <FormControl>
                  <Input
                    className="paragraph-regular text-dark300_light700 background-light700_dark300 light-border-2 w-full min-h-[56px]"
                    placeholder="Enter your question title"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormDescription className="!text-dark300_light800 small-regular">
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions.
              </FormDescription>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end w-full">
          <Button
            type="submit"
            className=" w-fit primary-gradient-dark dark:primary-gradient-light text-light-900 py-6 font-semibold text-[16px] hover:opacity-90 transition-opacity"
          >
            Ask a Qustion
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QustionForm;
