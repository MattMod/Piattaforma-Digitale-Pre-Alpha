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
  selectDataToShow,
  selectDetailDataInfo,
} from '../../../../../../redux/features/areaAmministrativa/detail/detailSlice';
import { useDispatch } from 'react-redux';
import {
  GetEnteGestoreProgettoDetail,
  GetEnteGestoreProgrammaDetail,
  GetEntePartnerDetail,
} from '../../../../../../redux/features/areaAmministrativa/detail/detailThunk';
import { useParams } from 'react-router-dom';
import { formTypes } from '../../utils';

interface ProgramInformationI {
  formDisabled?: boolean;
  sendNewValues?: (param?: { [key: string]: formFieldI['value'] }) => void;
  setIsFormValid?: (param: boolean | undefined) => void;
  withTwoColumns?: boolean;
  creation?: boolean;
}

interface FormEnteGestoreProgettoFullInterface
  extends withFormHandlerProps,
    ProgramInformationI {}

const FormEnte: React.FC<FormEnteGestoreProgettoFullInterface> = (props) => {
  const { firstParam, secondParam } = useParams();
  const {
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

  const formData: { [key: string]: formFieldI['value'] } | undefined =
    useAppSelector(selectDetailDataInfo);
  const dispatch = useDispatch();
  const whichEnteToRender = useAppSelector(selectDataToShow);

  useEffect(() => {
    () => {
      dispatch(emptyDetail());
    };
  }, []);

  useEffect(() => {
    if (!creation) {
      switch (whichEnteToRender) {
        case formTypes.ENTE_GESTORE_PROGETTO:
        case formTypes.ENTI_GESTORE_PROGETTO:
          dispatch(GetEnteGestoreProgettoDetail(secondParam || '', 'prova'));
          break;
        case formTypes.ENTE_PARTNER:
        case formTypes.ENTI_PARTNER:
          dispatch(GetEntePartnerDetail(secondParam || '', 'prova'));
          break;
        case formTypes.ENTE_GESTORE_PROGRAMMA:
          dispatch(GetEnteGestoreProgrammaDetail(firstParam || '', 'prova'));
          break;
        default:
          return;
      }
    }
  }, [whichEnteToRender, creation]);

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
              {...form?.id}
              col='col-6'
              label='ID ente'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
            <Input
              {...form?.name}
              col='col-6'
              label='Nome ente'
              placeholder='Inserisci nome programma'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.shortName}
              col='col-6'
              label='Nome breve'
              placeholder='Inserisci il nome breve'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />

            <Input
              {...form?.type}
              col='col-6'
              label='Tipologia'
              placeholder='Inserisci la tipologia'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.profile}
              col='col-6'
              label='Profilo'
              placeholder='Inserisci il profilo'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
            <Input
              {...form?.fiscalCode}
              col='col-6'
              label='Codice fiscale'
              placeholder='Inserisci il codice fiscale'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.address}
              col='col-6'
              label='Sede legale'
              placeholder='Inserisci la sede legale'
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
              {...form?.id}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='ID ente'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.name}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome ente'
              placeholder='Inserisci nome programma'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.shortName}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Nome breve'
              placeholder='Inserisci il nome breve'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.type}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Tipologia'
              placeholder='Inserisci la tipologia'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.profile}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Profilo'
              placeholder='Inserisci il profilo'
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
              placeholder='Inserisci il codice fiscale'
              onInputChange={(value, field) => {
                onInputDataChange(value, field);
              }}
            />
          </Form.Row>
          <Form.Row>
            <Input
              {...form?.address}
              col={formDisabled ? 'col-6' : 'col-12'}
              label='Sede legale'
              placeholder='Inserisci la sede legale'
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
    field: 'id',
  }),
  newFormField({
    field: 'name',
  }),
  newFormField({
    field: 'shortName',
  }),
  newFormField({
    field: 'type',
  }),
  newFormField({
    field: 'profile',
  }),
  newFormField({
    field: 'fiscalCode',
  }),
  newFormField({
    field: 'address',
  }),
]);
export default withFormHandler({ form }, FormEnte);
