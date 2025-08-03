"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { formUrlQuery } from "@/lib/url";

interface Props {
  isNext?: boolean;
  page?: number | string | undefined;
  containerClasses?: string;
}

function Pagination({ isNext, page = 1, containerClasses }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (type: "Prev" | "Next") => {
    const NextPageNumber =
      type === "Prev" ? Number(page) - 1 : Number(page) + 1;

    const newUrl = formUrlQuery({
      param: searchParams.toString(),
      key: "page",
      value: NextPageNumber.toString(),
    });
    router.push(newUrl);
  };
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8",
        containerClasses
      )}
    >
      {Number(page) > 1 && (
        <Button
          onClick={() => {
            handlePageChange("Prev");
          }}
          className="light-border-2 btn flex min-h-[36px] sm:min-h-[40px] items-center justify-center gap-2 border px-3 sm:px-4 transition-all duration-200 hover:scale-105"
        >
          <p className="body-medium text-dark200_light800">Prev</p>
        </Button>
      )}
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3 py-2 sm:px-4 sm:py-2.5 transition-all duration-200">
        <p className="body-semibold text-light-900">{page}</p>
      </div>
      {isNext && (
        <Button
          onClick={() => {
            handlePageChange("Next");
          }}
          className="light-border-2 btn flex min-h-[36px] sm:min-h-[40px] items-center justify-center gap-2 border px-3 sm:px-4 transition-all duration-200 hover:scale-105"
        >
          <p className="body-medium text-dark200_light800">Next</p>
        </Button>
      )}
    </div>
  );
}

export default Pagination;
