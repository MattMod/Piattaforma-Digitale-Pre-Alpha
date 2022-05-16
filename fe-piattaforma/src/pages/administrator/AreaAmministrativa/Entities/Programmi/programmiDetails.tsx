import React, { useEffect } from 'react';
import { MenuDetails } from '../../../../../components';
import ProgramInformationContainer from './programInformation/programInformationContainer';
import { useLocation, useParams } from 'react-router-dom';
import { formTypes } from '../utils';
import { useDispatch } from 'react-redux';
import { setDataToShow } from '../../../../../redux/features/areaAmministrativa/detail/detailSlice';
/*import { useAppSelector } from '../../../../../redux/hooks';*/

const ProgrammiDetails = () => {
  const location = useLocation();
  const { firstParam, secondParam, thirdParam } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    setCorrectInfoToShow();
  }, [location]);

  const projectsMock = [
    { name: 'Progetto 1', id: 'project1' },
    { name: 'Progetto 2', id: 'project2' },
    { name: 'Progetto 3', id: 'project3' },
  ];

  const setCorrectInfoToShow = () => {
    const { pathname } = location;
    if (pathname.includes(formTypes.ENTI_GESTORE_PROGETTO)) {
      if (thirdParam) {
        dispatch(setDataToShow(formTypes.ENTE_GESTORE_PROGETTO));
      } else {
        dispatch(setDataToShow(formTypes.ENTI_GESTORE_PROGETTO));
      }
      return;
    } else if (pathname.includes(formTypes.ENTI_PARTNER)) {
      if (thirdParam) {
        dispatch(setDataToShow(formTypes.ENTE_PARTNER));
      } else {
        dispatch(setDataToShow(formTypes.ENTI_PARTNER));
      }
      return;
    } else if (pathname.includes(formTypes.SEDI)) {
      if (thirdParam) {
        dispatch(setDataToShow(formTypes.SEDE));
      } else {
        dispatch(setDataToShow(formTypes.SEDI));
      }
      return;
    } else if (pathname.includes(formTypes.PROGETTI)) {
      if (secondParam) {
        dispatch(setDataToShow(formTypes.PROGETTO));
      } else {
        dispatch(setDataToShow(formTypes.PROGETTI));
      }
      return;
    } else if (pathname.includes(formTypes.ENTE_GESTORE_PROGRAMMA)) {
      if (firstParam) {
        dispatch(setDataToShow(formTypes.ENTE_GESTORE_PROGRAMMA));
      }
      return;
    } else if (pathname.includes(formTypes.DELEGATO)) {
      dispatch(setDataToShow(formTypes.DELEGATO));
      return;
    } else if (pathname.includes(formTypes.REFERENTE)) {
      dispatch(setDataToShow(formTypes.REFERENTE));
      return;
    } else if (pathname.includes(formTypes.PROGRAMMA)) {
      if (firstParam) {
        dispatch(setDataToShow(formTypes.PROGRAMMA));
      }
      return;
    }
  };

  return (
    <div className='d-flex flex-row mt-5'>
      <div className='d-flex flex-column col-12 col-md-3'>
        <MenuDetails arrayProjects={projectsMock} />
      </div>
      <div className='d-flex flex-column col-md-9'>
        <ProgramInformationContainer />
      </div>
    </div>
  );
};

export default ProgrammiDetails;
