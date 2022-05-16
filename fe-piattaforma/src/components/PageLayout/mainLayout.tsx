import React from 'react';
import { Footer, Header } from '../index';
import { Outlet } from 'react-router-dom';
import { AppRoutesI } from '../../routes';
import Breadcrumb from '../Breadcrumb/breadCrumb';

export interface LayoutProp {
  isHeaderFull?: AppRoutesI['isHeaderFull'];
  breadcrumbArray?: AppRoutesI['route_paths'];
}

const MainLayout: React.FC<LayoutProp> = (props) => {
  const { isHeaderFull = true, breadcrumbArray = [] } = props;

  return (
    <>
      <Header isHeaderFull={isHeaderFull} breadcrumbArray={breadcrumbArray} />
      {breadcrumbArray.length > 0 && (
        <Breadcrumb breadcrumbArray={breadcrumbArray} />
      )}
      <main
        className='container main-container main-container__content-container'
        id='main'
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
