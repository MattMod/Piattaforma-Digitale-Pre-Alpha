import React, { useEffect } from 'react';
import {
  formFieldI,
  newForm,
  newFormField,
} from '../../../../../../utils/formHelper';
import withFormHandler, {
  withFormHandlerProps,
} from '../../../../../../hoc/withFormHandler';
import { Form, Input, Select } from '../../../../../../components';
import { RegexpType } from '../../../../../../utils/validator';
import { useAppSelector } from '../../../../../../redux/hooks';
import {
  emptyDetail,
  selectDetailDataInfo,
} from '../../../../../../redux/features/areaAmministrativa/detail/detailSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProgrammaDetail } from '../../../../../../redux/features/areaAmministrativa/detail/detailThunk';

interface ProgramInformationI {
  /* formData?:
    | {
        programName?: string;
        policy?: string;
        startDate?: string;
        endDate?: string;
      }
    | undefined
    | { [key: string]: string };*/
  formDisabled?: boolean;
  withTwoColumns?: boolean;
  sendNewValues?: (param?: { [key: string]: formFieldI['value'] }) => void;
  setIsFormValid?: (param: boolean | undefined) => void;
  creation?: boolean;
}

interface FormEnteGestoreProgettoFullInterface
  extends withFormHandlerProps,
    ProgramInformationI {}
const FormProgram: React.FC<FormEnteGestoreProgettoFullInterface> = (props) => {
  const {
    setFormValues = () => ({}),
    form,
    // formData,
    onInputChange,
    sendNewValues,
    isValidForm,
    setIsFormValid,
    getFormValues,
    creation = false,
  } = props;
  const { firstParam } = useParams();

  const formDisabled = !!props.formDisabled;
  const withTwoColumns = !!props.withTwoColumns;

  const formData: { [key: string]: string } | undefined =
    useAppSelector(selectDetailDataInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!creation) {
      dispatch(GetProgrammaDetail(firstParam || ''));
    }
  }, [creation]);

  useEffect(() => {
    () => {
      dispatch(emptyDetail());
    };
  }, []);

  useEffect(() => {
    if (formData) {
      setFormValues(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const onInputDataChange = (
    value: formFieldI['value'],
    field?: formFieldI['field']
  ) => {
    onInputChange?.(value, field);
    sendNewValues?.(getFormValues?.());
    setIsFormValid?.(isValidForm);
  };

  return (
    <Form className='mt-5 mb-5' formDisabled={formDisabled}>
      {withTwoColumns ? (
        <>
          <Form.Row>
            <Input
              {...form?.programName}
              col='col-6'
              label='Nome programma'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
            {formDisabled ? (
              <Input
                {...form?.policy}
                col='col-6'
                label='Policy'
                onInputChange={(value, field) => {
                  onInputDataChange(value, field);
                }}
              />
            ) : (
              <Select
                {...form?.policy}
                value={form?.policy.value as string}
                col='col-6'
                label='Policy *'
                placeholder='Inserisci policy'
                options={[
                  { label: 'RFD', value: 'rfd' },
                  { label: 'SMC', value: 'smc' },
                ]}
                onInputChange={(value, field) => {
                  onInputDataChange(value, field);
                }}
                wrapperClassName='mb-5'
              />
            )}
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.startDate}
              col='col-6'
              label='Data inizio *'
              placeholder='Inserisci data inizio'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />

            <Input
              {...form?.endDate}
              col='col-6'
              label='Data fine *'
              placeholder='Inserisci data fine'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>{' '}
        </>
      ) : (
        <>
          <Form.Row>
            <Input
              {...form?.programName}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome programma'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            {formDisabled ? (
              <Input
                {...form?.policy}
                col={formDisabled ? 'col-6' : 'col-12'}
                label='Policy'
                onInputChange={(value, field) => {
                  onInputDataChange(value, field);
                }}
              />
            ) : (
              <Select
                {...form?.policy}
                value={form?.policy.value as string}
                col={formDisabled ? 'col-6' : 'col-12'}
                label='Policy *'
                placeholder='Inserisci policy'
                options={[
                  { label: 'RFD', value: 'rfd' },
                  { label: 'SMC', value: 'smc' },
                ]}
                onInputChange={(value, field) => {
                  onInputDataChange(value, field);
                }}
                wrapperClassName='mb-5'
              />
            )}
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.startDate}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Data inizio *'
              placeholder='Inserisci data inizio'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.endDate}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Data fine *'
              placeholder='Inserisci data fine'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
        </>
      )}
    </Form>
  );
};

const form = newForm([
  newFormField({
    field: 'programName',
  }),
  newFormField({
    field: 'policy',
    type: 'text',
  }),
  newFormField({
    field: 'startDate',
    regex: RegexpType.DATE,
    required: true,
    type: 'date',
  }),
  newFormField({
    field: 'endDate',
    regex: RegexpType.DATE,
    required: true,
    type: 'date',
  }),
]);

export default withFormHandler({ form }, FormProgram);
