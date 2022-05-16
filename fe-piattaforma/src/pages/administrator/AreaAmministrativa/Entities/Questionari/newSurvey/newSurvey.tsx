import React, { useEffect, useState } from 'react';
import { Button, Icon } from 'design-react-kit';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Form, InfoPanel, Input, Select } from '../../../../../../components';
import SurveySection from './components/surveySection';
import { useAppSelector } from '../../../../../../redux/hooks';
import {
  selectSurveySections,
  SurveySectionI,
  SurveyQuestionI,
  selectSurveyForm,
  setSurveyFormFieldValue,
  setSurveyEditForm,
} from '../../../../../../redux/features/areaAmministrativa/questionario/questionarioSlice';
import {
  SetSurveyCreation,
  SetSurveyQuestion,
  SetSurveySection,
} from '../../../../../../redux/features/areaAmministrativa/questionario/questionarioThunk';
import { FormHelper, FormI } from '../../../../../../utils/formHelper';
import { useLocation } from 'react-router-dom';

interface NewSurveyI {
  editMode?: boolean;
}

const NewSurvey: React.FC<NewSurveyI> = ({ editMode = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const form = useAppSelector(selectSurveyForm);
  const sections = useAppSelector(selectSurveySections) || [];
  const [activeSectionId, setActiveSectionId] = useState<string>(
    sections[sections?.length - 1]?.id || ''
  );

  useEffect(() => {
    if (editMode) {
      const locationArray = location.pathname.split('/');
      const surveyId = locationArray[locationArray?.length - 1];
      console.log('surveyId', surveyId);
      // TODO: api to get details questionario with surveyId

      dispatch(setSurveyEditForm()); // TODO: da togliere e integrare api
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  useEffect(() => {
    if (sections && sections[sections.length - 1].id !== activeSectionId) {
      setActiveSectionId(sections[sections.length - 1].id || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length]);

  const handleOnInputChange = (value: string | number, field: string) => {
    dispatch(
      setSurveyFormFieldValue({
        form: FormHelper.onInputChange(form, value, field),
      })
    );
  };

  const handleNewSection = () => {
    dispatch(SetSurveySection());
  };

  const handleNewQuestion = (sectionId: string) => {
    dispatch(SetSurveyQuestion(sectionId));
  };

  const handleOnSubmit = () => {
    dispatch(SetSurveyCreation());
  };

  const renderSectionByType = (section: SurveySectionI, i: number) => {
    switch (section.type) {
      case 'first':
        // eslint-disable-next-line no-case-declarations
        const listFields: string[] = [];
        (section.questions || []).map((question) =>
          listFields.push(question.id || '')
        );
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
          <SurveySection
            {...section}
            positionSection={i}
            sectionTitle={`${i + 1}. ${section.sectionTitle}`}
            handleActiveSection={(activeSection) =>
              setActiveSectionId(activeSection)
            }
            isSectionActive={section.id === activeSectionId}
          />
        );
    }
  };

  const checkValidityQuestions = (questions: SurveyQuestionI[]) => {
    let isValid = true;
    if (questions?.length > 0) {
      questions.map((question: SurveyQuestionI) =>
        FormHelper.isValidForm(question.form) === false ? (isValid = false) : ''
      );
    }
    return isValid;
  };

  const checkValidityPreviousSections = (section: SurveySectionI) => {
    let isSectionValid = true;
    let questionsValid = true;
    isSectionValid = FormHelper.isValidForm(section?.form);
    if (section?.questions && section.questions?.length > 0) {
      questionsValid = checkValidityQuestions(section.questions);
    }
    return isSectionValid && questionsValid;
  };

  const checkValidityForm = (form: FormI) => {
    const isValidForm = FormHelper.isValidForm(form);
    let sectionsValid = true;
    if (sections) {
      sections.map((section: SurveySectionI) =>
        checkValidityPreviousSections(section) === false
          ? (sectionsValid = false)
          : ''
      );
    }
    return isValidForm && sectionsValid;
  };

  return (
    <div className='my-5'>
      <h1 className='mb-4'>Configurazione questionario</h1>
      <Form>
        <Form.Row>
          <Select
            {...form['survey-type']}
            col='col-6'
            label='Tipologia'
            options={[{ label: 'Primo accesso', value: 'Primo accesso' }]}
            onInputChange={handleOnInputChange}
            placeholder='Seleziona tipologia questionario'
          />
          <Input
            {...form['survey-name']}
            col='col-6'
            label='Nome'
            onInputBlur={handleOnInputChange}
            placeholder='Inserici nome questionario'
          />
        </Form.Row>
      </Form>
      {sections.map((section: SurveySectionI, i: number) => (
        <>
          <React.Fragment key={section.id}>
            {renderSectionByType(section, i)}
          </React.Fragment>
          <div className={clsx('d-inline-flex', 'w-50')}>
            {i === sections.length - 1 && (
              <Button
                onClick={handleNewSection}
                className='d-flex justify-content-between'
                disabled={!checkValidityPreviousSections(section)}
              >
                <Icon
                  color='primary'
                  icon='it-plus-circle'
                  size='sm'
                  className='mr-2'
                />
                Aggiungi sezione
              </Button>
            )}
            {i !== 0 && (
              <Button
                onClick={() => handleNewQuestion(section?.id || '')}
                className='d-flex justify-content-between'
                disabled={!checkValidityQuestions(section.questions || [])}
              >
                <Icon
                  color='primary'
                  icon='it-plus-circle'
                  size='sm'
                  className='mr-2'
                />
                Aggiungi domanda
              </Button>
            )}
          </div>
        </>
      ))}
      <div className={clsx('d-inline-flex', 'justify-content-end', 'w-100')}>
        <Button className='mr-3' color='secondary'>
          Salva in bozza
        </Button>
        <Button
          color='primary'
          onClick={handleOnSubmit}
          disabled={!checkValidityForm(form)}
        >
          Conferma creazione
        </Button>
      </div>
    </div>
  );
};

export default NewSurvey;
