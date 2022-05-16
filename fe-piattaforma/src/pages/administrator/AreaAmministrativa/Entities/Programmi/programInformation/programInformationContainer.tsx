import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from 'design-react-kit';
import {
  closeModal,
  openModal,
} from '../../../../../../redux/features/modal/modalSlice';
import { useDispatch } from 'react-redux';
import ConfirmDeleteModal from './modals/confirmDeleteModal';
import Sedi from '../forms/formSedi';
import FormProgram from '../forms/formProgram';
import ManageSedi from '../manageSedi/manageSedi';
import ManageProgram from '../manageProgram/manageProgram';
import ManageEnteGestoreProgetto from '../manageEnteGestoreProgetto/manageEnteGestoreProgetto';
import ManageEntiPartner from '../manageEntiPartner/manageEntiPartner';
import ManageEnteGestoreProgramma from '../manageEnteGestoreProgramma/manageEnteGestoreProgramma';
import FormEnte from '../forms/formEnte';
import { Accordion, ButtonsBar } from '../../../../../../components';
import { ButtonInButtonsBar } from '../../../../../../components/ButtonsBar/buttonsBar';
import Sticky from 'react-sticky-el';
import { useAppSelector } from '../../../../../../redux/hooks';
import CardStatusAction from '../../../../../../components/CardStatusAction/cardStatusAction';
import ProgettiTable from '../../tables/progettiTable';
import {
  DetailDataI,
  emptyDetail,
  selectDataToShow,
  selectDetailData,
  UsersLinkedI,
} from '../../../../../../redux/features/areaAmministrativa/detail/detailSlice';
import { formTypes } from '../../utils';
import FormProject from '../forms/formProject';
import ManageProject from '../manageProject/manageProject';
import ItemsList from './itemsList';
import FormUser from '../forms/formUser';
import ManageUsers from '../manageUsers/manageUsers';

export interface EnteI {
  name?: string;
  type?: string;
  profile?: string;
  fiscalCode?: string;
  address?: string;
}

const ProgramInformationContainer: React.FC = () => {
  const dispatch = useDispatch();
  const detail: DetailDataI = useAppSelector(selectDetailData);
  const itemToRender: string = useAppSelector(selectDataToShow);
  const [goBack, setGoBack] = useState<boolean>(false);
  const [deleteText, setDeleteText] = useState<string>('');
  const [editItemModalTitle, setEditItemModalTitle] = useState<string>('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    () => {
      dispatch(emptyDetail());
    };
  }, []);

  useEffect(() => {
    setGoBack(true);
  }, [location]);

  useEffect(() => {
    setCorrectModalsInfo();
  }, [itemToRender]);

  const setCorrectModalsInfo = () => {
    switch (itemToRender) {
      case formTypes.ENTE_GESTORE_PROGRAMMA:
        setDeleteText(
          'Confermi di voler eliminare questo gestore di programma?'
        );
        setEditItemModalTitle('Modifica ente gestore programma');
        break;

      case formTypes.ENTE_GESTORE_PROGETTO:
        setDeleteText(
          'Confermi di voler eliminare questo gestore di progetto?'
        );
        setEditItemModalTitle('Modifica ente gestore progetto');
        break;
      case formTypes.ENTE_PARTNER:
        setDeleteText('Confermi di voler eliminare questo ente?');
        setEditItemModalTitle('Modifica ente partner');
        break;
      case formTypes.SEDE:
        setDeleteText('Confermi di voler eliminare questa sede?');
        setEditItemModalTitle('Modifica sito');
        break;
      case formTypes.PROGETTO:
        setDeleteText('Confermi di voler eliminare questo progetto?');
        setEditItemModalTitle('Modifica progetto');
        break;
      default:
        return;
    }
  };

  const loadCorrectForm = () => {
    switch (itemToRender) {
      case formTypes.PROGRAMMA:
        return (
          <>
            <h4 className='text-primary my-2'>Scheda Programma</h4>
            <FormProgram formDisabled />
            <ManageProgram withTwoColumns />
          </>
        );
      case formTypes.ENTI_GESTORE_PROGETTO:
        return (
          <>
            <h4 className='h5'>Enti gestori di progetto</h4>
            <ItemsList />
          </>
        );
      case formTypes.ENTE_GESTORE_PROGETTO:
        return (
          <>
            <h4 className='text-primary my-2'>Informazioni Ente</h4>
            <FormEnte formDisabled />
            <ManageEnteGestoreProgetto withTwoColumns />
          </>
        );
      case formTypes.ENTE_GESTORE_PROGRAMMA:
        return (
          <>
            <h4 className='text-primary my-2'>Informazioni Ente</h4>
            <FormEnte formDisabled />
            <ManageEnteGestoreProgramma withTwoColumns />
          </>
        );
      case formTypes.ENTI_PARTNER:
        return (
          <>
            <h4 className='h5'>Enti partner</h4>
            <ItemsList />
          </>
        );
      case formTypes.ENTE_PARTNER:
        return (
          <>
            <h4 className='text-primary my-2'>Informazioni Ente</h4>
            <FormEnte formDisabled />
            <ManageEntiPartner withTwoColumns />
          </>
        );

      case formTypes.SEDI:
        return (
          <>
            <h4 className='h5'>Sedi</h4>
            <ItemsList />
          </>
        );
      case formTypes.SEDE:
        return (
          <>
            <h4 className='text-primary my-2'>Informazioni Sede</h4>
            <Sedi formDisabled />
            <ManageSedi withTwoColumns />
          </>
        );
      case formTypes.PROGETTI:
        return <ProgettiTable />;
      case formTypes.PROGETTO:
        return (
          <>
            <h4 className='text-primary my-2'>Informazioni Progetto</h4>
            <FormProject formDisabled />
            <ManageProject withTwoColumns />
          </>
        );
      case formTypes.REFERENTE:
        return (
          <>
            <h4 className='text-primary my-2'>Informazioni Referente</h4>
            <FormUser formDisabled />
            <ManageUsers withTwoColumns />
          </>
        );
      case formTypes.DELEGATO:
        return (
          <>
            <h4 className='text-primary my-2'>Informazioni Delegato</h4>
            <FormUser formDisabled />
            <ManageUsers withTwoColumns />
          </>
        );
      default:
        return <p>Default case</p>;
    }
  };

  const buttonsForBar: ButtonInButtonsBar[] = [
    {
      size: 'lg',
      color: 'primary',
      className: 'mr-4',
      text: 'Elimina',
      onClick: () => dispatch(openModal({ id: 'confirmDeleteModal' })),
    },
    {
      size: 'lg',
      outline: true,
      color: 'primary',
      className: 'mr-4',
      text: ' Modifica',
      onClick: () =>
        dispatch(
          openModal({
            id: itemToRender,
            payload: { title: editItemModalTitle },
          })
        ),
    },
  ];

  const showButtons = () => {
    return (
      itemToRender === formTypes.ENTE_GESTORE_PROGRAMMA ||
      itemToRender === formTypes.ENTE_GESTORE_PROGETTO ||
      itemToRender === formTypes.ENTE_PARTNER ||
      itemToRender === formTypes.SEDE ||
      itemToRender === formTypes.PROGETTO ||
      itemToRender === formTypes.PROGRAMMA ||
      itemToRender === formTypes.REFERENTE ||
      itemToRender === formTypes.DELEGATO
    );
  };

  return (
    <div
      className='container'
      style={{ overflow: 'visible !importanpm install react-stickynodent' }}
    >
      {goBack && (
        <a href='/'>
          <Icon icon='it-chevron-left' color='primary' />
          Torna indietro
        </a>
      )}
      <div>{loadCorrectForm()}</div>
      {showButtons() ? (
        <>
          <div aria-hidden='true'>
            <Sticky mode='bottom'>
              <ButtonsBar buttons={buttonsForBar} />
            </Sticky>
          </div>
          <div className='sr-only'>
            <ButtonsBar buttons={buttonsForBar} />
          </div>
        </>
      ) : null}
      {detail?.ref ? (
        <Accordion
          title='Referenti'
          totElem={detail.ref.length}
          cta='Aggiungi referente'
          className='my-4'
        >
          {detail.ref.map((ref: UsersLinkedI, index: number) => (
            <CardStatusAction
              key={index}
              title={ref.name}
              status={ref.status}
              actionButtons
              viewItemAction={() => {
                dispatch(emptyDetail());
                navigate(`/area-amministrativa/programmi/referente/${ref.id}`);
              }}
            />
          ))}
        </Accordion>
      ) : null}
      {detail?.del ? (
        <Accordion
          title='Delegati'
          totElem={detail.del.length}
          cta='Aggiungi delegato'
          className='my-4'
        >
          {detail.del.map((del: UsersLinkedI, index: number) => (
            <CardStatusAction
              key={index}
              title={del.name}
              status={del.status}
              actionButtons
              viewItemAction={() => {
                dispatch(emptyDetail());
                navigate(`/area-amministrativa/programmi/delegato/${del.id}`);
              }}
            />
          ))}
        </Accordion>
      ) : null}
      <ConfirmDeleteModal
        onConfirm={() => {
          console.log('confirm delete');
          dispatch(closeModal());
        }}
        onClose={() => {
          dispatch(closeModal());
        }}
        text={deleteText}
      />
    </div>
  );
};

export default ProgramInformationContainer;
