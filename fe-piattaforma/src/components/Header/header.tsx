import React, { memo } from 'react';
import { useAppSelector } from '../../redux/hooks';
import {
  selectUserNotification,
  selectUser,
} from '../../redux/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { selectDevice } from '../../redux/features/app/appSlice';
import HeaderMobile from './view/headerMobile';
import HeaderDesktop from './view/headerDesktop';
import { BreadcrumbI } from '../Breadcrumb/breadCrumb';

export interface HeaderI {
  isHeaderFull?: boolean | undefined;
  dispatch: (payload: unknown) => void;
  user: { name: string; surname: string; role: string } | undefined;
  isLogged: boolean;
  notification?: [] | undefined;
}

export interface HeaderProp {
  isHeaderFull?: boolean;
  breadcrumbArray: BreadcrumbI[] | undefined;
}

const Header: React.FC<HeaderProp> = (props) => {
  const { isHeaderFull, breadcrumbArray } = props;

  const isLogged = useAppSelector((state) => state.user.isLogged);
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  const notification = useAppSelector(selectUserNotification);

  const device = useAppSelector(selectDevice);

  const componentProps = {
    notification,
    isLogged,
    user,
    dispatch,
    isHeaderFull,
    breadcrumbArray,
  };

  if (device?.mediaIsPhone) {
    return <HeaderMobile {...componentProps} />;
  }
  return <HeaderDesktop {...componentProps} />;
};
export default memo(Header);
