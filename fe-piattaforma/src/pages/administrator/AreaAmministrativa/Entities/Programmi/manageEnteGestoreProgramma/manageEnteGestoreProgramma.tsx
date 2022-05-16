import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericModal from '../../../../../../components/Modals/GenericModal/genericModal';

import { withFormHandlerProps } from '../../../../../../hoc/withFormHandler';
import { setEnteGestoreProgrammaDetails } from '../../../../../../redux/features/areaAmministrativa/enteGestoreProgramma/enteGestoreProgrammaSlice';
import { formFieldI } from '../../../../../../utils/formHelper';
import FormEnte from '../forms/formEnte';

const id = 'ente-gestore-programma';

interface ManageEnteGestoreProgettoFormI {
  formDisabled?: boolean;
  withTwoColumns?: boolean;
}

interface ManageEnteGestoreProgettoI
  extends withFormHandlerProps,
    ManageEnteGestoreProgettoFormI {}

const ManageEnteGestoreProgramma: React.FC<ManageEnteGestoreProgettoI> = ({
  clearForm,
  formDisabled,
  withTwoColumns = false,
}) => {
  const [newFormValues, setNewFormValues] = useState<{
    [key: string]: formFieldI['value'];
  }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const handleSaveEnte = () => {
    if (isFormValid) {
      dispatch(setEnteGestoreProgrammaDetails({ ...newFormValues }));
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
      <FormEnte
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

export default ManageEnteGestoreProgramma;
