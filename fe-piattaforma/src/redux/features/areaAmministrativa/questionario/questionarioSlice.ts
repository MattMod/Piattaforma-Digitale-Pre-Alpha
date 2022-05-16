import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnagraficaListMock } from '../../../../pages/administrator/AreaAmministrativa/Entities/Questionari/questionariConstants';
import { newForm, newFormField } from '../../../../utils/formHelper';
import { transformJsonToForm } from '../../../../utils/jsonFormHelper';
import { RootState } from '../../../store';
import { newQuestion, newSection } from './questionarioThunk';

export interface SurveyQuestionI {
  id?: string;
  form?: any;
  sectionId?: string;
}

export interface SurveySectionI {
  id?: string;
  questions?: SurveyQuestionI[];
  sectionTitle: string;
  type?: 'first' | 'standard' | string;
  form?: any | undefined;
  positionSection?: number;
  handleActiveSection?: (sectionID: string) => void;
  isSectionActive?: boolean;
}

export interface QuestionarioStateI {
  form?: any;
  sections: SurveySectionI[];
}

const baseSections = [
  newSection({
    id: 'anagraphic-section',
    sectionTitle: 'Sezione - Dati anagrafici del cittadino (obbligatoria)',
    type: 'first',
    form: newForm([
      newFormField({
        field: 'section-title',
        required: true,
        value: 'Dati anagrafici del cittadino (obbligatoria)',
      }),
      newFormField({
        field: 'section-visibility',
        required: true,
        value: 'Solo facilitazione', // TODO: aggiornare valore quando definito!
      }),
    ]),
    questions: AnagraficaListMock.map(elem => newQuestion({ id: elem, sectionId: 'anagraphic-section' })),
  }),
  newSection({
    sectionTitle: 'Sezione',
    questions: [newQuestion()],
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
  }),
];

const baseSurveyForm = newForm([
  newFormField({
    field: 'survey-type',
    required: true,
  }),
  newFormField({
    field: 'survey-name',
    required: true,
  }),
]);

const initialState: QuestionarioStateI = {
  form: baseSurveyForm,
  sections: [...baseSections],
};

export const questionarioSlice = createSlice({
  name: 'questionario',
  initialState,
  reducers: {
    setSurveyFormFieldValue: (state, action: PayloadAction<any>) => {
      if (action.payload.form) {
        state.form = action.payload.form;
      }
    },
    setSurveySection: (
      state,
      action: PayloadAction<{ section: SurveySectionI }>
    ) => {
      if (action.payload.section) {
        const newStateSections = state.sections;
        const newStateSectionIndex = newStateSections?.findIndex(
          (section) => section.id === action.payload.section.id
        );
        if (newStateSectionIndex >= 0) {
          newStateSections[newStateSectionIndex] = action.payload.section;
        } else {
          newStateSections.push(action.payload.section);
        }
        state.sections = newStateSections;
      }
    },
    removeSurveySection: (
      state,
      action: PayloadAction<{ section: SurveySectionI }>
    ) => {
      if (action.payload.section?.id) {
        const newStateSections = state.sections.filter(
          (section) => section.id !== action.payload.section.id
        );
        if (newStateSections.length) {
          state.sections = newStateSections;
        } else {
          state.sections = initialState.sections;
        }
      }
    },
    setSurveySectionFieldValue: (state, action: PayloadAction<any>) => {
      const { sectionID, form } = action.payload;
      if (sectionID && form) {
        const newStateSectionIndex = state.sections.findIndex(
          (section) => section.id === sectionID
        );
        if (newStateSectionIndex >= 0) {
          const newSurveySections = state.sections.map((section, i) => {
            if (i === newStateSectionIndex) {
              return {
                ...section,
                form: {
                  ...form,
                },
              };
            }
            return section;
          });
          state.sections = newSurveySections;
        }
      }
    },
    setSurveyQuestion: (
      state,
      action: PayloadAction<{ question: SurveyQuestionI; sectionID: string }>
    ) => {
      if (action.payload.question) {
        const newStateSections = state.sections;
        const sectionIndex = state.sections.findIndex(
          (section) => section.id === action.payload.sectionID
        );
        newStateSections[sectionIndex].questions?.push(action.payload.question);
        state.sections = newStateSections;
      } else {
        state.sections = initialState.sections;
      }
    },
    removeSurveyQuestion: (
      state,
      action: PayloadAction<{ sectionID: string; questionID: string }>
    ) => {
      if (action.payload.sectionID && action.payload.questionID) {
        const newStateSections = state.sections;
        const sectionIndex = state.sections.findIndex(
          (section) => section.id === action.payload.sectionID
        );
        if (
          sectionIndex >= 0 &&
          (state.sections[sectionIndex].questions?.length || 1) > 1
        ) {
          const questionToRemove = state.sections[sectionIndex].questions?.find(
            (question) => question.id === action.payload.questionID
          );
          if (questionToRemove?.id) {
            newStateSections[sectionIndex] = {
              ...newStateSections[sectionIndex],
              questions:
                newStateSections[sectionIndex].questions?.filter(
                  (question) => question.id !== questionToRemove.id
                ) || [],
            };
            state.sections = newStateSections;
          }
        }
      }
    },
    cloneSurveyQuestion: (
      state,
      action: PayloadAction<{ sectionID: string; questionID: string }>
    ) => {
      if (action.payload.sectionID && action.payload.sectionID) {
        const newStateSections = state.sections;
        const sectionIndex = state.sections.findIndex(
          (section) => section.id === action.payload.sectionID
        );
        if (
          sectionIndex >= 0 &&
          newStateSections[sectionIndex]?.questions?.length
        ) {
          const sectionQuestion = (
            state.sections[sectionIndex].questions || []
          ).filter((question) => question.id === action.payload.questionID);
          if (sectionQuestion?.length) {
            newStateSections[sectionIndex].questions?.push(
              newQuestion({ form: sectionQuestion[0].form })
            );
          }
        }
      }
    },
    setSurveyQuestionFieldValue: (state, action: PayloadAction<any>) => {
      const { sectionID, questionID, form } = action.payload;
      if (sectionID && questionID && form) {
        const newStateSectionIndex = state.sections.findIndex(
          (section) => section.id === sectionID
        );
        if (newStateSectionIndex >= 0) {
          const newStateQuestionIndex = (
            state.sections[newStateSectionIndex].questions || []
          ).findIndex((question) => question.id === questionID);
          if (newStateQuestionIndex >= 0) {
            const newSurveySections = state.sections.map((section, i) => {
              if (i === newStateSectionIndex) {
                const newSectionQuestions = section.questions?.map(
                  (question, j) => {
                    if (j === newStateQuestionIndex) {
                      return {
                        ...question,
                        form: {
                          ...form,
                        },
                      };
                    }
                    return question;
                  }
                );
                return {
                  ...section,
                  questions:
                    newSectionQuestions ||
                    initialState.sections[1].questions ||
                    [],
                };
              }
              return section;
            });
            state.sections = newSurveySections;
          }
        }
      }
    },
    setSurveyEditForm: (state) => {//(state, action: PayloadAction<any>) => { // TODO: integrare con chiamata dettaglio!
      const formToEdit = transformJsonToForm();
      if (formToEdit) {
        state.form = formToEdit.form;
        state.sections = formToEdit.sections;
      }
    },
  },
});

export const {
  setSurveyFormFieldValue,
  setSurveySection,
  removeSurveySection,
  setSurveySectionFieldValue,
  setSurveyQuestion,
  removeSurveyQuestion,
  cloneSurveyQuestion,
  setSurveyQuestionFieldValue,
  setSurveyEditForm,
} = questionarioSlice.actions;

export const selectSurveyForm = (state: RootState) => state.questionario.form;

export const selectSurveySections = (state: RootState) =>
  state.questionario.sections;

export const selectSurveyQuestion = (
  state: RootState,
  sectionID: string,
  questionID: number
) => {
  const idSection = state.questionario.sections.findIndex(
    (section: SurveySectionI) => section.id === sectionID
  );
  return state.questionario.sections[idSection].questions?.[questionID];
};

export default questionarioSlice.reducer;
