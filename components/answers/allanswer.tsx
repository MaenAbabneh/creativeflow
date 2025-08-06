import React from "react";

import { AnswerFilters } from "@/constants/filters";
import { EMPTY_ANSWERS } from "@/constants/states";
import { ActionResponse, Answers } from "@/types/global";

import AnswerCard from "../card/answer-card";
import DataRender from "../DataRender";
import CommonFilter from "../filter/commonfilter";
import Pagination from "../pagination";

interface Props extends ActionResponse<Answers[]> {
  totalAnswers: number;
  isNext?: boolean;
  page?: number ;
}

function AllAnswers({ data, success, error, totalAnswers, isNext, page }: Props) {
  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <CommonFilter
          filters={AnswerFilters}
          otherClasses="sm:min-w-32"
          containerClasses="max-xs:w-full"
        />
      </div>

      <DataRender
        data={data}
        error={error}
        success={success}
        empty={EMPTY_ANSWERS}
        render={(answers) =>
          answers.map((answer) => <AnswerCard key={answer._id} {...answer} />)
        }
      />
      <Pagination isNext={isNext} page={page} />
    </div>
  );
}

export default AllAnswers;
