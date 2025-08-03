import Image from "next/image";
import Link from "next/link";

import TagsCard from "@/components/card/tags-card";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils"; 
import DataRender from "../DataRender";
import { getPopularQuestions } from "@/lib/actions/qustion.action";
import { getPopularTags } from "@/lib/actions/tag.action";

interface RightSidebarProps {
  isMobileView?: boolean;
}

const RightSidebar = async ({ isMobileView = false }: RightSidebarProps) => {
  const [
    { success, data: topQuestions, error },
    { success: tagsSuccess, data: tagsData, error: tagsError },
  ] = await Promise.all([getPopularQuestions(), getPopularTags()]);

  const baseSectionClasses = "!background-light900_dark300 custom-scrollbar";
  const desktopSpecificClasses = "h-full overflow-y-auto";
  const mobileSpecificClasses = "h-full overflow-y-auto";
  return (
    <section
      className={cn(
        baseSectionClasses,
        isMobileView ? mobileSpecificClasses : desktopSpecificClasses
      )}
    >
      <div className="pt-10 px-6 flex flex-col gap-6">
        <div>
          <h2 className="h3-bold text-dark100_light900 mb-3">Top Questions</h2>
          <DataRender
            data={topQuestions}
            empty={{
              title: "No questions found",
              message: "No questions have been asked yet.",
            }}
            success={success}
            error={error}
            render={(hotQuestions) => (
              <div className="mt-7 flex w-full flex-col gap-[30px]">
                {hotQuestions.map(({ _id, title }) => (
                  <Link
                    key={_id}
                    href={ROUTES.QUESTION(_id)}
                    className="flex cursor-pointer items-center justify-between gap-7"
                  >
                    <p className="body-medium text-dark500_light700 line-clamp-2">
                      {title}
                    </p>

                    <Image
                      src="/icons/chevron-right.svg"
                      alt="Chevron"
                      width={20}
                      height={20}
                      className="invert-colors"
                    />
                  </Link>
                ))}
              </div>
            )}
          />
        </div>

        <div>
          <h3 className="h3-bold text-dark100_light900 mb-4">Popular Tags</h3>
          <DataRender
            data={tagsData}
            empty={{
              title: "No tags found",
              message: "No tags have been created yet.",
            }}
            success={tagsSuccess}
            error={tagsError}
            render={(tags) => (
              <div className="mt-7 flex flex-col gap-4">
                {tags.map(({ _id, name, questions }) => (
                  <TagsCard
                    key={_id}
                    _id={_id}
                    name={name}
                    questions={questions}
                    showCount
                    compact
                  />
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
