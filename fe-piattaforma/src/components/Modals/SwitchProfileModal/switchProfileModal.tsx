import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardProfile from '../../CardProfile/cardProfile';
import GenericModal from '../GenericModal/genericModal';
import './switchProfileModal.scss';

const id = 'switchProfileModal';

interface ProfileI {
  name: string;
  programName: string;
}

interface SwitchProfileModalI {
  profiles?: ProfileI[];
  currentProfile: string;
}

const SwitchProfileModal: React.FC<SwitchProfileModalI> = ({
  profiles,
  currentProfile,
}) => {
  const [profileSelected, setProfileSelected] = useState(currentProfile);
  const handleSwitchProfile = () => {
    console.log('switch profile');
  };

  const { t } = useTranslation();

  return (
    <GenericModal
      id={id}
      primaryCTA={{
        label: 'Conferma',
        onClick: handleSwitchProfile,
      }}
      secondaryCTA={{
        label: 'Annulla',
        //onClick: () => clearForm?.(),
      }}
      title={'Scegli il profilo'}
      noSpaceAfterTitle
      centerButtons
    >
      <div className='d-flex flex-column align-items-center'>
        <p>{t('select_profile_to_log_with')}</p>
        <ul
          id='listProfileSwitch'
          tabIndex={0}
          role='listbox'
          aria-labelledby='lista-seleziona-profilo'
          className='switch-profile-modal__list'
        >
          {profiles?.map((profile, index) => (
            <li
              key={index}
              role='option'
              aria-selected={profile.name === profileSelected ? true : false}
              onClick={() => setProfileSelected(profile.name)}
              onKeyDown={() => setProfileSelected(profile.name)}
            >
              <CardProfile
                name={profile.name}
                program={profile.programName}
                activeProfile={profile.name === profileSelected}
                className='mb-2'
              />
            </li>
          ))}
        </ul>
      </div>
    </GenericModal>
  );
};

export default SwitchProfileModal;
