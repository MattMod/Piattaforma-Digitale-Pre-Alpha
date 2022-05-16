import React, { useEffect } from 'react';
import {
  formFieldI,
  newForm,
  newFormField,
} from '../../../../../../utils/formHelper';
import withFormHandler, {
  withFormHandlerProps,
} from '../../../../../../hoc/withFormHandler';
import { Form, Input } from '../../../../../../components';
import { useAppSelector } from '../../../../../../redux/hooks';
import {
  emptyDetail,
  selectDetailDataInfo,
} from '../../../../../../redux/features/areaAmministrativa/detail/detailSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProgettoDetail } from '../../../../../../redux/features/areaAmministrativa/detail/detailThunk';

interface ProgramInformationI {
  formDisabled?: boolean;
  withTwoColumns?: boolean;
  sendNewValues?: (param?: { [key: string]: formFieldI['value'] }) => void;
  setIsFormValid?: (param: boolean | undefined) => void;
  creation?: boolean;
}

interface FormEnteGestoreProgettoFullInterface
  extends withFormHandlerProps,
    ProgramInformationI {}
const FormProject: React.FC<FormEnteGestoreProgettoFullInterface> = (props) => {
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
  const { secondParam } = useParams();

  const formDisabled = !!props.formDisabled;
  const withTwoColumns = !!props.withTwoColumns;

  const formData: { [key: string]: string } | undefined =
    useAppSelector(selectDetailDataInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!creation) {
      dispatch(GetProgettoDetail(secondParam || 'project1'));
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
              {...form?.projectId}
              col='col-6'
              label='ID Progetto'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
              }}
            />
            <Input
              {...form?.projectName}
              col='col-6'
              label='Nome progetto'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.shortName}
              col='col-6'
              label='Nome breve'
              placeholder='Nome breve'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
              }}
            />
            <Input
              {...form?.description}
              col='col-6'
              label='Descrizione'
              placeholder='Descrizione'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
              }}
            />
          </Form.Row>{' '}
        </>
      ) : (
        <>
          <Form.Row>
            <Input
              {...form?.projectId}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='ID Progetto'
              placeholder='ID Progetto'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.projectName}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome progetto'
              placeholder='Nome progetto'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.shortName}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome breve'
              placeholder='Nome breve'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.description}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Descrizione'
              placeholder='Descrizione'
              onInputChange={(value, field) => {
                onInputDataChange(value, field || '');
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
    field: 'projectId',
  }),
  newFormField({
    field: 'projectName',
  }),
  newFormField({
    field: 'shortName',
  }),
  newFormField({
    field: 'description',
  }),
]);

export default withFormHandler({ form }, FormProject);
