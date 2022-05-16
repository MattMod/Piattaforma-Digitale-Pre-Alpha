import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import GenericModal from '../../../../../../components/Modals/GenericModal/genericModal';
import { withFormHandlerProps } from '../../../../../../hoc/withFormHandler';
import { setEnteGestoreProgettoDetails } from '../../../../../../redux/features/areaAmministrativa/enteGestoreProgetto/enteGestoreProgettoSlice';
import { formTypes } from '../../utils';
import FormProject from '../forms/formProject';
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

const id = formTypes.PROGETTO;

interface FormEnteGestoreProgettoFullInterface
  extends withFormHandlerProps,
    ProgramInformationI {}

const ManageProject: React.FC<FormEnteGestoreProgettoFullInterface> = ({
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

  const handleSaveProject = () => {
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
        onClick: handleSaveProject,
      }}
      secondaryCTA={{
        label: 'Annulla',
        onClick: () => clearForm?.(),
      }}
    >
      <FormProject
        creation={creation}
        formDisabled={!!formDisabled}
        withTwoColumns={withTwoColumns}
        sendNewValues={(newData) => {
          setNewFormValues({ ...newData });
        }}
        setIsFormValid={(value: boolean | undefined) => setIsFormValid(!!value)}
      />
    </GenericModal>
  );
};

export default ManageProject;
