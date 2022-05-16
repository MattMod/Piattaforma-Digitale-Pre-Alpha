import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GenericSearchFilterTableLayout, {
  SearchInformationI,
} from '../../../../../components/genericSearchFilterTableLayout/genericSearchFilterTableLayout';
import {
  selectEntityFilters,
  selectEntityFiltersOptions,
  selectEntityList,
  selectEntityPagination,
  setEntityFilters,
  setEntityPagination,
} from '../../../../../redux/features/areaCittadini/areaCittadiniSlice';
import {
  GetEntityFilterValues,
  GetEntityValues,
} from '../../../../../redux/features/areaCittadini/areaCittadiniThunk';
import { useAppSelector } from '../../../../../redux/hooks';
import { Paginator, Table } from '../../../../../components';
import {
  DropdownFilterI,
  FilterI,
} from '../../../../../components/DropdownFilter/dropdownFilter';
import { newTable, TableRowI } from '../../../../../components/Table/table';
import { statusBgColor, statusColor, TableHeading } from '../../utils';
import { Chip, ChipLabel } from 'design-react-kit';
import clsx from 'clsx';
import {
  TableActionsI,
  TableActionViewTypes,
} from '../../../../../utils/common';
import { formFieldI } from '../../../../../utils/formHelper';
import SearchCitizenModal from '../SearchCitizenModal/searchCitizenModal';
import { openModal } from '../../../../../redux/features/modal/modalSlice';

const entity = 'areaCittadini';
const policyDropdownLabel = 'policy';
const programDropdownLabel = 'program';
const projectDropdownLabel = 'project';
const siteDropdownLabel = 'site';

const Cittadini = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchDropdown, setSearchDropdown] = useState<
    { filterId: string; value: formFieldI['value'] }[]
  >([]);

  const filtersList = useAppSelector(selectEntityFilters);
  const pagination = useAppSelector(selectEntityPagination);
  const cittadiniList = useAppSelector(selectEntityList);
  const dropdownFilterOptions = useAppSelector(selectEntityFiltersOptions);

  const handleOnSearch = (searchValue: string) => {
    dispatch(
      setEntityFilters({ nomeLike: { label: searchValue, value: searchValue } })
    );
  };

  useEffect(() => {
    getListaCittadini();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList, pagination]);

  useEffect(() => {
    dispatch(setEntityPagination({ pageSize: 3 }));
    dispatch(GetEntityFilterValues('test', policyDropdownLabel));
    dispatch(GetEntityFilterValues('test', programDropdownLabel));
    dispatch(GetEntityFilterValues('test', projectDropdownLabel));
    dispatch(GetEntityFilterValues('test', siteDropdownLabel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListaCittadini = () => {
    dispatch(GetEntityValues({ entity }));
  };

  const handleOnSearchDropdownOptions = (
    searchValue: formFieldI['value'],
    filterId: string
  ) => {
    const searchDropdownValues = [...searchDropdown];
    if (
      searchDropdownValues?.length > 0 &&
      searchDropdownValues?.findIndex((f) => f.filterId === filterId) !== -1
    ) {
      searchDropdownValues[
        searchDropdownValues.findIndex((f) => f.filterId === filterId)
      ].value = searchValue;
    } else {
      searchDropdownValues.push({ filterId: filterId, value: searchValue });
    }
    setSearchDropdown(searchDropdownValues);
    dispatch(
      GetEntityFilterValues('test', filterId, {
        filterName: searchValue,
      })
    ); // esempio di parametro con cui filtrare le opzioni tramite api
  };

  const handleOnChangePage = (pageNumber: number = pagination?.pageNumber) => {
    dispatch(setEntityPagination({ pageNumber }));
  };

  const searchInformation: SearchInformationI = {
    autocomplete: false,
    onHandleSearch: handleOnSearch,
    placeholder: 'Inserisci il codice fiscale del cittadino che stai cercando',
    isClearable: true,
    title: 'Cerca cittadino',
  };

  const dropdowns: DropdownFilterI[] = [
    {
      filterName: 'Policy',
      options: dropdownFilterOptions[policyDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, policyDropdownLabel),
      id: policyDropdownLabel,
      className: 'mr-3',
      values: filtersList[policyDropdownLabel],
      handleOnSearch: (searchKey) => {
        handleOnSearchDropdownOptions(searchKey, policyDropdownLabel);
      },
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === policyDropdownLabel
      )[0]?.value,
    },
    {
      filterName: 'Programma',
      options: dropdownFilterOptions[programDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, programDropdownLabel),
      id: programDropdownLabel,
      className: 'mr-3',
      values: filtersList[programDropdownLabel],
      handleOnSearch: (searchKey) => {
        handleOnSearchDropdownOptions(searchKey, programDropdownLabel);
      },
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === programDropdownLabel
      )[0]?.value,
    },
    {
      filterName: 'Progetto',
      options: dropdownFilterOptions[projectDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, projectDropdownLabel),
      id: policyDropdownLabel,
      className: 'mr-3',
      values: filtersList[projectDropdownLabel],
      handleOnSearch: (searchKey) => {
        handleOnSearchDropdownOptions(searchKey, projectDropdownLabel);
      },
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === projectDropdownLabel
      )[0]?.value,
    },
    {
      filterName: 'Sede',
      options: dropdownFilterOptions[siteDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, siteDropdownLabel),
      id: siteDropdownLabel,
      values: filtersList[siteDropdownLabel],
      handleOnSearch: (searchKey) => {
        handleOnSearchDropdownOptions(searchKey, siteDropdownLabel);
      },
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === siteDropdownLabel
      )[0]?.value,
    },
  ];

  const handleDropdownFilters = (values: FilterI[], filterKey: string) => {
    dispatch(setEntityFilters({ [filterKey]: [...values] }));
  };

  const updateTableValues = () => {
    const table = newTable(
      TableHeading,
      cittadiniList.map((td) => ({
        id: td.id,
        name: td.name,
        submitted: td.submitted,
        onDraft: td.onDraft,
        status: (
          <Chip
            className={clsx(
              'table-container__status-label',
              statusBgColor(td.status)
            )}
          >
            <ChipLabel className={statusColor(td.status)}>
              {td.status.toUpperCase()}
            </ChipLabel>
          </Chip>
        ),
      }))
    );
    return {
      ...table,
      // TODO remove slice after BE integration
      values: table.values.slice(
        pagination?.pageNumber * pagination?.pageSize - pagination?.pageSize,
        pagination?.pageNumber * pagination?.pageSize
      ),
    };
  };

  const [tableValues, setTableValues] = useState(updateTableValues());

  useEffect(() => {
    setTableValues(updateTableValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cittadiniList]);

  const onActionClick: TableActionsI = {
    [TableActionViewTypes.CREATE]: (td: TableRowI) => {
      console.log(td);
    },
    [TableActionViewTypes.VIEW]: (td: TableRowI) => {
      navigate(`${td.id}`);
    },
    [TableActionViewTypes.EDIT]: (td: TableRowI) => {
      console.log(td);
    },
    [TableActionViewTypes.DELETE]: (td: TableRowI) => {
      console.log(td);
    },
  };

  const PageTitleMock: {
    title: string;
    subtitle: string;
    textCta: string;
    iconCta: string;
  } = {
    title: 'Area Cittadini',
    subtitle:
      'Qui puoi consultare la lista dei cittadini e i questionari da compilare e già completati',
    textCta: 'Compila un nuovo questionario',
    iconCta: 'it-plus',
  };

  return (
    <GenericSearchFilterTableLayout
      searchInformation={searchInformation}
      dropdowns={dropdowns}
      filtersList={filtersList}
      genericSearch={{
        text: 'Cerca tra tutti i Cittadini',
        icon: 'it-user',
        onClick: useCallback(() => {
          dispatch(
            openModal({
              id: 'search-citizen-modal',
            })
          );
          console.log('cerca cittadini cliccato');
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []),
      }}
      cta={() => console.log('modale cittadino')}
      {...PageTitleMock}
    >
      <div>
        <Table
          {...tableValues}
          id='table'
          //onActionClick={(action, row) => console.log(action, row)}
          onCellClick={(field, row) => console.log(field, row)}
          //onRowClick={row => console.log(row)}
          withActions
          onActionClick={onActionClick}
        />
        <Paginator
          activePage={pagination?.pageNumber}
          center
          refID='#table'
          pageSize={pagination?.pageSize}
          total={cittadiniList.length}
          onChange={handleOnChangePage}
        />
      </div>
      <SearchCitizenModal />
    </GenericSearchFilterTableLayout>
  );
};

export default Cittadini;
