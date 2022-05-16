import clsx from 'clsx';
import { Button, Icon } from 'design-react-kit';
import React, { memo, useState } from 'react';
import { OptionType } from '../../../../../../../../components/Form/select';
import { SurveyQuestionI } from '../../../../../../../../redux/features/areaAmministrativa/questionario/questionarioSlice';
import { answerType } from '../../../questionariConstants';
import './surveyDetailsQuestion.scss';

export interface SurveyQuestionComponentI extends SurveyQuestionI {
  className?: string;
  isOpen?: boolean;
  position?: number;
  sectionID?: string | undefined;
  totQuestionsSection?: number;
  handleEditQuestion: (questionIndex: number, sectionID: string) => void;
}

const SurveyDetailsQuestion: React.FC<SurveyQuestionComponentI> = (props) => {
  const {
    // id,
    className,
    form,
    position = 1,
  } = props;
  const [openQuestion, setOpenQuestion] = useState(false);
  const optionValues =
    form['question-values']?.value !== ''
      ? JSON.parse(form['question-values']?.value)
      : '[]';

  return (
    <>
      <div
        className={clsx(
          className,
          'd-flex flex-row align-items-center justify-content-between survey-question-details-container__closed-box',
          !openQuestion && 'mb-3'
        )}
      >
        <span>{position + 1}</span>
        <span>{form['question-description']?.value}</span>
        <div className='d-flex flex-column'>
          <span>Tipologia risposta</span>
          <span>
            <strong>
              {
                answerType.filter(
                  (f) => f.value === form['question-type'].value
                )[0]?.label
              }
            </strong>
          </span>
        </div>
        <Button
          className={clsx(
            form['question-type'].value !== 'list' &&
              form['question-type'].value !== 'multiple' &&
              'invisible'
          )}
          onClick={() => setOpenQuestion(!openQuestion)}
        >
          <Icon color='primary' icon='it-expand' />
        </Button>
      </div>
      {openQuestion && (
        <div className='survey-question-details-container__expanded-box mb-3'>
          <div className='primary-bg-b1 survey-question-details-container__line mb-3'></div>
          {console.log(form['question-values'].value)}
          <ul className='survey-question-details-container__list ml-5'>
            {optionValues.map((opt: OptionType, i: number) => (
              <li
                key={i}
                className='survey-question-details-container__list-elem ml-3 my-2'
              >
                {opt.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default memo(SurveyDetailsQuestion);
