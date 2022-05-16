import React, { memo, useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Icon,
  LinkList,
  LinkListItem,
} from 'design-react-kit';
import Logo from '/public/assets/img/logo.png';
import LogoSmall from '/public/assets/img/logo-small.png';

import { useTranslation } from 'react-i18next';
import { HeaderI } from '../header';
import { logout } from '../../../redux/features/user/userSlice';
import HeaderMenu from '../../HeaderMenu/headerMenu';

const HeaderMobile: React.FC<HeaderI> = ({
  isHeaderFull = true,
  dispatch,
  user,
  isLogged,
  notification,
}) => {
  const languages = ['ITA', 'ENG'];

  const [open, toggle] = useState(false);
  const [language, setLanguage] = useState(languages[0]);
  const { t } = useTranslation();
  const [openUser, setOpenUser] = useState<boolean>(false);

  const userDropdownOptions = [
    { optionName: 'Cambia ruolo', action: () => console.log('cambia ruolo') },
    { optionName: 'I tuoi dati', action: () => console.log('i tuoi dati') },
    { optionName: 'Logout', action: () => dispatch(logout()) },
  ];

  const userDropDown = () => (
    <Dropdown
      className='p-0 header-container__top__user-dropdown mr-4'
      isOpen={openUser}
      toggle={() => setOpenUser(!openUser)}
    >
      <DropdownToggle caret className='complementary-1-color-a1 shadow-none'>
        <div
          className={clsx(
            'header-container__top__user',
            'd-inline-flex',
            'align-items-center',
            'text.white',
            'primary-bg-b2'
          )}
        >
          <div
            className={clsx(
              'rounded-circle',
              'bg-white',
              'd-flex',
              'align-items-center',
              'justify-content-center',
              'mr-3'
            )}
            style={{ height: '38px', width: '38px' }}
          >
            <Icon className='m-0' icon='it-user' size='sm' />
          </div>
          <div className='d-inline-flex flex-column align-items-start'>
            <h6 className='m-0 text-sans-serif'>
              {user?.name}&nbsp;{user?.surname}
            </h6>
            <h6>{user?.role}</h6>
          </div>
        </div>
      </DropdownToggle>
      <DropdownMenu>
        <LinkList className='header-container__top__user-dropdown__option w-100'>
          {userDropdownOptions.map((item, index) => (
            <LinkListItem
              className='d-flex justify-content-between'
              onClick={item.action}
              key={index}
            >
              {item.optionName}
              <Icon icon='it-chevron-right' color='primary' size='sm' />
            </LinkListItem>
          ))}
        </LinkList>
      </DropdownMenu>
    </Dropdown>
  );

  return (
    <header
      className={clsx('header-container', isLogged && 'user-logged', 'w-100')}
    >
      <div
        className={clsx(
          'header-container__top',
          'd-flex',
          'align-items-center',
          isLogged ? 'text.white primary-bg-b2' : ''
        )}
      >
        <div className='container d-flex align-items-center my-0'>
          <div className='mr-auto'>
            {isHeaderFull ? (
              <h6 className='m-0'>Repubblica Digitale</h6>
            ) : (
              <img src={LogoSmall} alt='logo' />
            )}
          </div>
          <div
            className={clsx(
              'mr-2',
              'px-4',
              'border-left',
              'border-right',
              'd-inline-flex',
              'align-items-center',
              'primary-bg-b2',
              'header-panel-btn'
            )}
          >
            <Icon icon='it-settings' size='sm' color='white' />
            <h6 className='m-0 ml-2'> {t('profiling')} </h6>
          </div>
          <div>
            <Dropdown
              className={clsx(
                'mr-3',
                'd-flex',
                'header-panel-btn-small',
                'border-right',
                'header-panel-btn'
              )}
              isOpen={open}
              toggle={() => toggle(!open)}
            >
              <DropdownToggle
                caret
                className={clsx(
                  'primary-bg-b2',
                  'my-auto',
                  'complementary-1-color-a1',
                  'border-0 shadow-none'
                )}
                size='xs'
              >
                {language}
                <Icon
                  icon='it-expand'
                  size='sm'
                  className='color-white ml-2'
                  color='white'
                />
              </DropdownToggle>
              <DropdownMenu>
                <LinkList>
                  {languages.map((lang, i) => (
                    <LinkListItem onClick={() => setLanguage(lang)} key={i}>
                      {lang}
                    </LinkListItem>
                  ))}
                </LinkList>
              </DropdownMenu>
            </Dropdown>
          </div>

          {isLogged ? (
            <>
              {userDropDown()}

              <div className='mx-4'>
                <Icon color='white' icon='it-inbox' size='sm' />
                {notification?.length ? (
                  <Badge>{notification.length}</Badge>
                ) : null}
              </div>
            </>
          ) : (
            <div className='d-inline-flex align-items-center px-4'>
              <h6 className='m-0'>ITA</h6>
              <Icon color='white' icon='it-expand' size='sm' />
            </div>
          )}
        </div>
      </div>
      {isHeaderFull && (
        <div
          className={clsx(
            'header-container__main',
            'd-flex',
            'align-items-center',
            'w-100',
            'primary-bg'
          )}
        >
          <div className='container d-flex align-items-center'>
            <div
              className={clsx(
                'header-container__main__logo',
                'mr-auto',
                'pt-3',
                'pb-3'
              )}
            >
              <Link to='/'>
                <img src={Logo} alt='logo' />
              </Link>
            </div>
            {/* <div
              className={clsx(
                'header-container__main__social',
                'd-inline-flex',
                'align-items-center'
              )}
            >
              <span className='text-white mr-3'>Seguici su: </span>
              <Icon icon='it-github' size='sm' color='white' className='mx-2' />
              <Icon
                icon='it-twitter'
                size='sm'
                color='white'
                className='ml-1 mr-2'
              />
              <Icon
                icon='it-facebook'
                color='white'
                size='sm'
                className='ml-1 mr-2'
              />
            </div> */}
            {isLogged ? (
              <div className='header-container__main__search ml-auto'>
                {/* <SearchBox onClick={(v) => console.log('output:', v)} /> */}
                <Button
                  className={clsx(
                    'primary-color-b1',
                    'd-flex',
                    'flex-row',
                    'justify-content-center',
                    'align-items-center',
                    'ml-5'
                  )}
                >
                  <span className='mr-2'>Cerca</span>
                  <div className='header-container__icon-container bg-white ml-2'>
                    <Icon icon='it-search' color='primary' size='sm' />
                  </div>
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
      {isLogged ? (
        <div className='header-container__nav primary-bg pt-2'>
          <HeaderMenu isHeaderFull={isHeaderFull} />
        </div>
      ) : null}
    </header>
  );
};

export default memo(HeaderMobile);
