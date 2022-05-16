import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Button, Icon } from 'design-react-kit';
import AsyncSelect from 'react-select/async';
import { MultiValue, SingleValue } from 'react-select';
import { OptionType, SelectI } from '../Form/select';
import { Input } from '../index';
import { components, ControlProps } from 'react-select';

interface SearchBarI extends Omit<SelectI, 'onInputChange'> {
  autocomplete?: boolean;
  field?: string;
  filterOptions?: (inputValue: string) => Promise<OptionType[]>;
  minLength?: number;
  onInputChange?: (
    value:
      | SingleValue<OptionType | undefined>
      | MultiValue<OptionType | undefined>,
    field: string
  ) => void;
  onSubmit?: (search: string) => void;
  placeholder?: string;
  title?: string;
  className?: string;
  searchButton?: boolean;
  description?: string;
}

const SearchBar: React.FC<SearchBarI> = (props) => {
  const {
    autocomplete = false,
    className,
    field = 'searchBar',
    filterOptions,
    minLength = 3,
    onInputChange,
    onSubmit,
    placeholder = '',
    searchButton = false,
  } = props;
  const [selectedOption, setSelectedOption] = useState<
    SingleValue<OptionType | undefined> | MultiValue<OptionType | undefined>
  >();
  const [searchValue, setSearchValue] = useState<string>('');
  const [hasSearchValue, setHasSearchValue] = useState<boolean>(false);

  const handleInputChange = (newValue: string) => newValue.replace(/\W/g, '');

  const loadOptions = (inputValue: string) => {
    if (inputValue.length >= minLength && filterOptions) {
      return filterOptions(inputValue);
    }
    return inputValue;
  };

  useEffect(() => {
    if (onInputChange && selectedOption) onInputChange(selectedOption, field);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  const handleChange = (
    newValue:
      | SingleValue<OptionType | undefined>
      | MultiValue<OptionType | undefined>
  ) => {
    if (newValue) setSelectedOption(newValue || '');
  };

  const handleOnSubmit = () => {
    if (!autocomplete && onSubmit) {
      onSubmit(searchValue);
      setSearchValue(searchValue);
      setHasSearchValue(true);
    }
  };

  const clearSearch = () => {
    setSearchValue('');
    setHasSearchValue(false);
  };

  const AutocompleteDropdownIndicator = useCallback(
    (props) => (
      <components.DropdownIndicator {...props} className='p-0'>
        {searchButton ? (
          <Button onClick={handleOnSubmit} color='primary'>
            Cerca
          </Button>
        ) : (
          <Button onClick={handleOnSubmit}>
            <Icon icon='it-search' aria-hidden size='' color='primary' />
          </Button>
        )}
      </components.DropdownIndicator>
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ),
    []
  );

  const Control = ({ children, ...props }: ControlProps<any>) => {
    return (
      <components.Control {...props}>
        {hasSearchValue && (
          <Button
            onClick={clearSearch}
            className={clsx('border-0', 'p-0', 'py-2')}
          >
            <Icon
              icon='it-close-big'
              aria-hidden
              size='xs'
              color='primary'
            ></Icon>
          </Button>
        )}
        {children}
      </components.Control>
    );
  };

  return (
    <div className={className}>
      <div className={clsx('d-inline-flex', 'w-100', 'mb-1')}>
        {autocomplete ? (
          <AsyncSelect
            className={clsx('search-bar-container', 'w-100')}
            classNamePrefix='search-bar'
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            onInputChange={handleInputChange}
            onChange={handleChange}
            components={{
              DropdownIndicator: AutocompleteDropdownIndicator,
              IndicatorSeparator: null,
              Control,
            }}
          />
        ) : (
          <div className='input-group mb-3'>
            <div className='input-group-append input-button'>
              <Button
                onClick={clearSearch}
                className={clsx(
                  hasSearchValue && 'visible',
                  !hasSearchValue && 'invisible',
                  'border-0 px-0'
                )}
                id='button-addon1'
              >
                <Icon
                  icon='it-close-big'
                  aria-hidden
                  size='xs'
                  color='primary'
                ></Icon>
              </Button>
            </div>
            <Input
              addon
              className={clsx(
                'mb-0',
                'input-border',
                'input-search',
                hasSearchValue && 'input-text-bold'
              )}
              col='col-9'
              field='search'
              onInputChange={(search) =>
                setSearchValue((search || '').toString())
              }
              placeholder={placeholder}
              value={searchValue}
              withLabel={false}
            />
            <div className='input-group-append input-button'>
              {searchButton ? (
                <Button
                  className='border-0'
                  onClick={handleOnSubmit}
                  color='primary'
                >
                  Cerca
                </Button>
              ) : (
                <Button className='ml-4 border-0' onClick={handleOnSubmit}>
                  <Icon icon='it-search' aria-hidden size='' color='primary' />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
