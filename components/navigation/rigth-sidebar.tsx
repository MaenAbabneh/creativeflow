import Image from "next/image";
import Link from "next/link";

import TagsCard from "@/components/card/tags-card";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils"; // Make sure cn is imported

interface RightSidebarProps {
  isMobileView?: boolean;
}

const RightSidebar = ({ isMobileView = false }: RightSidebarProps) => {
  const topQuestions = [
    { id: "1", question: "What is the best way to learn React?" },
    { id: "2", question: "How do I manage state in a React application?" },
    {
      id: "3",
      question:
        "What are the differences between functional and class components?",
    },
    { id: "4", question: "How can I optimize performance in a React app?" },
    { id: "5", question: "What is the purpose of keys in React lists?" },
  ];
  const popularTags = [
    { id: "1", name: "React", qustions: 120 },
    { id: "2", name: "JavaScript", qustions: 95 },
    { id: "3", name: "css", qustions: 80 },
    { id: "4", name: "HTML", qustions: 60 },
    { id: "5", name: "Next.js", qustions: 45 },
  ];

  const baseSectionClasses = "!background-light900_dark300 custom-scrollbar";
  // Desktop specific classes (borders, shadows, rounding) are applied by the <aside> in layout.tsx
  // So, for desktop, RightSidebar just needs to fill its container and handle internal scrolling if necessary.
  const desktopSpecificClasses = "h-full overflow-y-auto"; // Fills the <aside> container from layout.tsx
  const mobileSpecificClasses = "h-full overflow-y-auto"; // Fills the SheetContent

  return (
    <section
      className={cn(
        baseSectionClasses,
        isMobileView ? mobileSpecificClasses : desktopSpecificClasses
      )}
    >
      {/* Inner div for consistent padding and content structure */}
      <div className="p-6 flex flex-col gap-8">
        <div>
          <h2 className="h3-bold text-dark100_light900 mb-4">Top Questions</h2>
          <div className="flex flex-col gap-2">
            {topQuestions.map(({ id, question }) => (
              <Link
                href={ROUTES.PROFILE(id)}
                key={id}
                className="flex flex-row items-center justify-between gap-3 cursor-pointer rounded-lg p-3 hover:bg-light-800/80 dark:hover:bg-dark-400/80 transition-colors"
              >
                <p className="body-medium text-dark100_light900 flex-1">
                  {question}
                </p>
                <Image
                  src="/icons/chevron-right.svg"
                  alt="arrow-right"
                  width={16}
                  height={16}
                  className="invert-colors"
                />
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="h3-bold text-dark100_light900 mb-4">Popular Tags</h3>
          <div className="flex flex-col gap-3">
            {popularTags.map(({ id, name, qustions }) => (
              <TagsCard
                key={id}
                id={id}
                name={name}
                qustions={qustions}
                showCount={true}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;