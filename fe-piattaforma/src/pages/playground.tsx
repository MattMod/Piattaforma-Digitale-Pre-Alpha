import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row } from 'design-react-kit';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../redux/hooks';
import { login, logout } from '../redux/features/user/userSlice';
import { dispatchNotify } from '../utils/notifictionHelper';
import { openModal } from '../redux/features/modal/modalSlice';
import GenericModal from '../components/Modals/GenericModal/genericModal';
import { Form, InfoPanel, Input, Rating, Stepper } from '../components';
import withFormHandler, { withFormHandlerProps } from '../hoc/withFormHandler';
import { formFieldI, newForm, newFormField } from '../utils/formHelper';
import { i18nChangeLanguage } from '../utils/i18nHelper';
import { guard } from '../utils/guardHelper';
import { transformJsonToForm } from '../utils/jsonFormHelper';
import SwitchProfileModal from '../components/Modals/SwitchProfileModal/switchProfileModal';
import SectionTitle from '../components/SectionTitle/sectionTitle';

const Playground: React.FC<withFormHandlerProps> = (props) => {
  const { t } = useTranslation();
  const isLogged = useAppSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();

  const handleUserLogged = () => {
    if (isLogged) {
      dispatch(logout());
    } else {
      dispatch(login());
    }
  };

  console.log(transformJsonToForm());

  const createNotify = () => {
    dispatchNotify({
      closable: false,
      message: `ciao ${new Date().getTime()}`,
    });
  };

  const createModal = () => {
    dispatch(
      openModal({
        id: 'genericModal',
        payload: { title: 'io arrivo dallo store' },
      })
    );
  };

  console.log(
    'Playground props',
    props.form,
    props.isValidForm,
    props.getFormValues && props.getFormValues()
  );

  const handleInputChange = (
    value: formFieldI['value'],
    field?: formFieldI['field']
  ) => {
    let newValue = value;
    switch (field) {
      case 'surname': {
        newValue = newValue?.toString().substring(0, 10);
        break;
      }
      default:
    }
    if (props.onInputChange) props.onInputChange(newValue, field);
  };

  const examplePanel = {
    title: 'esempio infoPanel',
    list: [
      'ciao',
      'non',
      'vorrei',
      'disturbare',
      'volevo',
      'parlarti',
      'e',
      'ho',
      'chiesto',
      'di',
      'te',
      'ma',
      'se',
      'per',
      'caso',
    ],
    rowsNo: 6,
    onlyList: true,
  };

  return (
    <div className='mt-4'>
      <h1>Playground {t('hello')}</h1>
      <Row className='mt-2'>
        <Col sm={6} md={4}>
          <Button color='primary' onClick={() => i18nChangeLanguage('it')}>
            Aggiorna lingua
          </Button>
        </Col>
        <Col sm={6} md={4}>
          <Button color='primary' onClick={() => i18nChangeLanguage('de')}>
            Sprache aktualisieren
          </Button>
        </Col>
      </Row>
      <Row className='my-5'>
        <Col sm={12} md={12}>
          <InfoPanel {...examplePanel} />
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col sm={6} md={4}>
          <Button color='primary' onClick={handleUserLogged} size='sm'>
            {isLogged ? 'Logout' : 'Login'}
          </Button>
        </Col>
        <Col sm={6} md={4}>
          <Button color='primary' onClick={createNotify} size='sm'>
            Dispatch Notify
          </Button>
        </Col>
      </Row>
      <Row className='mt-2'>
        <Col sm={6} md={4}>
          <Button color='primary' onClick={createModal} size='xs'>
            Open Modal
          </Button>
        </Col>
      </Row>
      <Form className='mt-5 mb-5'>
        <Form.Row>
          <Input
            {...props.form?.name}
            label='Nome'
            placeholder='Inserisci nome'
            col='col-12 col-md-6'
            onInputBlur={props.onInputChange}
          />
          <Input
            {...props.form?.surname}
            label='Cognome'
            placeholder='Inserisci cognome'
            //onInputChange={props.onInputChange}
            onInputChange={handleInputChange}
          />
        </Form.Row>
      </Form>
      <Row className='my-5'>{guard(<h1>Prova</h1>, ['admin', 'guest'])}</Row>
      <GenericModal onClose={() => console.log('passa qui')} />
      <Stepper nSteps={5} currentStep={3} />
      <Rating />

      <section>
        <Row>
          <Button
            color='primary'
            outline
            size='lg'
            onClick={() => {
              dispatch(openModal({ id: 'switchProfileModal' }));
            }}
          >
            Apri modale switch profile
          </Button>
          <SwitchProfileModal
            profiles={[
              { name: 'Delegato ente partner', programName: 'Programma 1' },
              {
                name: 'Referente ente gestore di progetto',
                programName: 'Programma 2',
              },
            ]}
            currentProfile='Delegato ente partner'
          />
        </Row>
      </section>

      <div>
        <SectionTitle
          title='Dettaglio Programma'
          chip='ATTIVO'
          upperTitle={{ icon: 'it-folder', text: 'Prova' }}
          subTitle='un sottotitolo di prova'
        />
      </div>
    </div>
  );
};

const form = newForm([
  newFormField({
    field: 'name',
  }),
  newFormField({
    field: 'surname',
    required: true,
  }),
]);

export default withFormHandler({ form }, Playground);
