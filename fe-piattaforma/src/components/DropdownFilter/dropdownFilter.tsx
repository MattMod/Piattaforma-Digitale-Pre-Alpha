import { Button, FormGroup, Icon, Label, Popover } from 'design-react-kit';
import React, { memo, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Form, Input } from '../index';
import { focusId } from '../../utils/common';
import { formFieldI } from '../../utils/formHelper';

export interface FilterI {
  label: string;
  value: string | number | any[];
}

export interface DropdownFilterI {
  filterName?: string;
  options: FilterI[] | undefined;
  onOptionsChecked?: ((value: FilterI[]) => void) | undefined;
  values?: FilterI[] | undefined;
  className?: string;
  id: string;
  handleOnSearch?: (searchKey: formFieldI['value']) => void;
  valueSearch?: formFieldI['value'] | undefined;
}

const DropdownFilter: React.FC<DropdownFilterI> = (props) => {
  const {
    filterName,
    options,
    onOptionsChecked,
    values = [],
    className,
    id,
    handleOnSearch,
    valueSearch,
  } = props;
  const [open, setOpen] = useState(false);
  const [checkedOptions, setCheckedOptions] = useState<FilterI[]>([]);
  const idListOptions = 'filter-options-list';
  const popoverRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (open) {
      focusId(idListOptions, false);
    }
  }, [open]);

  useEffect(() => {
    if (values?.length !== checkedOptions?.length) {
      if (values === null) setCheckedOptions([]);
      else setCheckedOptions(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (onOptionsChecked) onOptionsChecked(checkedOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedOptions]);

  // document.getElementById('aria-live-results').innerHTML = String(options?.length) || '0'; // TODO: aria-live in home dove iniettare risultati dropdown che poi leggere all'utente
  // TODO accessibilità: fixa tab quando si esce dal popover

  const handleOnChange = (filter: FilterI, val: formFieldI['value']) => {
    let checkedArray = [...checkedOptions];
    if (Array.isArray(checkedArray)) {
      if (val !== '') {
        if (val && checkedOptions.filter((f) => f.value !== filter.value)) {
          checkedArray.push(filter);
        } else {
          checkedArray = [
            ...checkedArray.filter((f) => f.value !== filter.value),
          ];
        }
      }
    }
    if (checkedArray.length !== checkedOptions.length) {
      setCheckedOptions(checkedArray.filter((v, i, a) => a.indexOf(v) === i));
    }
  };

  return (
    <div className={clsx('dropdown-filter-container mr-4', className)}>
      <Button
        color='primary'
        outline
        onClick={() => setOpen(!open)}
        className='d-flex flex-row justify-content-between w-100'
        id={'filter-' + filterName}
        innerRef={popoverRef}
        aria-controls='popover-filter-options'
      >
        {filterName} <Icon color='primary' icon='it-expand' size='sm' />
      </Button>
      <Popover
        isOpen={open}
        placement='bottom'
        target={popoverRef}
        className='dropdown-filter-container__popover'
        toogle={() => setOpen(!open)}
        id='popover-filter-options'
        aria-describedby={t(
          'tooltip_formed_by_search_bar_and_checkboxed_options'
        )}
      >
        {options?.length && options?.length > 5 && (
          <div className='border-bottom d-flex flex-row'>
            <Icon color='primary' icon='it-search' size='' />
            <fieldset>
              <legend className='dropdown-filter-container__search-tooltip'>
                <Input
                  id='search-tooltip'
                  aria-labelledby='search-input'
                  field=''
                  bsSize='sm'
                  placeholder='Cerca'
                  className='shadow-none border-bottom-0'
                  onInputChange={handleOnSearch}
                  value={
                    valueSearch && typeof valueSearch === 'string'
                      ? valueSearch
                      : ''
                  }
                  aria-controls='filter-options-list'
                />
              </legend>
            </fieldset>
          </div>
        )}
        <Form>
          <ul
            id={idListOptions}
            tabIndex={0}
            role='listbox'
            aria-labelledby='filter-options-list'
            aria-multiselectable='true'
            className='dropdown-filter-container__list'
          >
            {(options || []).map((opt, index) => (
              <li
                key={'option' + index}
                id={'group-checkbox-' + id + '-' + index}
                role='option'
                aria-selected='false'
              >
                <FormGroup check className='form-check-group shadow-none'>
                  <Input
                    id={'group-checkbox-' + id + '-' + index}
                    field=''
                    label={opt.label}
                    type='checkbox'
                    checked={
                      !!checkedOptions.filter((f) => f.value === opt.value)
                        .length
                    }
                    withLabel={false}
                    onInputChange={(checked) => {
                      handleOnChange(opt, checked);
                    }}
                    className='dropdown-filter-container__input'
                  />
                  <Label
                    for={'group-checkbox-' + id + '-' + index}
                    check
                    className='primary-color-b1'
                  >
                    {opt.label}
                  </Label>
                </FormGroup>
              </li>
            ))}
          </ul>
        </Form>
      </Popover>
    </div>
  );
};

export default memo(
  DropdownFilter,
  (prevProps, currentProps) =>
    JSON.stringify(prevProps) === JSON.stringify(currentProps)
);
