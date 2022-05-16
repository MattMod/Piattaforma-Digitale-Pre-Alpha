import React from 'react';
import {
  AreaAmministrativa,
  Documents,
  HomeFacilitator,
  Playground,
  Survey,
} from '../pages';
import { AreaAmministrativaRoutes } from '../pages/administrator/AreaAmministrativa/areaAmministrativa';
import ProgrammiDetails from '../pages/administrator/AreaAmministrativa/Entities/Programmi/programmiDetails';
import AreaCittadini, {
  AreaCittadiniRoutes,
} from '../pages/administrator/AreaCittadini/areaCittadini';
import RoleManagement from '../pages/common/RoleManagement/roleManagement';
import RoleManagementDetails from '../pages/common/RoleManagement/RoleManagementDetails/roleManagementDetails';
import Onboarding from '../pages/facilitator/Onboarding/onboarding';
import { AppRoutesI, layoutEnum } from '.';

const newRoute: (NewRoute: AppRoutesI) => AppRoutesI = ({
  path,
  title = 'MITD',
  visibleTo = [],
  element,
  layout = layoutEnum.mainLayout,
  isHeaderFull = true,
  authenticated = true,
  subRoutes,
  route_paths = [],
}) => ({
  path,
  title,
  visibleTo,
  element,
  layout,
  isHeaderFull,
  authenticated,
  subRoutes,
  route_paths,
});

const routes = [
  newRoute({
    path: '/',
    title: 'Home',
    visibleTo: ['Referente Ente gestore di progetto'],
    element: <HomeFacilitator />,
    layout: layoutEnum.fullLayout,
    isHeaderFull: true,
    route_paths: [],
  }),
  newRoute({
    path: '/area-amministrativa',
    title: `Area amministrativa`,
    visibleTo: ['Referente Ente gestore di progetto'],
    element: <AreaAmministrativa />,
    subRoutes: AreaAmministrativaRoutes,
    layout: layoutEnum.fullLayout,
    isHeaderFull: true,
    route_paths: [
      { label: 'area amministrativa', url: '/area-amministrativa' },
    ],
  }),
  newRoute({
    path: '/area-amministrativa/programmi/dettaglio',
    title: 'Dettaglio area amministrativa',
    element: <ProgrammiDetails />,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.fullLayout,
    isHeaderFull: false,
    route_paths: [
      { label: 'area amministrativa', url: '/area-amministrativa' },
      { label: 'programmi', url: '/area-amministrativa/programmi/dettaglio' },
    ],
  }),
  newRoute({
    path: '/area-cittadini',
    title: 'Area cittadini',
    element: <AreaCittadini />,
    subRoutes: AreaCittadiniRoutes,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.fullLayout,
    isHeaderFull: true,
    route_paths: [{ label: 'Area cittadini', url: '/area-cittadini' }],
  }),
  newRoute({
    path: '/survey',
    title: 'Survey',
    element: <Survey />,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.fullLayout,
    isHeaderFull: false,
    route_paths: [{ label: 'Survey', url: '/survey' }],
  }),
  newRoute({
    path: '/documents',
    title: 'Documenti',
    element: <Documents />,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.fullLayout,
    isHeaderFull: true,
    route_paths: [{ label: 'Documenti', url: '/documents' }],
  }),
  newRoute({
    path: '/gestione-ruoli',
    title: 'gestione-ruoli',
    element: <RoleManagement />,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.fullLayout,
    isHeaderFull: true,
    route_paths: [{ label: 'Gestione ruoli', url: '/gestione-ruoli' }],
  }),
  newRoute({
    path: '/gestione-ruoli/dettaglio',
    title: 'Dettaglio gestione ruoli',
    element: <RoleManagementDetails />,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.fullLayout,
    isHeaderFull: false,
    route_paths: [
      { label: 'Gestione ruoli', url: '/gestione-ruoli' },
      { label: 'Dettaglio', url: '/gestione-ruoli/dettaglio' },
    ],
  }),
  newRoute({
    path: '/onboarding',
    title: `Onboarding`,
    element: <Onboarding />,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.mainLayout,
    isHeaderFull: false,
    route_paths: [{ label: 'Onboarding', url: '/onboarding' }],
  }),
  newRoute({
    path: '*',
    title: 'Playground',
    element: <Playground />,
    visibleTo: ['Referente Ente gestore di progetto'],
    layout: layoutEnum.mainLayout,
    isHeaderFull: false,
    route_paths: [
      { label: 'home', url: '/' },
      { label: 'playground', url: '/dashboard' },
    ],
  }),
];

export default routes;
