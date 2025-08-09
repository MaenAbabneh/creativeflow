"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formUrlQuery } from "@/lib/url";
import { Country } from "@/types/global";

import LocalSearch from "../search/localsearch";

interface JobsFilterProps {
  countriesList: Country[];
}

const JobsFilter = ({ countriesList }: JobsFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleUpdateParams = (value: string) => {
    const newUrl = formUrlQuery({
      param: searchParams.toString(),
      key: "location",
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="relative mt-11 flex w-full justify-between gap-5 max-sm:flex-col sm:items-center">
      <LocalSearch
        route={pathname}
        iconPosition="left"
        imgSrc="/icons/job-search.svg"
        placeholder="Job Title, Company, or Keywords"
        otherClass="flex-1 max-sm:w-full"
      />

      <Select onValueChange={(value) => handleUpdateParams(value)}>
        <SelectTrigger className="body-regular light-border background-light800_dark300 text-dark500_light700 line-clamp-1 flex min-h-[56px] items-center gap-3 border p-4 sm:max-w-[210px] shadow-light-100 dark:shadow-none hover:background-light700_dark400 transition-colors">
          <Image
            src="/icons/carbon-location.svg"
            alt="location"
            width={18}
            height={18}
            className="invert-colors"
          />
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select Location" />
          </div>
        </SelectTrigger>

        <SelectContent className="body-semibold max-h-[350px] max-w-[250px] background-light900_dark300 light-border border">
          <SelectGroup>
            {countriesList ? (
              countriesList.map((country: Country) => (
                <SelectItem
                  key={country.name.common}
                  value={country.name.common}
                  className="px-4 py-3 text-dark300_light700 hover:background-light800_dark400 cursor-pointer"
                >
                  {country.name.common}
                </SelectItem>
              ))
            ) : (
              <SelectItem
                value="No results found"
                className="text-dark400_light700"
              >
                No results found
              </SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobsFilter;
