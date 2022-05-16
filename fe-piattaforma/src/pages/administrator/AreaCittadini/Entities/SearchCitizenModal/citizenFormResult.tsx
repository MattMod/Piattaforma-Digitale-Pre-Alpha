import React, { useEffect } from 'react';
import withFormHandler, {
  withFormHandlerProps,
} from '../../../../../hoc/withFormHandler';
import { newForm, newFormField } from '../../../../../utils/formHelper';
import { RegexpType } from '../../../../../utils/validator';
import { Form, Input } from '../../../../../components';
import { CittadinoInfoI } from '../../../../../redux/features/areaCittadini/areaCittadiniSlice';

interface CitizenFormDataI {
  data: CittadinoInfoI;
}

interface CitizenFormResultI extends CitizenFormDataI, withFormHandlerProps {}

const form = newForm([
  newFormField({
    field: 'name',
  }),
  newFormField({
    field: 'lastName',
  }),
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

const CitizenFormResult: React.FC<CitizenFormResultI> = (props) => {
  const { setFormValues = () => ({}), form = {}, data } = props;

  useEffect(() => {
    console.log(data);
    setFormValues(data as { [key: string]: string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Form formDisabled>
      <Form.Row>
        <Input {...form.name} col='col-6' label='Nome' />
        <Input {...form.lastName} col='col-6' label='Cognome' />
      </Form.Row>
      <Form.Row>
        <Input {...form.userId} col='col-6' label='Nome' />
        <Input {...form.fiscalCode} col='col-6' label='Cognome' />
      </Form.Row>
      <Form.Row>
        <Input {...form.email} col='col-6' label='Nome' />
        <Input {...form.phone} col='col-6' label='Cognome' />
      </Form.Row>
    </Form>
  );
};

export default withFormHandler({ form }, CitizenFormResult);
