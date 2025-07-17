import React from 'react'
import DataRender from '../DataRender';
import { ActionResponse, Answers } from '@/types/global';
import { EMPTY_ANSWERS } from '@/constants/states';
import AnswerCard from '../card/answer-card';

interface Props extends ActionResponse<Answers[]> {
  totalAnswers: number;
}

function AllAnswers({ data, success, error, totalAnswers }: Props) {
 return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {totalAnswers} {totalAnswers === 1 ? "Answer" : "Answers"}
        </h3>
        <p>Filters</p>
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
    </div>
  );
}

export default AllAnswers;