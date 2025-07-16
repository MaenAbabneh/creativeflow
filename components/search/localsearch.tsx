"use client";

import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeUrlQuery } from "@/lib/url";

interface LocalSearchProps {
  placeholder: string;
  otherClass: string;
  imgSrc: string;
  route: string;
  iconPosition?: "left" | "right";
}
const LocalSearch = ({
  placeholder,
  otherClass,
  imgSrc,
  route,
  iconPosition = "left",
}: LocalSearchProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const SearchParams = useSearchParams();
  const query = SearchParams.get("query") || "";
  const [searchQuary, setSearchQuary] = useState(query || "");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const deboncefn = setTimeout(() => {
      if (searchQuary) {
        const newUrl = formUrlQuery({
          param: SearchParams.toString(),
          key: "query",
          value: searchQuary,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (SearchParams.has("query")) {
          const removeUrl = removeUrlQuery({
            param: SearchParams.toString(),
            keyRemove: ["query"],
          });
          router.push(removeUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(deboncefn);
  }, [searchQuary, SearchParams, router, route, pathName]);

  const handleClear = () => {
    setSearchQuary("");
    if (SearchParams.has("query")) {
      const removeUrl = removeUrlQuery({
        param: SearchParams.toString(),
        keyRemove: ["query"],
      });
      router.push(removeUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center w-full max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] rounded-xl min-h-[50px] background-light800_darkgradient">
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={20}
          height={20}
          className="ml-3 mr-2 object-contain invert-colors cursor-pointer"
        />
      )}

      <Input
        value={searchQuary}
        onChange={(e) => setSearchQuary(e.target.value)}
        type="text"
        placeholder={placeholder || "Search questions..."}
        className={`border-none !bg-transparent placeholder shadow-none outline-none text-dark400_light800 no-focus flex-1 ${otherClass}`}
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search icon"
          width={20}
          height={20}
          className="ml-3 mr-2 object-contain invert-colors cursor-pointer"
        />
      )}
      {searchQuary && (
        <Image
          src="/icons/close.svg"
          alt="clear search"
          width={20}
          height={20}
          className="mr-3 cursor-pointer !invert-colors-2 hover:opacity-70 transition-opacity"
          onClick={handleClear}
        />
      )}
    </div>
  );
};

export default LocalSearch;
