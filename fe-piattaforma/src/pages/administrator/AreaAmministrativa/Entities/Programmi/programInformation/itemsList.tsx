import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../../redux/hooks';
import {
  selectDataToShow,
  selectListData,
} from '../../../../../../redux/features/areaAmministrativa/detail/detailSlice';
import { formTypes } from '../../utils';
import {
  GetAllEntiGestoreProgettoDetail,
  GetAllEntiPartnerDetail,
  GetAllSediDetail,
} from '../../../../../../redux/features/areaAmministrativa/detail/detailThunk';
import { CardStatusAction } from '../../../../../../components';
import { useNavigate } from 'react-router-dom';

const ItemsList = () => {
  const dispatch = useDispatch();
  const list = useAppSelector(selectListData);
  const listToShow = useAppSelector(selectDataToShow);
  const navigate = useNavigate();

  useEffect(() => {
    switch (listToShow) {
      case formTypes.ENTI_PARTNER:
        dispatch(GetAllEntiPartnerDetail('project1'));
        break;
      case formTypes.ENTI_GESTORE_PROGETTO:
        dispatch(GetAllEntiGestoreProgettoDetail('project1'));
        break;
      case formTypes.SEDI:
        dispatch(GetAllSediDetail('project1', 'prova'));
    }
  }, [listToShow]);

  const redirect = useCallback((id) => {
    navigate(`${id}`);
  }, []);

  return (
    <div>
      {list?.map((item, key: number) => (
        <CardStatusAction
          actionButtons
          title={item?.name}
          key={key}
          viewItemAction={() => {
            redirect(item?.id);
          }}
          status={item?.status}
        />
      ))}
    </div>
  );
};

export default ItemsList;
