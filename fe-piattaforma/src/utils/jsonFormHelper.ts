/* JSON FORM DOCS
  https://jsonforms.io/examples/basic
  https://rjsf-team.github.io/react-jsonschema-form/
*/
import { InputType } from 'design-react-kit/node_modules/reactstrap/es/Input';
import { AnagraficaListMock } from '../pages/administrator/AreaAmministrativa/Entities/Questionari/questionariConstants';
import {
  QuestionarioStateI,
  SurveyQuestionI,
} from '../redux/features/areaAmministrativa/questionario/questionarioSlice';
import {
  newQuestion,
  newSection,
  SurveyCreationBodyI,
} from '../redux/features/areaAmministrativa/questionario/questionarioThunk';
import { formFieldI, FormI, newForm, newFormField } from './formHelper';
import { RegexpType } from './validator';

interface schemaFieldPropertiesI {
  [key: string]: schemaFieldI;
}
interface schemaFieldI {
  type?: string;
  format?: string;
  enum?: string[];
  minimum?: string | number;
  maximum?: string | number;
  properties?: schemaFieldPropertiesI;
}
export interface SchemaI {
  type?: schemaFieldI['type'];
  properties: schemaFieldPropertiesI;
  required: string[];
}

interface SchemaUiColI {
  type: 'Control';
  label: string;
  scope: string;
}
interface SchemaUiRowI {
  type: 'HorizontalLayout';
  elements: SchemaUiColI[];
}
export interface SchemaUiI {
  type: string;
  label: string;
  elements: SchemaUiRowI[];
}

const getType = ({ type = 'text', options }: formFieldI) => {
  const baseTypeObject = {
    type: 'string',
  };
  switch (type) {
    case 'text':
    default:
      return baseTypeObject;
    case 'date':
      return {
        ...baseTypeObject,
        type: 'string',
        format: 'date',
      };
    case 'range':
      return {
        ...baseTypeObject,
        type: 'integer',
        minimum: 1,
        maximum: 5,
      };
    case 'number':
      return {
        ...baseTypeObject,
        type: 'integer',
      };
    case 'select':
      return {
        ...baseTypeObject,
        type: 'string',
        enum: (options || []).map((opt: { label: string }) => opt.label),
      };
    case 'checkbox': {
      const properties: { [key: string]: { type: string } } = {};
      (options || []).forEach(({ label }) => {
        properties[label] = { type: 'boolean' };
      });
      return {
        ...baseTypeObject,
        type: 'object',
        properties,
      };
    }
  }
};

const newSchemaUiRow: () => SchemaUiRowI = () => ({
  type: 'HorizontalLayout',
  elements: [],
});

const newSchemaUiCol: (formField: formFieldI) => SchemaUiColI = (
  formField
) => ({
  type: 'Control',
  scope: `#/properties/${formField.field}`,
  label: formField.field,
});

export const generateJsonFormSchema: (
  form: FormI,
  stringify: boolean
) => {
  schema: string;
  schemaUI: string;
} = (form) => {
  const schema: SchemaI = {
    type: 'object',
    properties: {},
    required: [],
  };
  const schemaUI: SchemaUiI = {
    type: 'Group',
    label: 'Sezione',
    elements: [],
  };
  Object.keys(form).forEach((formField, index) => {
    schema.properties[form[formField].field] = {
      ...getType(form[formField]),
    };

    if (form[formField].required) {
      schema.required.push(form[formField].field);
    }

    if (index % 2 === 0) {
      schemaUI.elements.push(newSchemaUiRow());
    }
    schemaUI.elements[schemaUI.elements.length - 1].elements.push(
      newSchemaUiCol(form[formField])
    );
  });
  return {
    schema: JSON.stringify(schema),
    schemaUI: JSON.stringify(schemaUI),
  };
  //return { schema, schemaUI };
};

type baseTypeObjectI = {
  regex: string;
  type: InputType;
};
const getTypeReverse: (formField: schemaFieldI) => baseTypeObjectI = (
  formField: schemaFieldI
) => {
  const baseTypeObject: baseTypeObjectI = {
    regex: RegexpType.ALPHA_NUMERIC_INPUT,
    type: 'text',
  };
  switch (formField.type) {
    case 'string':
    default: {
      if (formField.format === 'date') {
        return {
          ...baseTypeObject,
          type: 'date',
          regex: RegexpType.DATE,
        };
      } else if (formField.enum?.length) {
        return {
          ...baseTypeObject,
          type: 'select',
          options: formField.enum.map((option) => ({
            label: option,
            value: option,
          })),
        };
      }
      return baseTypeObject;
    }
    case 'number':
    case 'integer': {
      if (formField.minimum && formField.maximum) {
        return {
          ...baseTypeObject,
          type: 'range',
          regex: RegexpType.NUMBER,
        };
      }
      return {
        ...baseTypeObject,
        type: 'number',
        regex: RegexpType.NUMBER,
      };
    }
    case 'object': {
      if (formField.properties) {
        return {
          ...baseTypeObject,
          type: 'checkbox',
          options: Object.keys(formField.properties).map((option) => ({
            label: option,
            value: option,
          })),
        };
      }
      return baseTypeObject;
    }
  }
};

export const generateForm: (schema: SchemaI) => FormI = (schema) =>
  newForm(
    Object.keys(schema.properties).map((field) =>
      newFormField({
        ...getTypeReverse(schema.properties[field]),
        field,
        required: schema.required.includes(field),
      })
    )
  );

export const questionarioJsonMock: SurveyCreationBodyI = {
  'survey-type': 'Primo accesso',
  'survey-name': 'Questionario prova',
  sections: [
    {
      schema: '{"type":"object","properties":{},"required":[]}',
    },
    {
      'section-title': 'Sezione 2',
      'section-visibility': 'Solo facilitazione',
      schema:
        '{"type":"object","properties":{"Domanda 1":{"type":"string"},"Domanda 2":{"type":"integer"},"Domanda 3":{"type":"string","enum":["valore 1","valore 2"]}},"required":["Domanda 3"]}',
    },
  ],
};

const transformJsonQuestionToForm = (schema: SchemaI) => {
  const questionsFields = generateForm(schema);
  const questions: SurveyQuestionI[] = [];
  Object.keys(questionsFields).map((field) => {
    questions.push({
      id: `${field}-${new Date().getTime().toString()}`,
      form: newForm([
        newFormField({
          field: 'question-description',
          required: true,
          value: questionsFields[field]?.field,
        }),
        newFormField({
          field: 'question-type',
          required: true,
          value: questionsFields[field]?.type?.toString() || 'text',
        }),
        newFormField({
          field: 'question-values',
          value: JSON.stringify(questionsFields[field]?.options),
        }),
        newFormField({
          field: 'question-required',
          value: `${questionsFields[field]?.required}`,
        }),
      ]),
    });
  });
  return questions;
};

export const transformJsonToForm = (
  questionarioJson: SurveyCreationBodyI = questionarioJsonMock
) => {
  const modelSurvey: QuestionarioStateI = {
    form: {},
    sections: [],
  };
  modelSurvey.form = newForm([
    newFormField({
      field: 'survey-type',
      required: true,
      value: questionarioJson['survey-type']?.toString() || '',
    }),
    newFormField({
      field: 'survey-name',
      required: true,
      value: questionarioJson['survey-name']?.toString() || '',
    }),
  ]);
  (questionarioJson.sections || []).map((section, index) => {
    //typeof questionarioJson[key] === 'object' && typeof questionarioJson[key] !== 'string' ? questionarioJson[key] || {} : {};
    modelSurvey.sections.push(
      newSection({
        sectionTitle: 'Sezione',
        id: index === 0 ? 'anagraphic-section':`${section['section-title']}`,
        questions: index === 0 ? AnagraficaListMock.map(elem => newQuestion({ id: elem, sectionId: 'anagraphic-section' })): transformJsonQuestionToForm(JSON.parse(section.schema)),
        form: newForm([
          newFormField({
            field: 'section-title',
            required: true,
            value: section['section-title']
              ? section['section-title'].toString()
              : '',
          }),
          newFormField({
            field: 'section-visibility',
            required: true,
            value: section['section-visibility']
              ? section['section-visibility'].toString()
              : '',
          }),
        ]),
        type: index === 0 ? 'first':'standard',
      })
    );
  });
  return modelSurvey;
};
