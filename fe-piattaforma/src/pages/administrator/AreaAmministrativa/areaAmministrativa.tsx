import React, { useEffect } from 'react';
import { Container } from 'design-react-kit';
import { Outlet, Route, useLocation, useNavigate } from 'react-router-dom';
import Programmi from './Entities/Programmi/programmi';
import PageTitle from '../../../components/PageTitle/pageTitle';
//import { TabGroup } from '../../../components';
import Progetti from './Entities/Progetti/progetti';
import Utenti from './Entities/Utenti/utenti';
import Questionari from './Entities/Questionari/questionari';
import Enti from './Entities/Enti/enti';
/*import ManageProgram from './Entities/Programmi/manageProgram/manageProgram';
import ManageEnteGestoreProgramma from './Entities/Programmi/manageEnteGestoreProgramma/manageEnteGestoreProgramma';
import ManageEntiPartner from './Entities/Programmi/manageEntiPartner/manageEntiPartner';
import ManageSedi from './Entities/Programmi/manageSedi/manageSedi';
import ManageEnteGestoreProgetto from './Entities/Programmi/manageEnteGestoreProgetto/manageEnteGestoreProgetto';*/
import ManageUsers from './Entities/Programmi/manageUsers/manageUsers';
import NewSurvey from './Entities/Questionari/newSurvey/newSurvey';
import CompileSurvey from './Entities/Questionari/compileSurvey/compileSurvey';
import SurveyDetails from './Entities/Questionari/surveyDetails/surveyDetails';
import ProgrammiDetails from './Entities/Programmi/programmiDetails';

interface PageTitleMockI {
  [key: string]: {
    title: string;
    textCta?: string;
    iconCta?: string;
  };
}

export const PageTitleMock: PageTitleMockI = {
  '/area-amministrativa/programmi': {
    title: 'Programmi',
    textCta: 'Crea nuovo programma',
    iconCta: 'it-plus',
  },
  '/area-amministrativa/progetti': {
    title: 'Progetti',
    textCta: 'Crea nuovo progetto',
    iconCta: 'it-plus',
  },
  '/area-amministrativa/utenti': {
    title: 'Utenti',
    textCta: 'Crea nuovo utente',
    iconCta: 'it-plus',
  },
  '/area-amministrativa/enti': {
    title: 'Enti',
    textCta: 'Crea nuovo ente',
    iconCta: 'it-plus',
  },
  '/area-amministrativa/questionari': {
    title: 'Questionari',
    textCta: 'Crea nuovo questionario',
    iconCta: 'it-plus',
  },
};

const tabs = [
  {
    label: 'Programmi',
    path: '/area-amministrativa/programmi',
    id: 'tab-admin-programmi',
  },
  {
    label: 'Progetti',
    path: '/area-amministrativa/progetti',
    id: 'tab-admin-progetti',
  },
  {
    label: 'Enti',
    path: '/area-amministrativa/enti',
    id: 'tab-admin-enti',
  },
  {
    label: 'Utenti',
    path: '/area-amministrativa/utenti',
    id: 'tab-admin-utenti',
  },
  {
    label: 'Questionari',
    path: '/area-amministrativa/questionari',
    id: 'tab-admin-questionari',
  },
];

const AreaAmministrativa = () => {
  //const [activeTab, setActiveTab] = useState(tabs.at(0));
  const location = useLocation();
  const navigate = useNavigate();

  const updateActiveTab = () => {
    if (location.pathname.split('/').length <= 2 && tabs.at(0)?.path) {
      navigate(tabs.at(0)?.path ?? '', {
        replace: false,
      });
    }
    /* setActiveTab(
      tabs.at(tabs.findIndex((tab) => tab.path === location.pathname) || 0)
    ); */
  };

  useEffect(() => {
    updateActiveTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      {/*
      <div className='mb-5 mt-3'>
         <TabGroup arrayTabs={tabs} activeTab={activeTab?.id} /> 
      </div>
      */}

      {location?.pathname &&
      location?.pathname !== '/area-amministrativa/questionari' ? (
        <PageTitle {...PageTitleMock[location?.pathname]} />
      ) : null}

      <Container>
        <Outlet />
      </Container>
      {/*<ManageProgram />
      <ManageEnteGestoreProgramma />
      <ManageEntiPartner />
      <ManageSedi />
      <ManageEnteGestoreProgetto/>*/}
      <ManageUsers />
    </>
  );
};

export default AreaAmministrativa;

export const AreaAmministrativaRoutes = [
  <Route key='programmi' path='programmi' element={<Programmi />} />,
  <Route
    key='programmi-dettaglio'
    path='programmi/:firstParam'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-ente'
    path='programmi/:firstParam/ente-gestore-programma'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested'
    path='programmi/:firstParam/progetti'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested'
    path='programmi/:firstParam/progetti/:secondParam'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested'
    path='programmi/:firstParam/progetti/:secondParam/enti-partner'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested'
    path='programmi/:firstParam/progetti/:secondParam/enti-partner/:thirdParam'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested'
    path='programmi/:firstParam/progetti/:secondParam/enti-gestore-progetto'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested'
    path='programmi/:firstParam/progetti/:secondParam/enti-gestore-progetto/:thirdParam'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested-sedi'
    path='programmi/:firstParam/progetti/:secondParam/sedi'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-nested-sedi'
    path='programmi/:firstParam/progetti/:secondParam/sedi/:thirdParam'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-user-delegato'
    path='programmi/delegato/:userId'
    element={<ProgrammiDetails />}
  />,
  <Route
    key='programmi-dettaglio-user-referente'
    path='programmi/referente/:userId'
    element={<ProgrammiDetails />}
  />,
  <Route key='progetti' path='progetti' element={<Progetti />} />,
  <Route key='enti' path='enti' element={<Enti />} />,
  <Route key='utenti' path='utenti' element={<Utenti />} />,
  <Route
    key='questionari'
    path='questionari/compila'
    element={<CompileSurvey />}
  />,
  <Route key='questionari' path='questionari/nuovo' element={<NewSurvey />} />,
  <Route
    key='questionari'
    path='questionari/modifica/:questionarioId'
    element={<NewSurvey editMode />}
  />,
  <Route key='questionari' path='questionari' element={<Questionari />} />,
  <Route
    key='questionari'
    path='questionari/riepilogo/:questionarioId'
    element={<SurveyDetails />}
  />,
];
