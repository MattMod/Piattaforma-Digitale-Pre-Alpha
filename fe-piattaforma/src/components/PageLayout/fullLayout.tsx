import React from 'react';
import { Footer, Header } from '../index';
import { Outlet } from 'react-router-dom';
import { LayoutProp } from './mainLayout';
import Breadcrumb from '../Breadcrumb/breadCrumb';

const FullLayout: React.FC<LayoutProp> = (props) => {
  const { isHeaderFull = true, breadcrumbArray = [] } = props;

  return (
    <>
      <Header isHeaderFull={isHeaderFull} breadcrumbArray={breadcrumbArray} />
      {breadcrumbArray.length > 0 && (
        <Breadcrumb breadcrumbArray={breadcrumbArray} />
      )}
      <main
        className='main-container main-container__content-container'
        id='main'
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default FullLayout;
