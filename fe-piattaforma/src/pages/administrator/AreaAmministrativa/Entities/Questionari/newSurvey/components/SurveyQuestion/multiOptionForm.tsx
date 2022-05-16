import { Button, Col, Icon } from 'design-react-kit';
import React, { useEffect } from 'react';
import { Form, Input } from '../../../../../../../../components';
import { OptionType } from '../../../../../../../../components/Form/select';
import withFormHandler, {
  withFormHandlerProps,
} from '../../../../../../../../hoc/withFormHandler';
import {
  formFieldI,
  newForm,
  newFormField,
} from '../../../../../../../../utils/formHelper';

interface MultiOptionFormI extends withFormHandlerProps {
  onFormChange?: (values: OptionType[]) => void;
  editValues?: boolean;
  values?: string;
}

const MultiOptionForm: React.FC<MultiOptionFormI> = (props) => {
  const {
    form,
    //isValidForm,
    getFormValues = () => ({}),
    onInputChange,
    onFormChange = () => ({}),
    updateFormField = () => ({}),
    updateForm = () => ({}),
    editValues,
    values,
  } = props;

  useEffect(() => {
    if (editValues) {
      if (values) {
        const listValues = JSON.parse(values) || [];
        // TODO check for improvements
        form &&
          Object.keys(form).forEach((f, index) => {
            form[f].value = listValues[index]?.value;
          });

        const tmpForm: formFieldI[] = [];

        listValues.map(
          (val: { label: string; value: string }, index: number) => {
            if (form && index > Object.keys(form).length - 1) {
              const newField = newFormField({
                field: `multi-option-${new Date()
                  .getTime()
                  .toString()}-${index}`,
                required: true,
                value: val.value,
              });
              tmpForm.push(newField);
            }
            updateForm(newForm(tmpForm));
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const transformFormToOptions = Object.values(getFormValues()).map(
      (option = '') => ({ label: option.toString(), value: option.toString() })
    );
    onFormChange(transformFormToOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const addOption = () => {
    updateFormField(
      newFormField({
        field: `multi-option-${new Date().getTime().toString()}`,
        required: true,
      })
    );
  };

  const removeOption = (option: string) => {
    updateFormField(option, 'remove');
  };

  if (!form) return null;

  return (
    <Form.Row>
      <Col md={6}>
        <p>Lista valori</p>
        <ul
          aria-label='Lista valori'
          className='survey-question-container__list'
        >
          {Object.keys(form).map((option) => (
            <React.Fragment key={option}>
              {form[option] ? (
                <li className='d-flex flex-row'>
                  <Input
                    {...form[option]}
                    id={option}
                    onInputChange={onInputChange}
                    withLabel={false}
                  />
                  {form[option].value &&
                  form[option].valid &&
                  Object.keys(form).length > 1 ? (
                    <Button
                      onClick={() => removeOption(option)}
                      className='survey-question-container__buttons'
                    >
                      <Icon
                        className='minus'
                        color='primary'
                        icon='it-minus-circle'
                        size='sm'
                      />
                    </Button>
                  ) : null}
                </li>
              ) : null}
            </React.Fragment>
          ))}
        </ul>
        <Button
          onClick={() => addOption()}
          className='survey-question-container__buttons'
        >
          <Icon
            className='plus'
            color='primary'
            icon='it-plus-circle'
            size='sm'
          />
        </Button>
      </Col>
    </Form.Row>
  );
};

const form = newForm([
  newFormField({
    field: `multi-option-${new Date().getTime().toString()}`,
    required: true,
  }),
]);
export default withFormHandler({ form }, MultiOptionForm);
