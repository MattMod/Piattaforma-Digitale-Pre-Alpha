import React, { useEffect, useState } from 'react';
import GenericModal from '../../../../../components/Modals/GenericModal/genericModal';
import { SearchBar } from '../../../../../components';
import CitizenFormResult from './citizenFormResult';
import NoResultsFound from '../../../../../components/NoResultsFound/noResultsFound';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../../redux/features/modal/modalSlice';
import { GetEntitySearchResult } from '../../../../../redux/features/areaCittadini/areaCittadiniThunk';
import { useAppSelector } from '../../../../../redux/hooks';
import {
  CittadinoInfoI,
  selectEntitySearchResponse,
} from '../../../../../redux/features/areaCittadini/areaCittadiniSlice';

const id = 'search-citizen-modal';

const searchSteps = {
  SEARCH: 'search',
  RESULT_FOUND: 'result_found',
  RESULT_NOT_FOUND: 'result_not_found',
};

const SearchCitizenModal: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<string>();
  const dispatch = useDispatch();
  const citizenData: CittadinoInfoI | undefined = useAppSelector(
    selectEntitySearchResponse
  );

  useEffect(() => {
    if (
      citizenData &&
      Object.keys(citizenData).length !== 0 &&
      Object.getPrototypeOf(citizenData) === Object.prototype
    ) {
      console.log({ citizenData });
      setCurrentStep(searchSteps.RESULT_FOUND);
    } else {
      setCurrentStep(searchSteps.RESULT_NOT_FOUND);
    }
  }, [citizenData]);

  useEffect(() => {
    setCurrentStep(searchSteps.SEARCH);
  }, []);

  const loadResultSection = () => {
    if (currentStep === searchSteps.RESULT_FOUND && citizenData) {
      return <CitizenFormResult data={citizenData} />;
    } else if (currentStep === searchSteps.RESULT_NOT_FOUND) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return <NoResultsFound />;
    }
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  const onConfirm = () => {
    console.log('on confirm');
  };

  return (
    <GenericModal
      id={id}
      title='Cerca tra tutti i cittadini'
      primaryCTA={{
        label: 'Compila questionario',
        onClick: onConfirm,
        disabled: currentStep === searchSteps.RESULT_NOT_FOUND,
      }}
      secondaryCTA={{
        label: 'Annulla',
        onClick: onClose,
      }}
      centerButtons
      onClose={onClose}
    >
      <div className='d-flex flex-column'>
        <div className='mt-5 mb-5'>
          <SearchBar
            autocomplete={false}
            onSubmit={(e) => {
              console.log('search value', e);
              setCurrentStep(searchSteps.RESULT_NOT_FOUND);
              dispatch(GetEntitySearchResult(e));
            }}
          />
        </div>
        {loadResultSection()}
      </div>
    </GenericModal>
  );
};

export default SearchCitizenModal;
