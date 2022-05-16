import React, { ReactChild } from 'react';
import { Button, Icon, ModalBody, ModalFooter } from 'design-react-kit';
import Modal from '../modals';
import withModalState from '../../../hoc/withModalState';
import { ModalPayloadI } from '../../../redux/features/modal/modalSlice';
import SearchBar from '../../SearchBar/searchBar';
import clsx from 'clsx';

const genericId = 'genericModal';

interface CallToAction {
  disabled?: boolean;
  label: string;
  onClick?: () => void;
}

interface GenericModalI {
  description?: string;
  footer?: ReactChild;
  id?: string;
  onClose?: () => void;
  payload?: ModalPayloadI | undefined;
  primaryCTA?: CallToAction;
  secondaryCTA?: CallToAction;
  title?: string | undefined;
  centerButtons?: boolean;
  hasSearch?: boolean;
  searchPlaceholder?: string;
  noSpaceAfterTitle?: boolean;
}

const GenericModal: React.FC<GenericModalI> = (props) => {
  const {
    children,
    description,
    footer,
    id = genericId,
    onClose,
    payload,
    primaryCTA,
    secondaryCTA,
    title,
    centerButtons,
    hasSearch,
    searchPlaceholder = 'Search',
    noSpaceAfterTitle = false,
  } = props;

  const handleAction = (action: 'primary' | 'secondary') => {
    switch (action) {
      case 'primary': {
        if (primaryCTA?.onClick) primaryCTA.onClick();
        break;
      }
      case 'secondary': {
        if (secondaryCTA?.onClick) secondaryCTA.onClick();
        if (onClose) onClose();
        break;
      }
    }
  };

  return (
    <Modal id={id} {...props}>
      <div
        className={clsx(
          'modal-header-container',
          !noSpaceAfterTitle && 'mb-4',
          noSpaceAfterTitle && 'pb-0 mb-0'
        )}
      >
        <h5>{title || payload?.title}</h5>
        <Icon
          onClick={onClose}
          icon='it-close-big'
          style={{ fill: '#0073E5', marginLeft: '212px', cursor: 'pointer' }}
        />
      </div>
      <ModalBody>
        {hasSearch && (
          <SearchBar
            autocomplete={false}
            onSubmit={() => console.log('ricerca modale')}
            placeholder={searchPlaceholder}
            isClearable
          />
        )}
        {description || payload?.description}
        {children}
      </ModalBody>
      <ModalFooter
        className={centerButtons ? 'd-flex justify-content-center' : ''}
      >
        {footer || primaryCTA || secondaryCTA ? (
          <>
            {footer}
            {secondaryCTA ? (
              <Button
                {...secondaryCTA}
                size='sm'
                color='secondary'
                className='mr-2'
                onClick={() => handleAction('secondary')}
              >
                {secondaryCTA.label}
              </Button>
            ) : null}
            {primaryCTA ? (
              <Button
                {...primaryCTA}
                size='sm'
                className='ml-2'
                color='primary'
                onClick={() => handleAction('primary')}
              >
                {primaryCTA.label}
              </Button>
            ) : null}
          </>
        ) : null}
      </ModalFooter>
    </Modal>
  );
};

// GenericModal.id = id;

export default withModalState(GenericModal);
