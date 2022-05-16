import clsx from 'clsx';
import {
  Button,
  DropdownMenu,
  DropdownToggle,
  Icon,
  LinkList,
  LinkListItem,
  UncontrolledDropdown,
} from 'design-react-kit';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';

interface MenuItem {
  label: string;
  path: string;
  id: string;
  subRoutes: SubRoutes[];
}

interface SubRoutes {
  label: string;
  path: string;
}

const MenuMock = [
  {
    label: 'Area amministrativa',
    path: '/area-amministrativa',
    id: 'tab-admin',
    subRoutes: [
      {
        label: 'Programmi',
        path: '/area-amministrativa/programmi',
      },
      {
        label: 'Progetti',
        path: '/area-amministrativa/progetti',
      },
      {
        label: 'Enti',
        path: '/area-amministrativa/enti',
      },
      {
        label: 'Utenti',
        path: '/area-amministrativa/utenti',
      },
      {
        label: 'Questionari',
        path: '/area-amministrativa/questionari',
      },
    ],
  },
  {
    label: 'Area cittadini',
    path: '/area-cittadini',
    id: 'tab-citizen',
  },
  {
    label: 'Dashboard',
    path: '/dashboard',
    id: 'tab-dashboard',
  },
  {
    label: 'Community',
    path: '/community',
    id: 'tab-community',
  },
  {
    label: 'Bacheca digitale',
    path: '/bacheca-digitale',
    id: 'tab-bacheca-digitale',
  },
  {
    label: 'Documenti',
    path: '/documents',
    id: 'tab-documenti',
  },
];

interface HeaderMenuI {
  isHeaderFull: boolean;
}

const HeaderMenu: React.FC<HeaderMenuI> = (props) => {
  const { isHeaderFull } = props;
  const [activeTab, setActiveTab] = useState(
    MenuMock.find(({ path }) => window.location.pathname.includes(path))?.id ||
      MenuMock[0].id
  );
  const { t } = useTranslation();

  const navDropDown: React.FC<MenuItem> = (li) => {
    return (
      <>
        <UncontrolledDropdown inNavbar>
          <DropdownToggle
            nav
            caret
            className='text-white font-weight-semibold pb-2'
          >
            {li.label} <Icon icon='it-expand' size='sm' color='white' />
          </DropdownToggle>
          <DropdownMenu className=''>
            <LinkList className='navbar-dropdown'>
              <LinkListItem>
                {li.subRoutes.map((link: SubRoutes, index) => (
                  <NavLink
                    to={link.path}
                    className='primary-color-b1 py-2'
                    key={index}
                    onClick={() => setActiveTab(li.id)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </LinkListItem>
            </LinkList>
          </DropdownMenu>
        </UncontrolledDropdown>
        <div
          className={clsx(
            activeTab === li.id && 'bg-white header-menu-container__tab-bar',
            activeTab !== li.id &&
              'bg-transparent header-menu-container__tab-bar'
          )}
        />
      </>
    );
  };

  return (
    <nav
      className={clsx(
        'header-menu-container',
        'container',
        'text-white',
        !isHeaderFull && 'd-flex align-items-baseline'
      )}
      aria-label={t('site_navigation_bar')}
    >
      <ul className='d-flex align-items-end mb-0 '>
        {MenuMock?.length &&
          MenuMock.map((li) => (
            <li key={li.path} className='position-relative'>
              {li.subRoutes ? (
                navDropDown(li)
              ) : (
                <>
                  <h6>
                    <div>
                      <Link
                        to={li.path}
                        onClick={() => setActiveTab(li.id)}
                        className='text-white'
                      >
                        {li.label}
                      </Link>
                    </div>
                  </h6>
                  <div
                    className={clsx(
                      activeTab === li.id &&
                        'bg-white header-menu-container__tab-bar',
                      activeTab !== li.id &&
                        'bg-transparent header-menu-container__tab-bar'
                    )}
                  />
                </>
              )}
            </li>
          ))}
      </ul>
      {!isHeaderFull && (
        <Button className='p-0'>
          <div className='header-container__icon-container ml-2'>
            <Icon icon='it-search' color='white' size='xs' />
          </div>
        </Button>
      )}
    </nav>
  );
};

export default memo(HeaderMenu);
