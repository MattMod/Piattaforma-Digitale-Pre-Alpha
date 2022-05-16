import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericModal from '../../../../../../components/Modals/GenericModal/genericModal';

import { withFormHandlerProps } from '../../../../../../hoc/withFormHandler';
import { SetEntePartnerDetails } from '../../../../../../redux/features/areaAmministrativa/entePartner/entePartnerThunk';
import FormEnte from '../forms/formEnte';
import { formFieldI } from '../../../../../../utils/formHelper';

const id = 'ENTE';

interface ManageEntePartnerFormI {
  formDisabled?: boolean;
  withTwoColumns?: boolean;
  creation?: boolean;
}

interface ManageEnteGestoreProgettoI
  extends withFormHandlerProps,
    ManageEntePartnerFormI {}

const ManageEntiGeneric: React.FC<ManageEnteGestoreProgettoI> = ({
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
      dispatch(SetEntePartnerDetails({ ...newFormValues }));
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

export default ManageEntiGeneric;
