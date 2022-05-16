import { Container } from 'design-react-kit';
import React, { memo } from 'react';
import './pageTitle.scss';

interface BreadcrumbI {
  label?: string;
  url?: string;
}
export interface PageTitleI {
  breadcrumb?: BreadcrumbI[];
  title?: string;
  hasBackground?: boolean;
}

const PageTitle: React.FC<PageTitleI> = (props) => {
  const { hasBackground, title } = props;

  return (
    <div {...(hasBackground ? 'lightgrey-bg-a1' : '')} className='w-100'>
      <Container className='mt-3'>
        <div className='d-flex flex-row justify-content-between align-items-center'>
          <h2 className='py-2 mb-2 primary-color-a9'>{title}</h2>
        </div>
      </Container>
    </div>
  );
};

export default memo(PageTitle);
