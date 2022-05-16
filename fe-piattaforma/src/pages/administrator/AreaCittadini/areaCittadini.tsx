import React from 'react';
import PageTitle from '../../../components/PageTitle/pageTitle';
import { Container } from 'design-react-kit';
import { Outlet, Route } from 'react-router-dom';
import Cittadini from './Entities/Cittadini/cittadini';
import CittadinoDetail from './Entities/Cittadini/cittadinoDetail';

const arrayBreadcrumb = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Area cittadini',
  },
];

const PageTitleMock: {
  title: string;
  subtitle: string;
  textCta: string;
  iconCta: string;
} = {
  title: 'Area Cittadini',
  subtitle:
    'Qui puoi consultare la lista dei cittadini e i questionari da compilare e già completati',
  textCta: 'Compila un nuovo questionario',
  iconCta: 'it-plus',
};

const AreaCittadini = () => {
  return (
    <>
      <PageTitle breadcrumb={arrayBreadcrumb} {...PageTitleMock} />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default AreaCittadini;

export const AreaCittadiniRoutes = [
  <Route key='area-cittadini' element={<Cittadini />} path='' />,
  <Route
    key='area-cittadini'
    element={<CittadinoDetail />}
    path='/area-cittadini/:codFiscale'
  />,
];
