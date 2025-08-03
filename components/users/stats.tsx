import { formatNumber } from "@/lib/utils";
import { BadgeCounts } from "@/types/global";
import Image from "next/image";

interface Props {
  totalAnswers: number;
  totalQuestions: number;
  badges: BadgeCounts;
  reputationPoints: number;
}

interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}

const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => (
  <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-start gap-3 sm:gap-4 rounded-lg border p-4 sm:p-6 shadow-light-300 dark:shadow-dark-200 transition-all duration-200 hover:shadow-light-200 dark:hover:shadow-dark-100">
    <Image
      src={imgUrl}
      alt={title}
      width={32}
      height={32}
      className="sm:w-10 sm:h-10"
    />
    <div>
      <p className="paragraph-semibold text-dark200_light900">{value}</p>
      <p className="body-medium text-dark300_light700">{title}</p>
    </div>
  </div>
);

const Stats = ({
  totalAnswers,
  totalQuestions,
  badges,
  reputationPoints,
}: Props) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-4 ">
        <h4 className="h3-semibold text-dark200_light900">Stats :</h4>
        <span className="medium-semibold primary-text-gradient">
          {formatNumber(reputationPoints)}
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-5 xs:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-3 sm:gap-4 rounded-lg border p-4 sm:p-6 shadow-light-300 dark:shadow-dark-200 transition-all duration-200 hover:shadow-light-200 dark:hover:shadow-dark-100">
          <div className="text-center">
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestions)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div className="text-center">
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswers)}
            </p>
            <p className="body-medium text-dark400_light700">Answers</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/icons/gold-medal.svg"
          value={badges.GOLD}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/icons/silver-medal.svg"
          value={badges.SILVER}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/icons/bronze-medal.svg"
          value={badges.BRONZE}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
