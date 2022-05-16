import clsx from 'clsx';
import { CardProps, CardText, CardTitle, Icon } from 'design-react-kit';
import React, { memo } from 'react';
import './cardProfile.scss';

interface CardProfileI extends CardProps {
  name?: string;
  program?: string;
  className?: string;
  activeProfile?: boolean;
}

const CardProfile: React.FC<CardProfileI> = (props) => {
  const { name, program, className, activeProfile } = props;

  return (
    <div
      className={clsx(
        className,
        activeProfile && 'primary-bg-b1',
        !activeProfile && 'primary-bg-a2',
        'card-profile-container',
        'justify-content-center'
      )}
    >
      <div
        className={clsx(
          'ml-2',
          'bg-white',
          'px-4',
          'py-4',
          'h-100',
          'd-flex',
          'flex-row',
          'align-items-center',
          'justify-content-between',
          'card-profile-container__white-card'
        )}
      >
        <div className='d-flex flex-row align-items-center'>
          <div
            className={clsx(
              'card-profile-container__icon mr-3',
              !activeProfile && 'card-profile-container__opacity'
            )}
          >
            <Icon
              className={clsx(
                'mx-1 my-1',
                !activeProfile && 'card-profile-container__opacity'
              )}
              color='primary'
              icon='it-user'
              size='sm'
            />
          </div>
          <div>
            <CardTitle className='mb-2 primary-color-a12'>
              {activeProfile ? <strong>{name}</strong> : <span>{name}</span>}
            </CardTitle>
            <CardText
              className={clsx(
                activeProfile && 'primary-color-a12',
                !activeProfile && 'neutral-2-color-a3'
              )}
            >
              {program}
            </CardText>
          </div>
        </div>
        {activeProfile && (
          <div className='d-flex justify-content-between align-content-center'>
            <Icon color='primary' icon='it-check' size='lg' />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(CardProfile);
