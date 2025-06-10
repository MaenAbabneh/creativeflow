"use client";
import { QuestionSchema } from "@/lib/validatoin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import React from "react";
import TagsCard from "../card/tags-card";
import z from "zod";
const Editor = dynamic(() => import("@/components/editor/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QustionForm = () => {
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handelTagsInput = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string[]
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();
      if (field.length >= 5) {
        form.setError("tags", {
          type: "manual",
          message: "You can only add up to 5 tags",
        });
        return;
      }
      if (tagInput && tagInput.length < 15 && !field.includes(tagInput)) {
        form.setValue("tags", [...field.values(), tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag must be less than 15 characters",
        });
      } else if (field.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      } else if (!tagInput) {
        form.setError("tags", {
          type: "manual",
          message: "Tag cannot be empty",
        });
      }
    }
  };
  const handleReomveTags = (tag: string, field: string[]) => {
    const updatedTags = field.filter((t) => t !== tag);
    form.setValue("tags", updatedTags);
    form.clearErrors("tags");
  };

  const handleCreateQuestion = (data: z.infer<typeof QuestionSchema>) => {
    console.log(data);
  };
  const editorRef = React.useRef<MDXEditorMethods | null>(null);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleCreateQuestion)}
        className="flex flex-col gap-6 sm:gap-8 items-center justify-center  "
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="  w-[87vw] sm:w-[88vw] md:w-[64vw] lg:w-[64vw] xl:w-[52vw] gap-3 ">
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
              <FormMessage />
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
            <FormItem className=" w-[87vw] sm:w-[88vw] md:w-[64vw] lg:w-[64vw] xl:w-[52vw] gap-3">
              <FormLabel className="text-dark100_light900 small-bold">
                Detailed explanation of your problem{" "}
                <span className="text-primary-500">*</span>
              </FormLabel>
              <div className=" w-full  ">
                <FormControl>
                  <Editor
                    editorRef={editorRef}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormMessage />
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
            <FormItem className="w-[87vw] sm:w-[88vw] md:w-[64vw] lg:w-[64vw] xl:w-[52vw] gap-3">
              <FormLabel className="text-dark100_light900 small-bold">
                Tags <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="w-full">
                  <Input
                    onKeyDown={(e) => handelTagsInput(e, field.value)}
                    className="paragraph-regular text-dark300_light700 background-light700_dark300 light-border-2 w-full min-h-[56px]"
                    placeholder="Add tags (press Enter to add)"
                  />
                  {field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 w-full ">
                      {field?.value?.map((tag: string, index: number) => (
                        <div
                          className="realtive group flex-shrink-0"
                          key={`${tag} ${index}`}
                        >
                          <TagsCard
                            key={tag}
                            _id={tag}
                            name={tag}
                            compact
                            remove
                            isButton
                            handleRemove={() =>
                              handleReomveTags(tag, field.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
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
            className="primary-gradient-dark dark:primary-gradient-light text-light-900 py-6 font-semibold text-[16px] hover:opacity-90 transition-opacity cursor-pointer"
          >
            Ask a Qustion
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default QustionForm;
