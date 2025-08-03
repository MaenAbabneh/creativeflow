"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteQuestion } from "@/lib/actions/qustion.action";
import { deleteAnswer } from "@/lib/actions/answer.action";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteActionMobile = ({ type, itemId }: Props) => {
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleEdit = async () => {
    if (!itemId) {
      toast.error("Error", {
        description: "Unable to edit: Item ID is missing",
      });
      return;
    }

    if (type === "Question") {
      router.push(`/questions/${itemId}/edit`);
    }
  };

  const handleDelete = async () => {
    if (type === "Question") {
      await deleteQuestion({ questionId: itemId });

      toast.warning("Question deleted", {
        description: "Your question has been deleted successfully.",
      });
    } else if (type === "Answer") {
     await deleteAnswer({ answerId: itemId });
     
      toast.warning("Answer deleted", {
        description: "Your answer has been deleted successfully.",
      });
    }
    setIsAlertOpen(false);
  };

  return (
    <div className="block md:hidden ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="  p-0 hover:bg-light-700 dark:hover:bg-dark-400 "
          >
            <MoreVertical className=" text-dark400_light700" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 background-light800_dark300 border-light-700 dark:border-dark-400 shadow-lg"
        >
          {type === "Question" && (
            <DropdownMenuItem
              onClick={handleEdit}
              className="flex items-center gap-2 px-3 py-2.5 text-dark400_light700 hover:bg-light-700 dark:hover:bg-dark-400 cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400"
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">Edit</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => setIsAlertOpen(true)}
            className="flex items-center gap-2 px-3 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 cursor-pointer focus:bg-red-50 dark:focus:bg-red-950/20"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="text-sm font-medium">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="background-light800_dark300 max-w-sm mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-dark100_light900 text-lg">
              Delete {type === "Question" ? "Question" : "Answer"}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-dark400_light700 text-sm">
              This action cannot be undone. This will permanently delete your{" "}
              {type === "Question" ? "question" : "answer"} and remove it from
              our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col gap-2 sm:flex-row">
            <AlertDialogCancel
              className="btn-secondary w-full sm:w-auto order-2 sm:order-1"
              onClick={() => setIsAlertOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white border-red-500 order-1 sm:order-2"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteActionMobile;
