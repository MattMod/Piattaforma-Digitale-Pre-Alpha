import React, { useEffect, useState } from 'react';
import {
  formFieldI,
  newForm,
  newFormField,
} from '../../../../../../utils/formHelper';
import withFormHandler, {
  withFormHandlerProps,
} from '../../../../../../hoc/withFormHandler';
import { Form, Input } from '../../../../../../components';
import { Button } from 'design-react-kit';

interface ProgramInformationFormI {
  showButtons: boolean;
  showGoBack: boolean;
  onDelete: () => void;
  onEdit: () => void;
  title: string;
  formData: { [key: string]: formFieldI['value'] };
}

interface ProgramInformationFullInterface
  extends withFormHandlerProps,
    ProgramInformationFormI {}

const labels: { [key: string]: string } = {
  enteName: 'Nome ente',
  type: 'Tipologia',
  profile: 'Profilo',
  fiscalCode: 'Codice fiscale',
  address: 'Sede legale',
};

let form = newForm([]);

const ProgramInformationForm: React.FC<ProgramInformationFullInterface> = (
  props
) => {
  const {
    //clearForm = () => ({}),
    //getFormValues = () => ({}),
    setFormValues = () => ({}),
    onInputChange = () => ({}),
    showButtons,
    showGoBack,
    title,
    formData,
  } = props;
  const [dynamicForm, setDynamicForm] = useState<
    { field: string; value: string; required?: boolean }[]
  >([]);

  useEffect(() => {
    if (formData) {
      setFormValues(formData);
      let tmp: any = [];
      for (const [key, value] of Object.entries(formData)) {
        console.log(key, value);
        console.log(dynamicForm);
        tmp = [...tmp, { field: key, value, required: false }];
      }
      setDynamicForm([...tmp]);
      let arr: any = [];
      for (const [key, value] of Object.entries(formData) as any) {
        const obj = newFormField({
          field: key,
          value,
          required: false,
        });
        arr = [...arr, obj];
      }
      form = newForm([...arr]);
      console.log(dynamicForm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <div className='container d-flex flex-column'>
      {showGoBack && <p>go back</p>}
      {title && <h4 className='text-primary mb-5'>{title}</h4>}
      <Form className='col-6'>
        {dynamicForm?.map?.((formItem: formFieldI, index: number) => (
          <Form.Row key={index}>
            <Input
              {...formItem}
              col='col-12'
              label={labels[formItem.field]}
              onInputChange={onInputChange}
            />
          </Form.Row>
        ))}
      </Form>
      {showButtons && (
        <div className='d-flex justify-content-end'>
          <Button color='primary' className='mr-4' size='lg'>
            Elimina
          </Button>
          <Button color='primary' outline size='lg'>
            Modifica
          </Button>
        </div>
      )}
    </div>
  );
};

export default withFormHandler({ form: form }, ProgramInformationForm);
