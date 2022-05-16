import clsx from 'clsx';
import {  Col } from 'design-react-kit';
import React from 'react';
import { Form, Input } from '../../../../../../../components';
import {
  SurveyQuestionI,
  SurveySectionI,
} from '../../../../../../../redux/features/areaAmministrativa/questionario/questionarioSlice';
import SurveyDetailsQuestion from './SurveyDetailsQuestion/surveyDetailsQuestion';

const SurveyDetailsSection: React.FC<SurveySectionI> = (props) => {
  const {
    form = {},
    id,
    sectionTitle,
    questions = [],
  } = props;
  
  return (
    <section aria-label={sectionTitle}>
      <div className={clsx('d-flex', 'justify-content-between', 'my-2 py-2')}>
        <h4>{sectionTitle}</h4>
      </div>
      <Form>
        <Form.Row>
          <Input
            {...form['section-title']}
            col='col-6'
            id={`section-${id}-title`}
            label='Titolo'
            placeholder='Inserisci titolo sezione'
            value={form['section-title'].value}
            readOnly
          />
          <Input
            {...form['section-visibility']}
            col='col-6'
            id={`section-${id}-visibility`}
            label='Visibilità sezione rispetto al servizio erogato'
            placeholder='Seleziona visibilità'
            value={form['section-visibility'].value}
            readOnly
          />
        </Form.Row>
      </Form>
      <Col>
        <h4>Lista domande questionario</h4>
        {questions.map((question: SurveyQuestionI, i: number) => (
          <React.Fragment key={`section-${id}-question-${i}`}>
            <SurveyDetailsQuestion
              {...question}
              sectionID={id}
              position={i}
              totQuestionsSection={questions.length}
              handleEditQuestion={() => ({})}
            />
          </React.Fragment>
        ))}
      </Col>
    </section>
  );
};

export default SurveyDetailsSection;
