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
import { GetSedeDetail } from '../../../../../../redux/features/areaAmministrativa/detail/detailThunk';
import { useParams } from 'react-router-dom';

interface ProgramInformationI {
  formDisabled?: boolean;
  sendNewValues?: (param?: { [key: string]: formFieldI['value'] }) => void;
  setIsFormValid?: (param: boolean | undefined) => void;
  withTwoColumns?: boolean;
}

interface FormEnteGestoreProgettoFullInterface
  extends withFormHandlerProps,
    ProgramInformationI {}

const form = newForm([
  newFormField({
    field: 'idSede',
  }),

  newFormField({
    field: 'name',
  }),
  newFormField({
    field: 'services',
  }),
  newFormField({
    field: 'address',
  }),
  newFormField({
    field: 'ente',
  }),
]);

const Sedi: React.FC<FormEnteGestoreProgettoFullInterface> = (props) => {
  const {
    setFormValues = () => ({}),
    form,
    onInputChange,
    sendNewValues,
    isValidForm,
    setIsFormValid,
    getFormValues,
    withTwoColumns = false,
  } = props;

  const formDisabled = !!props.formDisabled;
  const formData: { [key: string]: string } | undefined =
    useAppSelector(selectDetailDataInfo);
  const dispatch = useDispatch();

  const { secondParam } = useParams();

  useEffect(() => {
    dispatch(GetSedeDetail(secondParam || 'project1', 'prova', 'prova'));
  }, []);

  useEffect(() => {
    if (formData) {
      setFormValues(formData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  useEffect(() => {
    () => {
      dispatch(emptyDetail());
    };
  }, []);

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
              {...form?.idSede}
              col='col-6'
              label='ID Sede'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
              placeholder='Inserisci nome programma'
            />

            <Input
              {...form?.name}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
              placeholder='Inserisci nome programma'
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.services}
              col='col-6'
              label='Servizi erogati'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
            <Input
              {...form?.address}
              col='col-6'
              label='Indirizzo'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.ente}
              col='col-6'
              label='Ente di riferimento'
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
              {...form?.idSede}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='ID Sede'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
              placeholder='Inserisci nome programma'
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.name}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
              placeholder='Inserisci nome programma'
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.services}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Servizi erogati'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.address}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Indirizzo'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.ente}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Ente di riferimento'
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

export default withFormHandler({ form }, Sedi);
