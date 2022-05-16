import clsx from 'clsx';
import { Button, FormGroup, Icon, Toggle } from 'design-react-kit';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '../../../../../../../../components';
import { OptionType } from '../../../../../../../../components/Form/select';
import {
  cloneSurveyQuestion,
  removeSurveyQuestion,
  selectSurveyQuestion,
  setSurveyQuestionFieldValue,
  SurveyQuestionI,
} from '../../../../../../../../redux/features/areaAmministrativa/questionario/questionarioSlice';
import { useAppSelector } from '../../../../../../../../redux/hooks';
import { FormHelper } from '../../../../../../../../utils/formHelper';
import { answerType } from '../../../questionariConstants';
import MultiOptionForm from './multiOptionForm';
import './surveyQuestion.scss';

export interface SurveyQuestionComponentI extends SurveyQuestionI {
  className?: string;
  isOpen?: boolean;
  position?: number;
  sectionID?: string | undefined;
  totQuestionsSection?: number;
  handleEditQuestion: (questionIndex: number, sectionID: string) => void;
}

const SurveyQuestion: React.FC<SurveyQuestionComponentI> = (props) => {
  const dispatch = useDispatch();
  const {
    id,
    className,
    isOpen = true,
    form,
    position = 1,
    sectionID = new Date().getTime().toString(),
    totQuestionsSection = 1,
    handleEditQuestion,
  } = props;
  const [questionClosed, setQuestionClosed] = useState(false);

  const surveyQuestion = useAppSelector((state) =>
    selectSurveyQuestion(state, sectionID, position)
  );
  const handleOnInputChange = (
    value: string | number,
    field: string,
    newForm = form
  ) => {
    dispatch(
      setSurveyQuestionFieldValue({
        sectionID,
        questionID: id,
        form: FormHelper.onInputChange(newForm, value, field),
      })
    );
  };

  const handleDeleteQuestion = () => {
    dispatch(removeSurveyQuestion({ sectionID, questionID: id || '' }));
  };

  const handleCloneQuestion = () => {
    dispatch(cloneSurveyQuestion({ sectionID, questionID: id || '' }));
  };

  useEffect(() => {
    if(!isOpen){
      setQuestionClosed(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (surveyQuestion?.form) {
      const answer = surveyQuestion?.form['question-type']?.value;
      const isRequired = answer === 'list' || answer === 'multiple';
      const { value, field } = surveyQuestion?.form['question-values'] || {};
      handleOnInputChange(isRequired ? value : '', field, {
        ...surveyQuestion.form,
        'question-values': {
          ...surveyQuestion.form['question-values'],
          required: isRequired,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyQuestion?.form['question-type']?.value]);

  const getAnswer = (answer: string | number = 'text') => {
    switch (answer) {
      case 'select':
      case 'checkbox':
        return (
          <MultiOptionForm
            editValues={questionClosed}
            values={surveyQuestion?.form['question-values'].value}
            onFormChange={(values: OptionType[]) =>
              handleOnInputChange(
                JSON.stringify(values),
                surveyQuestion?.form['question-values'].field
              )
            }
          />
        );
      default:
        return;
    }
  };

  return (
    <>
      {isOpen && form && (
        <Form
          key={id}
          className={clsx(className, 'survey-question-container mb-3')}
        >
          <div className='d-flex justify-content-end mb-3'>
            <Button
              onClick={handleDeleteQuestion}
              disabled={position === 0 && totQuestionsSection === 1}
              className='d-flex justify-content-between pr-0'
            >
              <Icon color='primary' icon='it-delete' size='sm' />
              <span className='color-black'>Elimina domanda</span>
            </Button>
          </div>
          <Form.Row>
            <Input
              {...form['question-description']}
              col='col-6'
              label='Testo della domanda'
              onInputBlur={handleOnInputChange}
              id={`section-${sectionID}-question-${position}-description`}
              placeholder='Inserisci testo domanda'
            />
            <Select
              {...form['question-type']}
              col='col-6'
              id={`section-${sectionID}-question-${position}-type`}
              label='Tipologia risposta'
              options={answerType}
              onInputChange={handleOnInputChange}
              placeholder='Seleziona tipologia domanda'
            />
          </Form.Row>
          <>{getAnswer(surveyQuestion?.form['question-type']?.value)}</>
          <Form.Row>
            <FormGroup check className='d-flex justify-content-end w-100'>
              <Toggle
                label='Campo obbligatorio'
                disabled={false}
                onChange={(e) =>
                  handleOnInputChange(
                    e.target.checked.toString(),
                    form['question-required'].field
                  )
                }
              />
            </FormGroup>
          </Form.Row>
        </Form>
      )}
      {!isOpen && (
        <div
          className={clsx(
            'd-flex flex-row align-items-center justify-content-between survey-question-container__closed-box mb-3',
            !isOpen &&
              !FormHelper.isValidForm(form) &&
              'survey-question-container__error-question'
          )}
        >
          <span>{position + 1}</span>
          <span>{surveyQuestion?.form['question-description'].value}</span>
          <div className='d-flex flex-column'>
            <span>Tipologia risposta</span>
            <span>
              <strong>
                {
                  answerType.filter(
                    (type) =>
                      type.value ===
                      surveyQuestion?.form['question-type']?.value
                  )[0]?.label
                }
              </strong>
            </span>
          </div>
          <div className='d-flex flex-row justify-content-center'>
            <Button onClick={() => handleEditQuestion(position, sectionID)}>
              <Icon color='primary' icon='it-pencil' size='sm' />
            </Button>
            <Button onClick={handleCloneQuestion}>
              <Icon color='primary' icon='it-copy' size='sm' />
            </Button>
            <Button
              onClick={handleDeleteQuestion}
              disabled={position === 0 && totQuestionsSection === 1}
            >
              <Icon color='primary' icon='it-delete' size='sm' />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default memo(SurveyQuestion);
