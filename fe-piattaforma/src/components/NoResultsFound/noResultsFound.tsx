import React from 'react';
import { Icon } from 'design-react-kit';
import { useTranslation } from 'react-i18next';

const NoResultsFound: React.FC<null> = () => {
  const { t } = useTranslation();

  return (
    <div className='d-flex flex-column align-items-center no-results-found'>
      <Icon icon='it-warning-circle' className='no-results-found__icon mb-4' />
      <h4 className='no-results-found__title'>{t('documents_not_found')}</h4>
      <h5 className='no-results-found__title'>{t('make_a_new_research')}</h5>
    </div>
  );
};

export default NoResultsFound;
