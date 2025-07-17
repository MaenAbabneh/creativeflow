"use client";
import {  AnswerSchema } from "@/lib/validatoin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";
import React, { useRef, useTransition, useState } from "react";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import { Questions } from "@/types/global";
import { createAnswer } from "@/lib/actions/answer.action";

const Editor = dynamic(() => import("@/components/editor/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

interface Params {
  questionId: string;
  isEdit?: boolean;
}

const AnswerForm = ({ questionId, isEdit = false }: Params) => {
  const router = useRouter();
  const editorRef = useRef<MDXEditorMethods>(null);
  const [isPending, startTransition] = useTransition();
  const [isAISubmitting, setIsAISubmitting] = useState(false);

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      content:"",
    },
  });

  const handleCreateAnswer = async (data: z.infer<typeof AnswerSchema>) => {
    startTransition(async () => {
    
      const result = await createAnswer({
        content : data.content,
        questionId
      });
      if (result.success) {
        form.reset();
        editorRef.current?.setMarkdown('');
        toast.success("Answer submitted successfully", {
          description: "Your answer has been submitted successfully.",
        });
      } else {
        toast.error("Failed to submit answer", {
          description: "Please try again later.",
        });
      }
    });
  };

//   const handleGenerateAIAnswer = async () => {
//     if (!questionId) return;

//     setIsAISubmitting(true);
//     try {
//       // TODO: Implement AI generation logic here
//       // For now, we'll show a placeholder
//       toast.info("AI Answer Generation", {
//         description: "AI answer generation will be implemented soon.",
//       });

//       // Placeholder AI-generated content
//       const aiContent = `This is a placeholder AI-generated answer for the question: "${questionId.title}". 

// The AI would analyze the question and provide a comprehensive answer based on the context and requirements.

// Please implement the actual AI generation logic here.`;

//       form.setValue("content", aiContent);
//     } catch (error) {
//       toast.error("Failed to generate AI answer", {
//         description: "Please try again later.",
//       });
//     } finally {
//       setIsAISubmitting(false);
//     }
//   };

  return (
    <>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 mb-4">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button
          type="submit"
          // onClick={handleGenerateAIAnswer}
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
              <span className="text-dark100_light900 small-regular">Generating...</span>
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
              <span className="text-dark100_light900 small-regular">Generate AI Answer</span>
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
                      onChange={field.onChange}
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
