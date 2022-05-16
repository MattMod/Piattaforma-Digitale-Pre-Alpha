import React from 'react';
import {
  Breadcrumb as BreadcrumbKit,
  BreadcrumbItem,
  Container,
} from 'design-react-kit';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export interface BreadcrumbI {
  label?: string;
  url?: string;
}
export interface BreadcrumbProps {
  breadcrumbArray: BreadcrumbI[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { breadcrumbArray } = props;

  return (
    <Container className='mt-5 mb-2'>
      <BreadcrumbKit className='mt-0'>
        {breadcrumbArray.map((item, index) => (
          <BreadcrumbItem key={index}>
            <NavLink
              to={item.url || ''}
              className={clsx(
                index === 0 && 'pl-3 font-weight-bold',
                'text-secondary',
                'text-capitalize'
              )}
              style={{
                borderLeft: index === 0 ? '5px solid #06c' : 'none',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </NavLink>
            {index < breadcrumbArray?.length - 1 ? (
              <span className='separator'>/</span>
            ) : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbKit>
    </Container>
  );
};

export default Breadcrumb;
