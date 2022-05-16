import React, { useEffect } from 'react';
import {
  formFieldI,
  newForm,
  newFormField,
} from '../../../../../../utils/formHelper';
import withFormHandler, {
  withFormHandlerProps,
} from '../../../../../../hoc/withFormHandler';

import { RegexpType } from '../../../../../../utils/validator';
import { Form, Input } from '../../../../../../components';
import { useAppSelector } from '../../../../../../redux/hooks';
import { selectDetailDataInfo } from '../../../../../../redux/features/areaAmministrativa/detail/detailSlice';
import { useDispatch } from 'react-redux';
import { GetUserInfo } from '../../../../../../redux/features/areaAmministrativa/detail/detailThunk';
import { useParams } from 'react-router-dom';

interface ProgramInformationI {
  /*formData:
    | {
        name?: string;
        lastName?: string;
        role?: string;
        userId?: string;
        fiscalCode?: string;
        email?: string;
        phone?: string;
      }
    | undefined;*/
  formDisabled?: boolean;
  sendNewValues?: (param?: { [key: string]: formFieldI['value'] }) => void;
  setIsFormValid?: (param: boolean | undefined) => void;
  withTwoColumns?: boolean;
  creation?: boolean;
}

interface FormEnteGestoreProgettoFullInterface
  extends withFormHandlerProps,
    ProgramInformationI {}
const FormUser: React.FC<FormEnteGestoreProgettoFullInterface> = (props) => {
  const {
    //    getFormValues = () => ({}),
    setFormValues = () => ({}),
    form,
    onInputChange,
    sendNewValues,
    isValidForm,
    setIsFormValid,
    getFormValues,
    withTwoColumns = false,
    creation = false,
  } = props;

  const formDisabled = !!props.formDisabled;
  const { userId } = useParams();
  const formData: { [key: string]: string } | undefined =
    useAppSelector(selectDetailDataInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!creation) {
      dispatch(GetUserInfo(userId || ''));
    }
  }, [creation]);

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
          {' '}
          <Form.Row>
            <Input
              {...form?.name}
              col='col-6'
              label='Nome'
              placeholder='Inserisci nome programma'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />

            <Input
              {...form?.lastName}
              col='col-6'
              label='Cognome'
              placeholder='Inserisci cognome'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.userId}
              col='col-6'
              label='User id'
              placeholder='Inserisci user id'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
            <Input
              {...form?.fiscalCode}
              col='col-6'
              label='Codice fiscale'
              placeholder='Inserisci codice fiscale'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.email}
              col='col-6'
              label='Email'
              placeholder='Inserisci email'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />

            <Input
              {...form?.phone}
              col='col-6'
              label='Telefono'
              placeholder='Inserisci telefono'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
        </>
      ) : (
        <>
          <Form.Row>
            <Input
              {...form?.name}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome'
              placeholder='Inserisci nome programma'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.lastName}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Cognome'
              placeholder='Inserisci cognome'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.userId}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='User id'
              placeholder='Inserisci user id'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.fiscalCode}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Codice fiscale'
              placeholder='Inserisci codice fiscale'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.email}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Email'
              placeholder='Inserisci email'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.phone}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Telefono'
              placeholder='Inserisci telefono'
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
    field: 'name',
  }),
  newFormField({
    field: 'lastName',
  }),
  /*newFormField({
    field: 'role',
  }),*/
  newFormField({
    field: 'userId',
  }),
  newFormField({
    field: 'fiscalCode',
  }),
  newFormField({
    field: 'email',
    regex: RegexpType.EMAIL,
  }),
  newFormField({
    field: 'phone',
  }),
]);
export default withFormHandler({ form }, FormUser);
