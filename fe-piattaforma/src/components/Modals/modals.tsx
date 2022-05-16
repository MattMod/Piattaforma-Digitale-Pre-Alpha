import React, { ReactElement } from 'react';
import { useAppSelector } from '../../redux/hooks';
import ModalsPortal from './modalsPortal';
import { selectModalId } from '../../redux/features/modal/modalSlice';
import Curtain from '../Curtain/curtain';
import clsx from 'clsx';

interface ModalI {
  id: string;
  children: ReactElement[];
  onClose?: () => void;
}

const Modal: React.FC<ModalI> = (props) => {
  const { id, children, onClose } = props;
  const currentId = useAppSelector(selectModalId);

  const handleCloseModal = () => {
    if (onClose) onClose();
  };

  return currentId === id ? (
    <ModalsPortal.Source>
      <Curtain open noscroll onClick={handleCloseModal} />
      <div
        className={clsx(
          'modal-wrapper',
          'd-flex',
          'align-items-center',
          'justify-content-center',
          'w-100',
          'h-auto',
          'position-fixed'
        )}
      >
        <div className='modal-content w-50 h-auto'>{children}</div>
      </div>
    </ModalsPortal.Source>
  ) : null;
};

export default Modal;
