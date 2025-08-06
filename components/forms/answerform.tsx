"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { ReloadIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createAnswer } from "@/lib/actions/answer.action";
import { api } from "@/lib/api";
import { AnswerSchema } from "@/lib/validatoin";

const Editor = dynamic(() => import("@/components/editor/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface Params {
  questionId: string;
  isEdit?: boolean;
  questionTitle?: string;
  questionContent?: string;
}

const AnswerForm = ({
  questionId,
  questionTitle,
  questionContent,
  isEdit = false,
}: Params) => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);
  const session = useSession();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleCreateAnswer = async (data: z.infer<typeof AnswerSchema>) => {
    startTransition(async () => {
      const result = await createAnswer({
        content: data.content,
        questionId,
      });
      if (result.success) {
        form.reset();
        editorRef.current?.setMarkdown("");
        toast.success("Answer submitted successfully", {
          description: "Your answer has been submitted successfully.",
        });
        if (editorRef.current) {
          editorRef.current.setMarkdown("");
        }
      } else {
        toast.error("Failed to submit answer", {
          description: "Please try again later.",
        });
      }
    });
  };

  const generateAIAnswer = async () => {
    if (session.status !== "authenticated") {
      return toast("Please sign in to use AI features", {
        description: "You need to be signed in to generate AI answers.",
      });
    }

    setIsAISubmitting(true);

    const userAnswer = editorRef.current?.getMarkdown() ?? "";

    try {
      const { success, data, error } = await api.ai.getAnswer(
        questionTitle!,
        questionContent!,
        userAnswer
      );

      if (!success || !data || error) {
        return toast.error("Failed to generate AI answer", {
          description: error?.message,
        });
      }

      const formattedAnswer = data.replace(/<br>/g, " ").toString().trim();
      console.log("AI Answer:", formattedAnswer);
      if (editorRef.current) {
        editorRef.current.setMarkdown(formattedAnswer);

        form.setValue("content", formattedAnswer);
        form.trigger("content");
      }

      toast("AI answer generated successfully", {
        description: "Your AI-generated answer has been inserted.",
      });
    } catch (error) {
      toast.error("Failed to generate AI answer", {
        description:
          error instanceof Error
            ? error.message
            : "There was a problem with your request",
      });
    } finally {
      setIsAISubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 mb-4">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          type="submit"
          onClick={generateAIAnswer}
          className="btn light-border-2 gap-1.5 rounded-md border px-4 py-2.5  w-full sm:w-auto cursor-pointer"
          disabled={isAISubmitting}
        >
          {isAISubmitting ? (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              <span className="text-dark100_light900 small-regular">
                Generating...
              </span>
            </>
          ) : (
            <>
              <Image
                src="/icons/stars.svg"
                alt="Generate AI Answer"
                width={12}
                height={12}
                className="object-contain"
              />
              <span className="text-dark100_light900 small-regular">
                Generate AI Answer
              </span>
            </>
          )}
        </Button>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateAnswer)}
          className="space-y-6 w-full max-w-none"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full gap-3">
                <div className="w-full">
                  <FormControl>
                    <Editor
                      editorRef={editorRef}
                      value={field.value}
                      fieldChange={field.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
                <FormDescription className="!text-dark300_light800 small-regular">
                  Provide a detailed answer to help solve the problem. Minimum
                  20 characters.
                </FormDescription>
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end w-full">
            <Button
              type="submit"
              disabled={isPending}
              className="primary-gradient-dark dark:primary-gradient-light text-light-900 py-6 font-semibold text-[16px] hover:opacity-90 transition-opacity cursor-pointer"
            >
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 size-4 animate-spin" />
                  <span>Submitting</span>
                </>
              ) : (
                <> {isEdit ? "Update Answer" : "Submit Answer"} </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AnswerForm;
