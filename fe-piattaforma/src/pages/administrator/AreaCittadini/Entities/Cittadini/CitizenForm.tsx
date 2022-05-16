import React, { useEffect } from 'react';
import withFormHandler, {
  withFormHandlerProps,
} from '../../../../../hoc/withFormHandler';
import { newForm, newFormField } from '../../../../../utils/formHelper';
import { RegexpType } from '../../../../../utils/validator';
import { Form, Input } from '../../../../../components';
import { CittadinoInfoI } from '../../../../../redux/features/areaCittadini/areaCittadiniSlice';
import { FormGroup, Label } from 'design-react-kit';
import { Input as InputKit } from 'design-react-kit';

interface CitizenFormI {
  info: CittadinoInfoI;
}

interface CitizenFormFullI extends CitizenFormI, withFormHandlerProps {}

const form = newForm([
  newFormField({
    field: 'name',
  }),
  newFormField({
    field: 'lastName',
  }),
  newFormField({
    field: 'fiscalCode',
  }),
  newFormField({
    field: 'nDoc',
  }),
  newFormField({
    field: 'nationality',
  }),
  newFormField({
    field: 'age',
  }),
  newFormField({
    field: 'degree',
  }),
  newFormField({
    field: 'occupation',
  }),
  newFormField({
    field: 'phone',
  }),
  newFormField({
    field: 'consensoOTP',
    type: 'checkbox',
  }),
  newFormField({
    field: 'confModulo',
    type: 'checkbox',
  }),
  newFormField({
    field: 'email',
    regex: RegexpType.EMAIL,
  }),
  newFormField({
    field: 'dataConf',
    regex: RegexpType.DATE,
    required: true,
    type: 'date',
  }),
]);

const CitizenForm: React.FC<CitizenFormFullI> = (props) => {
  const { setFormValues, form = {}, info } = props;

  useEffect(() => {
    setFormValues?.(info as { [key: string]: string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  return (
    <Form formDisabled className='my-5'>
      <Form.Row>
        <Input {...form.name} col='col-6' label='Nome' />
        <Input {...form.lastName} col='col-6' label='Cognome' />
      </Form.Row>
      <Form.Row>
        <Input {...form.fiscalCode} col='col-6' label='Codice fiscale' />
        <Input {...form.nDoc} col='col-6' label='Numero documento' />
      </Form.Row>
      <Form.Row>
        <Input {...form.nationality} col='col-6' label='Nazionalità' />
        <Input {...form.age} col='col-6' label='Età' />
      </Form.Row>
      <Form.Row>
        <Input {...form.degree} col='col-6' label='Titolo di studio' />
        <Input {...form.occupation} col='col-6' label='Occupazione' />
      </Form.Row>
      <Form.Row>
        <Input {...form.email} col='col-6' label='Indirizzo email' />
        <Input {...form.phone} col='col-6' label='Telefono' />
      </Form.Row>
      <Form.Row>
        <div className='col-6 d-flex flex-column'>
          <Label check>Consenso al trattamento dei dati</Label>
          <FormGroup check inline>
            <InputKit
              id='checkbox-otp'
              type='checkbox'
              checked={
                form.consensoOTP?.value === 'true' || !!form.consensoOTP?.value
              }
              readOnly={true}
            />
            <Label for='checkbox-otp' check>
              OTP
            </Label>
            <InputKit
              id='checkbox-modulo'
              type='checkbox'
              checked={
                form.confModulo?.value === 'true' || !!form.confModulo?.value
              }
              readOnly={true}
            />
            <Label for='checkbox-modulo' check>
              Modulo cartaceo
            </Label>
          </FormGroup>
        </div>
        <Input
          {...form.dataConf}
          col='col-6'
          label='Data di conferimento consenso'
        />
      </Form.Row>
    </Form>
  );
};

export default withFormHandler({ form }, CitizenForm);
