import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GetEntityDetail } from '../../../../../redux/features/areaCittadini/areaCittadiniThunk';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectEntityDetail } from '../../../../../redux/features/areaCittadini/areaCittadiniSlice';
import CitizenForm from './CitizenForm';
import CitizenQuestionari from './CitizenQuestionari';

const CittadinoDetail: React.FC<any> = () => {
  const dispatch = useDispatch();
  const { codFiscale } = useParams();
  const citizen = useAppSelector(selectEntityDetail);
  useEffect(() => {
    dispatch(GetEntityDetail(codFiscale));
  }, []);
  return (
    <>
      <CitizenForm info={citizen?.info} />
      <CitizenQuestionari questionari={citizen?.questionari} />
    </>
  );
};

export default CittadinoDetail;
