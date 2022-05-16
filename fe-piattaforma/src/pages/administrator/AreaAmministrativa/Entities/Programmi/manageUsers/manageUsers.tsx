import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericModal from '../../../../../../components/Modals/GenericModal/genericModal';

import { withFormHandlerProps } from '../../../../../../hoc/withFormHandler';
import { setUserDetails } from '../../../../../../redux/features/areaAmministrativa/user/userSlice';
import { formFieldI } from '../../../../../../utils/formHelper';
import FormUser from '../forms/formUser';

const id = 'utenti';

interface ManageUsersFormI {
  /* formData?:
    | {
        name?: string;
        lastName?: string;
        role?: string;
        userId?: string;
        fiscalCode?: string;
        email?: string;
        phone?: string;
      }
    | undefined;*/
  formDisabled?: boolean;
  withTwoColumns?: boolean;
  creation?: boolean;
}

interface ManageUsersI extends withFormHandlerProps, ManageUsersFormI {}

const ManageUsers: React.FC<ManageUsersI> = ({
  clearForm,
  formDisabled,
  withTwoColumns = false,
  creation = false,
}) => {
  const [newFormValues, setNewFormValues] = useState<{
    [key: string]: formFieldI['value'];
  }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleSaveEnte = () => {
    if (isFormValid) {
      dispatch(setUserDetails({ ...newFormValues }));
    }
  };

  return (
    <GenericModal
      id={id}
      primaryCTA={{
        disabled: !isFormValid,
        label: 'Conferma',
        onClick: handleSaveEnte,
      }}
      secondaryCTA={{
        label: 'Annulla',
        onClick: () => clearForm?.(),
      }}
    >
      <FormUser
        creation={creation}
        withTwoColumns={withTwoColumns}
        formDisabled={!!formDisabled}
        sendNewValues={(newData?: { [key: string]: formFieldI['value'] }) =>
          setNewFormValues({ ...newData })
        }
        setIsFormValid={(value: boolean | undefined) => setIsFormValid(!!value)}
      />
    </GenericModal>
  );
};

export default ManageUsers;
