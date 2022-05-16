import { Dispatch, Selector } from '@reduxjs/toolkit';
import {
  FormHelper,
  newForm,
  newFormField,
} from '../../../../utils/formHelper';
import { generateJsonFormSchema } from '../../../../utils/jsonFormHelper';
import { RootState } from '../../../store';
import { hideLoader, showLoader } from '../../app/appSlice';
import {
  setSurveyQuestion,
  setSurveySection,
  SurveyQuestionI,
  SurveySectionI,
} from './questionarioSlice';

export const getTypeQuestionFirstSection = (id: string) => {
  switch (id) {
    case 'Nome':
    case 'Nazionalità':
    case 'Email':
    case 'Cognome':
    case 'Codice Fiscale':
    case 'Titolo di studio':
    case 'N Documento':
    case 'Occupazione':
      return 'text';
    case "Fascia d'età":
    case 'Telefono':
      return 'number';
    case 'Consenso al trattamento dati':
      return 'multiple';
    default:
      return '';
  }
};

export const newQuestion = (
  { id = new Date().getTime().toString(), form, sectionId }: SurveyQuestionI = {
    id: new Date().getTime().toString(),
  }
) => ({
  id,
  form:
    form ||
    newForm([
      newFormField({
        field: 'question-description',
        required: true,
        value: sectionId === 'anagraphic-section' ? id : '',
      }),
      newFormField({
        field: 'question-type',
        required: true,
        value:
          sectionId === 'anagraphic-section'
            ? getTypeQuestionFirstSection(id)
            : '',
      }),
      newFormField({
        field: 'question-values',
      }),
      newFormField({
        field: 'question-required',
        // TODO add RegexpType.BOOLEAN
        //type: RegexpType.BOOLEAN,
      }),
    ]),
});

export const newSection = (
  {
    form,
    id = new Date().getTime().toString(),
    questions = [],
    sectionTitle = 'Sezione',
    type = 'standard',
  }: SurveySectionI = {
    id: new Date().getTime().toString(),
    questions: [],
    sectionTitle: 'Sezione',
    type: 'standard',
  }
) => ({
  form,
  id,
  questions,
  sectionTitle,
  type,
});

const SetSurveySectionAction = { type: 'questionario/SetSurveySection' };
export const SetSurveySection =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      console.log({ payload });
      // TODO manage update section
      dispatch({ ...SetSurveySectionAction, payload });
      dispatch(showLoader());
      dispatch(
        setSurveySection({
          section: newSection({
            form: newForm([
              newFormField({
                field: 'section-title',
                required: true,
              }),
              newFormField({
                field: 'section-visibility',
                required: true,
              }),
            ]),
            sectionTitle: 'Sezione',
            questions: [newQuestion()],
          }),
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

const SetSurveyQuestionAction = {
  type: 'questionario/SetSurveyQuestionAction',
};
export const SetSurveyQuestion =
  (payload?: any) => async (dispatch: Dispatch) => {
    try {
      dispatch({ ...SetSurveyQuestionAction, payload });
      dispatch(showLoader());
      dispatch(
        setSurveyQuestion({
          question: newQuestion(),
          sectionID: payload,
        })
      );
    } finally {
      dispatch(hideLoader());
    }
  };

const transformQuestionToFormField = (question: any) => {
  return newFormField({
    field: question['question-description'],
    options: question['question-values']
      ? JSON.parse(question['question-values'])
      : undefined,
    required: question['question-required'],
    type: question['question-type'],
  });
};

export interface SurveyCreationBodyI {
  'survey-type'?: string;
  'survey-name'?: string;
  sections?: {
    'section-title'?: string | undefined;
    'section-visibility'?: string | undefined;
    schema: string;
    schemaUI?: string | undefined;
  }[];
}

const SetSurveyCreationAction = { type: 'questionario/SetSurveyCreation' };
export const SetSurveyCreation =
  (payload?: any) => async (dispatch: Dispatch, select: Selector) => {
    try {
      dispatch({ ...SetSurveyCreationAction, payload });
      dispatch(showLoader());
      const {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        questionario,
      } = select((state: RootState) => state);
      if (questionario) {
        console.log('questionario', questionario);
        let valid = true;
        valid = valid && FormHelper.isValidForm(questionario.form);
        if (valid) {
          const body: SurveyCreationBodyI = {
            ...FormHelper.getFormValues(questionario.form),
            sections: [],
          };
          questionario.sections.forEach((section: SurveySectionI) => {
            valid = valid && FormHelper.isValidForm(section.form);
            if (valid) {
              const finalForm: any = [];
              (section.questions || []).forEach((question: SurveyQuestionI) => {
                valid = valid && FormHelper.isValidForm(question.form);
                if (valid) {
                  finalForm.push(
                    transformQuestionToFormField(
                      FormHelper.getFormValues(question.form)
                    )
                  );
                }
              });
              if (valid) {
                body.sections?.push({
                  'section-title': FormHelper.getFormValues(section.form)[
                    'section-title'
                  ]?.toString(),
                  'section-visibility': FormHelper.getFormValues(section.form)[
                    'section-visibility'
                  ]?.toString(),
                  ...generateJsonFormSchema(newForm(finalForm, true), true),
                });
              }
            }
          });
          if (valid) {
            // TODO create jsonForm and submit to API
            console.log('body', body);
          }
        }
      }
    } finally {
      dispatch(hideLoader());
    }
  };
