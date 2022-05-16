import React, { ReactElement, useEffect, useState } from 'react';
import { DropdownFilterI, FilterI } from '../DropdownFilter/dropdownFilter';
import { DropdownFilter, SearchBar } from '../index';
import { Button, Chip, ChipLabel, Icon } from 'design-react-kit';
import { cleanEntityFilters } from '../../redux/features/areaAmministrativa/areaAmministrativaSlice';
import { useDispatch } from 'react-redux';
//import Sidebar, { SidebarI } from './sidebar';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface SearchInformationI {
  onHandleSearch?: (searchValue: string) => void;
  placeholder: string;
  title: string;
  autocomplete: boolean;
  isClearable: boolean;
}

interface GenericSearchI {
  text: string;
  icon: string;
  onClick: () => void;
}

interface GenericSearchFilterTableLayoutI {
  dropdowns?: DropdownFilterI[];
  searchInformation: SearchInformationI;
  Sidebar?: ReactElement;
  showButtons?: boolean;
  filtersList?: any;
  genericSearch?: GenericSearchI;
  rolesLayout?: boolean;
  cta?: () => void;
  ctaHref?: string;
  textCta?: string;
  iconCta?: string;
}

const GenericSearchFilterTableLayout: React.FC<
  GenericSearchFilterTableLayoutI
> = ({
  dropdowns,
  searchInformation,
  Sidebar,
  showButtons = true,
  filtersList,
  genericSearch,
  rolesLayout = false,
  children,
  cta,
  ctaHref,
  textCta,
  iconCta,
}) => {
  const dispatch = useDispatch();
  const [showChips, setShowChips] = useState<boolean>(false);

  const getLabelsChips = (filter: any, i: number, filterKey: string) => {
    if (filter?.value) {
      return (
        <Chip key={i} className='mr-2'>
          <ChipLabel className='px-1'>{filter.label}</ChipLabel>
          <Button
            close
            onClick={() => {
              console.log('clean entity filters');
              dispatch(cleanEntityFilters({ filterKey, value: filter.value }));
            }}
          >
            <Icon icon='it-close' />
          </Button>
        </Chip>
      );
    } else if (filter?.length > 0) {
      return (
        <>
          {filter.map((f: FilterI, j: number) => (
            <Chip key={i + '-' + j} className='mr-2'>
              <ChipLabel className='mx-3 my-2'>{f.label}</ChipLabel>
              <Button
                close
                onClick={() => {
                  console.log('sono il clean entity filters');
                  dispatch(cleanEntityFilters({ filterKey, value: f.value }));
                }}
              >
                <Icon icon='it-close' />
              </Button>
            </Chip>
          ))}
        </>
      );
    }
  };
  useEffect(() => {
    if (dropdowns?.length && filtersList && Object.keys(filtersList).length) {
      setShowChips(true);
    } else {
      setShowChips(false);
    }
  }, [dropdowns, filtersList]);

  const { t } = useTranslation();

  return (
    <>
      <div className={genericSearch ? 'd-flex justify-content-end' : ''}>
        {genericSearch && (
          <Button
            onClick={genericSearch.onClick}
            className='primary-color-b1 d-flex flex-row justify-content-center align-items-center'
          >
            <span className='mr-4'>{genericSearch.text}</span>
            <div className='header-container__icon-container primary-bg-b1'>
              <Icon icon={genericSearch.icon} color='white' size='sm' />
            </div>
          </Button>
        )}
      </div>
      <div className='d-flex justify-content-between align-items-center mt-2 mb-3'>
        {searchInformation?.onHandleSearch && (
          <div className='flex-grow-1'>
            <div
              className={clsx(
                genericSearch && 'w-75',
                rolesLayout &&
                  'd-flex flex-row justify-content-between align-items-end'
              )}
              data-testid='create-new-element'
            >
              <SearchBar
                autocomplete={searchInformation.autocomplete}
                onSubmit={searchInformation.onHandleSearch}
                placeholder={searchInformation.placeholder}
                isClearable={searchInformation.isClearable}
                title={searchInformation.title}
                className={clsx(rolesLayout && 'w-75')}
              />
              {rolesLayout && (
                <Button
                  color='primary'
                  size='xs'
                  className='mb-5'
                  onClick={() => console.log('open create new role')}
                >
                  <Icon
                    color='orange'
                    icon='it-plus'
                    className='mr-2'
                    size='sm'
                  />
                  {t('Aggiungi ruolo')}
                </Button>
              )}
            </div>
          </div>
        )}
        <div className='cta-container ml-auto'>
          {cta ? (
            <Button
              color='primary'
              icon
              className='page-title__cta'
              onClick={cta}
            >
              {iconCta ? (
                <Icon color='white' icon={iconCta} className='mr-2' />
              ) : null}
              {textCta}
            </Button>
          ) : ctaHref ? (
            <NavLink color='primary' className='page-title__cta' to={ctaHref}>
              {iconCta ? (
                <Icon color='white' icon={iconCta} className='mr-2' />
              ) : null}
              {textCta}
            </NavLink>
          ) : null}
        </div>
      </div>

      {dropdowns?.length && (
        <div className='d-flex flex-row pt-5'>
          {dropdowns.map((dropdown, index) => (
            <DropdownFilter
              key={index}
              filterName={dropdown.filterName || ''}
              {...dropdown}
            />
          ))}
        </div>
      )}
      <div
        className={
          showChips && showButtons
            ? 'd-flex justify-content-between align-items-baseline'
            : showChips && !showButtons
            ? 'd-flex justify-content-start align-items-baseline'
            : 'd-flex justify-content-end align-items-baseline'
        }
      >
        {showChips ? (
          <div className='d-flex flex-row mt-4 mb-4'>
            {Object.keys(filtersList).map((filterKey, index) => (
              <>{getLabelsChips(filtersList[filterKey], index, filterKey)}</>
            ))}
          </div>
        ) : null}
        {showButtons ? (
          <div className='d-flex justify-content-end'>
            <Button
              onClick={() => {
                console.log('download');
              }}
              className='primary-color-b1 d-flex flex-row justify-content-center align-items-center'
            >
              <div>
                <Icon icon='it-download' color='primary' size='sm' />
              </div>
              <span className='ml-4'>{t('download_list')}</span>
            </Button>
          </div>
        ) : null}
      </div>
      {Sidebar ? (
        <div className='d-flex'>
          {Sidebar}
          <div className='w-75'>{children}</div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

export default GenericSearchFilterTableLayout;
