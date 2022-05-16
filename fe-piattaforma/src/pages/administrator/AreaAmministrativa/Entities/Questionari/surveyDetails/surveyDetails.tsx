import React from 'react';
import { Button, Icon } from 'design-react-kit';
import clsx from 'clsx';
import { Form, InfoPanel, Input } from '../../../../../../components';
// import { useAppSelector } from '../../../../../../redux/hooks';
import {
  // selectSurveyForm,
  // selectSurveySections,
  SurveySectionI,
} from '../../../../../../redux/features/areaAmministrativa/questionario/questionarioSlice';
// import SurveyDetailsSection from './components/surveyDetailsSection';
import { questionarioMock } from './questionarioMock';
import SurveyDetailsSection from './components/surveyDetailsSection';

import { FormI } from '../../../../../../utils/formHelper';
import { useNavigate } from 'react-router-dom';
interface SurveyDetailsI {
  questionarioForm?: FormI;
  questionarioSections?: SurveySectionI[];
}

const SurveyDetails: React.FC<SurveyDetailsI> = (props) => {
  const {
    questionarioForm = questionarioMock.form,
    questionarioSections = questionarioMock.sections,
  } = props;
  const navigate = useNavigate();
  //  const questionarioForm = useAppSelector(selectSurveyForm);
  //  const questionarioSections = useAppSelector(selectSurveySections);

  const renderSectionByType = (section: SurveySectionI, i: number) => {
    switch (section.type) {
      case 'first':
        // eslint-disable-next-line no-case-declarations
        const listFields: string[] = [];
        (section.questions || []).map(question => listFields.push(question.id || ''));

        return (
          <section aria-label={section.sectionTitle}>
            <h4>
              {i + 1}.&nbsp;{section.sectionTitle}
            </h4>
            <InfoPanel list={listFields} />
          </section>
        );
      case 'standard':
      default:
        return (
          <SurveyDetailsSection
            {...section}
            positionSection={i}
            sectionTitle={`${i + 1}. ${section.sectionTitle}`}
          />
        );
    }
  };

  return (
    <div className='my-5'>
      <div className='d-flex flex-row mb-4'>
        <Button onClick={() => history.back()}>
          <Icon icon='it-chevron-left' color='primary' size='' />
        </Button>
        <h1>Dettagli questionario</h1>
      </div>
      <Form>
        <Form.Row>
          {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore */}
          <Input
            {...questionarioForm['survey-type']}
            col='col-6'
            label='Tipologia'
            placeholder='Inserici nome questionario'
            readOnly
          />
          {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore */}
          <Input
            {...questionarioForm['survey-name']}
            col='col-6'
            label='Nome'
            placeholder='Inserici nome questionario'
            readOnly
          />
        </Form.Row>
      </Form>
      {questionarioSections.map((section: SurveySectionI, i: number) => (
        <React.Fragment key={section.id}>
          {renderSectionByType(section, i)}
        </React.Fragment>
      ))}
      <div className={clsx('d-inline-flex', 'justify-content-end', 'w-100')}>
        <Button className='mr-3' color='secondary'>
          Elimina
        </Button>
        <Button
          color='primary'
          onClick={() =>
            navigate(
              `/area-amministrativa/questionari/modifica/${questionarioForm['survey-name'].value}`
            )
          }
        >
          Modifica
        </Button>
        {/* TODO: fare il redirect con ID e non con il nome del questionario!! */}
      </div>
    </div>
  );
};

export default SurveyDetails;
