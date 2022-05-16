import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericModal from '../../../../../../components/Modals/GenericModal/genericModal';

import { withFormHandlerProps } from '../../../../../../hoc/withFormHandler';

import FormSedi from '../forms/formSedi';

import { setEnteGestoreProgettoDetails } from '../../../../../../redux/features/areaAmministrativa/enteGestoreProgetto/enteGestoreProgettoSlice';
import { formTypes } from '../../utils';
import { formFieldI } from '../../../../../../utils/formHelper';

const id = formTypes.SEDE;

interface ManageSediFormI {
  formDisabled?: boolean;
  withTwoColumns?: boolean;
}

interface ManageSediI extends withFormHandlerProps, ManageSediFormI {}

const ManageSedi: React.FC<ManageSediI> = ({
  clearForm,
  formDisabled,
  withTwoColumns = false,
}) => {
  const [newFormValues, setNewFormValues] = useState<{
    [key: string]: formFieldI['value'];
  }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleSaveSite = () => {
    if (isFormValid) {
      dispatch(setEnteGestoreProgettoDetails({ ...newFormValues }));
    }
  };

  return (
    <GenericModal
      id={id}
      primaryCTA={{
        disabled: !isFormValid,
        label: 'Conferma',
        onClick: handleSaveSite,
      }}
      secondaryCTA={{
        label: 'Annulla',
        onClick: () => clearForm?.(),
      }}
    >
      <FormSedi
        withTwoColumns={withTwoColumns}
        formDisabled={!!formDisabled}
        sendNewValues={(newData) => setNewFormValues({ ...newData })}
        setIsFormValid={(value: boolean | undefined) => setIsFormValid(!!value)}
      />
    </GenericModal>
  );
};

export default ManageSedi;
