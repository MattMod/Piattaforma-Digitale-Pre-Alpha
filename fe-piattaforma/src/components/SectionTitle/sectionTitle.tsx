import React from 'react';
import clsx from 'clsx';
import { Chip, ChipLabel, Icon } from 'design-react-kit';
import './sectionTitle.scss';

interface SectionTitleI {
  title: string;
  chip?: string;
  upperTitle?: {
    icon: string;
    text: string;
  };
  subTitle?: string;
}

const SectionTitle: React.FC<SectionTitleI> = (props) => {
  const { title, chip, upperTitle, subTitle } = props;

  return (
    <div
      className={clsx(
        'd-flex',
        'flex-column',
        'align-items-center',
        'justify-content-center',
        'pt-3'
      )}
    >
      {upperTitle ? (
        <div className={clsx('d-flex', 'flex-row')}>
          <Icon icon={upperTitle.icon} size='sm' color='primary' />
          <h6>{upperTitle.text}</h6>
        </div>
      ) : null}

      <div
        className={clsx(
          'd-flex',
          'flex-row',
          'primary-color-a9',
          'section-container',
          'ml-5'
        )}
      >
        <div className='section-title'>{title}</div>
        {chip ? (
          <Chip
            className={clsx(
              'table-container__status-label',
              'mx-3',
              'primary-bg-a9',
              'mt-3'
            )}
          >
            <ChipLabel className='text-white'>{chip}</ChipLabel>
          </Chip>
        ) : null}
      </div>
      {subTitle ? (
        <div className='ml-3'>
          <p> {subTitle} </p>
        </div>
      ) : null}
    </div>
  );
};

export default SectionTitle;
