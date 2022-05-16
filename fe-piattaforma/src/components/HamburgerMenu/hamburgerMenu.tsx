import clsx from 'clsx';
import { Icon, Navbar, NavLink } from 'design-react-kit';
import React from 'react';
import LogoScrittaBlu from '../../../public/assets/img/LogoScrittaBlu.png';
import ClickOutside from '../../hoc/ClickOutside';
import './hamburgerMenu.scss';

interface HBMenuProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const HamburgerMenu: React.FC<HBMenuProps> = (props) => {
  const { open, setOpen } = props;

  const backLink = [
    {
      path: '/area-amministrativa',
      title: 'Home',
    },
    {
      path: '/area-amministrativa',
      title: 'Area amministrativa',
    },
    {
      path: '/area-cittadini',
      title: 'Area Cittadini',
    },
    {
      path: '/area-amministrativa/bacheca-digitale',
      title: 'Dashboard',
    },
    {
      path: '/area-amministrativa/bacheca-digitale',
      title: 'Community',
    },
    {
      path: '/area-amministrativa/bacheca-digitale',
      title: 'Bacheca digitale',
    },

    {
      path: '/area-amministrativa/bacheca-digitale',
      title: 'Documenti',
    },
  ];

  return (
    <ClickOutside callback={() => setOpen(false)}>
      <Navbar className='hamburger_nav mr-2'>
        <ul className={`menuNav ${open ? 'showMenu' : ''}`}>
          <NavLink onClick={() => setOpen(false)} className='px-0 py-0'>
            <div
              className={clsx(
                'd-flex',
                'align-items-row',
                'justify-content-center',
                'primary-bg-a6',
                'pt-3'
              )}
            >
              <div
                className={clsx(
                  'rounded-circle',
                  'bg-white',
                  'd-flex',
                  'align-items-center',
                  'justify-content-center',
                  'mr-3',
                  'mt-2'
                )}
                style={{ height: '38px', width: '38px' }}
              >
                <Icon className='m-0 primary-color' icon='it-user' size='sm' />
              </div>
              <div className='d-inline-flex flex-column align-items-start'>
                <h6 className='m-0 text-sans-serif text-white'>Mario Rossi</h6>
                <p className='text-white font-weight-light'>I tuoi dati</p>
              </div>
            </div>

            <div className='py-3 d-flex flex-direction-row justify-content-between'>
              <img
                src={LogoScrittaBlu}
                alt='logo'
                className='border-bottom border-primary pl-4 pb-2 ml-2'
              />
              <Icon
                icon='it-close'
                size='sm'
                color='white'
                className='rounded-circle mr-3 mt-2 close_nav'
              />
            </div>
            {backLink.map((link) => {
              return (
                <li key={link.title}>
                  <a href={link.path}> {link.title} </a>
                </li>
              );
            })}
          </NavLink>
        </ul>
      </Navbar>
    </ClickOutside>
  );
};

export default HamburgerMenu;
