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
}
const LocalSearch = ({
  placeholder,
  otherClass,
  imgSrc,
  route,
}: LocalSearchProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const SearchParams = useSearchParams();
  const query = SearchParams.get("query") || "";
  const [searchQuary, setSearchQuary] = useState(query || "");
  useEffect(() => {
    const deboncefn = setTimeout(()=>{
    if (searchQuary) {
      const newUrl = formUrlQuery({
        param: SearchParams.toString(),
        key: "query",
        value: searchQuary,
      });
      router.push(newUrl , {scroll: false});
    }else{
      const removeUrl = removeUrlQuery({
        param: SearchParams.toString(),
        keyRemove: ["query"],
      });
      router.push(removeUrl , {scroll: false});
    }
    },300);
    return () => clearTimeout(deboncefn);
  }, [searchQuary, SearchParams, router, route, pathName]);

  return (
    <div className="flex items-center max-w-[650px] rounded-xl min-h-[50px] background-light800_darkgradient grow ">
      <Image
        src={imgSrc}
        alt="search icon"
        width={25}
        height={25}
        className="ml-3 mr-2 object-contain invert-colors cursor-pointer"
      />

      <Input
        value={searchQuary}
        onChange={(e) => setSearchQuary(e.target.value)}
        type="text"
        placeholder={placeholder || "Search questions..."}
        className={`border-none !bg-transparent placeholder shadow-none outline-none text-dark400_light800 no-focus  ${otherClass}`}
      />
      {searchQuary && (
        <Image
          src="/icons/close.svg"
          alt="close icon"
          width={20}
          height={20}
          className="mr-3 cursor-pointer !invert-colors-2 " 
          onClick={() => setSearchQuary("")}
        />
      )}
    </div>
  );
};

export default LocalSearch;
