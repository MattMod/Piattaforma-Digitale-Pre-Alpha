import clsx from 'clsx';
import { Button, CardReadMore, Icon } from 'design-react-kit';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './cardStatusAction.scss';

interface CardStatusActionI {
  title: string;
  subtitle?: string;
  status?: string;
  actionView?: boolean;
  actionButtons?: boolean;
  referente?: string;
  isSede?: boolean;
  ente?: string;
  serviziErogati?: string;
  nFacilitatori?: number;
  viewItemAction?: () => void;
}

const CardStatusAction: React.FC<CardStatusActionI> = (props) => {
  const {
    title,
    subtitle,
    status,
    actionView,
    actionButtons,
    referente,
    isSede,
    ente,
    serviziErogati,
    nFacilitatori,
    viewItemAction,
  } = props;

  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
      case 'ACTIVE':
        return 'primary-bg-a9 text-white';
      case 'NOT_COMPLETED':
        return 'analogue-2-bg-a2 text-primary';
      default:
        return '';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toUpperCase()) {
      case 'COMPLETED':
        return 'COMPLETATO';
      case 'ACTIVE':
        return 'ATTIVO';
      case 'NOT_COMPLETED':
        return 'DA COMPLETARE';
      default:
        return '';
    }
  };

  const { t } = useTranslation();

  return (
    <div className='d-flex flex-row justify-content-between my-3 card-status-action'>
      <div
        className={clsx('d-flex align-items-center', subtitle && 'flex-column')}
      >
        {subtitle ? (
          <>
            <span className='primary-color-b1'>
              <strong>{title}</strong>
            </span>
            <span className='neutral-1-color-a8'>{subtitle}</span>
          </>
        ) : (
          <span className='primary-color-b1'>
            <strong>{title}</strong>
          </span>
        )}
      </div>
      {referente && (
        <div className='d-flex flex-column'>
          <span>{t('refer_to')}</span>
          <span>
            <strong>{referente}</strong>
          </span>
        </div>
      )}
      {isSede && (
        <div className='d-flex flex-wrap w-25 justify-content-between'>
          <div className='d-flex flex-column'>
            <span>{t('Ente')}</span>
            <span>
              <strong>{ente}</strong>
            </span>
          </div>
          <div className='d-flex flex-column'>
            <span>{t('Servizi erogati')}</span>
            <span>
              <strong>{serviziErogati}</strong>
            </span>
          </div>
          <div className='d-flex flex-column'>
            <span>{t('Nr Facilitatori')}</span>
            <span>
              <strong>{nFacilitatori}</strong>
            </span>
          </div>
        </div>
      )}
      <div className='d-flex flex-row'>
        {status && (
          <Button
            size='xs'
            className={clsx(
              'card-status-action__status-button mr-5',
              getStatusStyle(status)
            )}
          >
            {getStatusLabel(status)}
          </Button>
        )}
        {actionView && (
          <CardReadMore
            text={t('visualize')}
            iconName='it-arrow-right'
            href=''
          />
        )}
        {actionButtons && (
          <span className='d-flex align-items-center'>
            <Button onClick={() => console.log('delete')}>
              <Icon color='primary' icon='it-close-circle' size='sm' />
            </Button>
            <Button onClick={viewItemAction}>
              <Icon color='primary' icon='it-chevron-right' size='sm' />
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};

export default memo(CardStatusAction);
