import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericModal from '../../../../../../components/Modals/GenericModal/genericModal';
import { withFormHandlerProps } from '../../../../../../hoc/withFormHandler';
import FormProgram from '../forms/formProgram';
import { setEnteGestoreProgettoDetails } from '../../../../../../redux/features/areaAmministrativa/enteGestoreProgetto/enteGestoreProgettoSlice';
import { formTypes } from '../../utils';
import { formFieldI } from '../../../../../../utils/formHelper';

interface ProgramInformationI {
  /*formData?: {
    programName?: string;
    policy?: string;
    startDate?: string;
    endDate?: string;
  };*/
  formDisabled?: boolean;
  withTwoColumns?: boolean;
  creation?: boolean;
}

const id = formTypes.PROGRAMMA;

interface FormEnteGestoreProgettoFullInterface
  extends withFormHandlerProps,
    ProgramInformationI {}

const ManageProgram: React.FC<FormEnteGestoreProgettoFullInterface> = ({
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

  const handleSaveProgram = () => {
    if (isFormValid) {
      dispatch(setEnteGestoreProgettoDetails({ ...newFormValues }));
    }
  };

  return (
    <GenericModal
      id={id}
      primaryCTA={{
        disabled: isFormValid,
        label: 'Conferma',
        onClick: handleSaveProgram,
      }}
      secondaryCTA={{
        label: 'Annulla',
        onClick: () => clearForm?.(),
      }}
    >
      <FormProgram
        formDisabled={!!formDisabled}
        withTwoColumns={withTwoColumns}
        sendNewValues={(newData?: { [key: string]: formFieldI['value'] }) =>
          setNewFormValues({ ...newData })
        }
        setIsFormValid={(value: boolean | undefined) => setIsFormValid(!!value)}
        creation={creation}
      />
    </GenericModal>
  );
};

export default ManageProgram;
