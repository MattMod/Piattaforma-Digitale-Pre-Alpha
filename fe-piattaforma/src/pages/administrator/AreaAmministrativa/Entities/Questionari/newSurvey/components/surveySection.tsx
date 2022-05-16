import clsx from 'clsx';
import { Button, Col, Icon } from 'design-react-kit';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '../../../../../../../components';
import SurveyQuestion from './SurveyQuestion/surveyQuestion';
import {
  removeSurveySection,
  setSurveySectionFieldValue,
  SurveyQuestionI,
  SurveySectionI,
} from '../../../../../../../redux/features/areaAmministrativa/questionario/questionarioSlice';
import { FormHelper } from '../../../../../../../utils/formHelper';

const SurveySection: React.FC<SurveySectionI> = (props) => {
  const dispatch = useDispatch();
  const {
    form = {},
    id,
    sectionTitle,
    questions = [],
    handleActiveSection = () => ({}),
    isSectionActive = false,
  } = props;
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(questions?.length-1);

  useEffect(() => {
    if(questions && (questions.length -1 !== activeQuestionIndex)){
      setActiveQuestionIndex(questions.length -1);
    }
  }, [questions.length])

  const handleRemoveSection = () => {
    dispatch(removeSurveySection({ section: { ...props } }));
  };
  
  const handleOnInputChange = (value: string | number, field: string) => {
    dispatch(
      setSurveySectionFieldValue({
        sectionID: id,
        form: FormHelper.onInputChange(form, value, field),
      })
    );
  };

  return (
    <section aria-label={sectionTitle}>
      <div className={clsx('d-flex', 'justify-content-between', 'my-2 py-2')}>
        <h4>{sectionTitle}</h4>
        <Button
          onClick={handleRemoveSection}
          className='d-flex justify-content-between'
        >
          <Icon color='primary' icon='it-delete' size='sm' className='mr-2' />
          Elimina sezione
        </Button>
      </div>
      <Form>
        <Form.Row>
          <Input
            {...form['section-title']}
            col='col-6'
            id={`section-${id}-title`}
            label='Titolo'
            onInputBlur={handleOnInputChange}
            placeholder='Inserisci titolo sezione'
          />
          <Select
            {...form['section-visibility']}
            col='col-6'
            id={`section-${id}-visibility`}
            label='Visibilità sezione rispetto al servizio erogato'
            options={[
              { label: 'Solo facilitazione', value: 'Solo facilitazione' },
            ]}
            onInputChange={handleOnInputChange}
            placeholder='Seleziona visibilità'
          />
        </Form.Row>
      </Form>
      <Col>
        <h4>Lista domande questionario</h4>
        {questions.map((question: SurveyQuestionI, i: number) => (
          <React.Fragment key={`section-${id}-question-${i}`}>
            <SurveyQuestion
              {...question}
              sectionID={id}
              position={i}
              isOpen={i === activeQuestionIndex && isSectionActive}
              totQuestionsSection={questions.length}
              handleEditQuestion={(activeQuestion, activeSection) => {
                setActiveQuestionIndex(activeQuestion);
                handleActiveSection(activeSection);
              }}
            />
          </React.Fragment>
        ))}
      </Col>
    </section>
  );
};

export default SurveySection;
