import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Chip, ChipLabel } from 'design-react-kit';
import clsx from 'clsx';
import { Paginator, Table } from '../../../../../components';
import { newTable, TableRowI } from '../../../../../components/Table/table';
import {
  GetEntityFilterValues,
  GetEntityValues,
} from '../../../../../redux/features/areaAmministrativa/areaAmministrativaThunk';
import { useAppSelector } from '../../../../../redux/hooks';
import {
  selectEntityFilters,
  selectEntityFiltersOptions,
  selectEntityList,
  selectEntityPagination,
  setEntityFilters,
  setEntityPagination,
} from '../../../../../redux/features/areaAmministrativa/areaAmministrativaSlice';
import {
  DropdownFilterI,
  FilterI,
} from '../../../../../components/DropdownFilter/dropdownFilter';
import { statusColor, statusBgColor, TableHeadingUsers } from '../utils';

import GenericSearchFilterTableLayout, {
  SearchInformationI,
} from '../../../../../components/genericSearchFilterTableLayout/genericSearchFilterTableLayout';
import {
  TableActionsI,
  TableActionViewTypes,
} from '../../../../../utils/common';
import { formFieldI } from '../../../../../utils/formHelper';
import { openModal } from '../../../../../redux/features/modal/modalSlice';
import ManageUsers from '../Programmi/manageUsers/manageUsers';

const entity = 'utenti';
const roleDropdownLabel = 'role';
const statusDropdownLabel = 'status';

const Utenti = () => {
  const dispatch = useDispatch();
  const utentiList = useAppSelector(selectEntityList);
  const filtersList = useAppSelector(selectEntityFilters);
  const pagination = useAppSelector(selectEntityPagination);
  const dropdownFilterOptions = useAppSelector(selectEntityFiltersOptions);
  const [searchDropdown, setSearchDropdown] = useState<
    { filterId: string; value: formFieldI['value'] }[]
  >([]);

  const getListaUtenti = () => {
    dispatch(GetEntityValues({ entity }));
  };

  useEffect(() => {
    setTableValues(updateTableValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [utentiList]);

  useEffect(() => {
    getListaUtenti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList, pagination]);

  useEffect(() => {
    dispatch(setEntityPagination({ pageSize: 3 }));
    dispatch(GetEntityFilterValues(entity, 'test', statusDropdownLabel));
    dispatch(GetEntityFilterValues(entity, 'test', roleDropdownLabel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const updateTableValues = () => {
    const table = newTable(
      TableHeadingUsers,
      utentiList.map((td) => ({
        id: td.id,
        label: td.name,
        role: td.role,
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

  const handleOnChangePage = (pageNumber: number = pagination?.pageNumber) => {
    dispatch(setEntityPagination({ pageNumber }));
  };

  const handleDropdownFilters = (values: FilterI[], filterKey: string) => {
    dispatch(setEntityFilters({ [filterKey]: [...values] }));
  };
  const handleOnSearch = (searchValue: string) => {
    dispatch(
      setEntityFilters({ nomeLike: { label: searchValue, value: searchValue } })
    );
  };

  const searchInformation: SearchInformationI = {
    autocomplete: false,
    onHandleSearch: handleOnSearch,
    placeholder:
      "Inserisci il nome, il cognome, l'identificativo o il codice fiscale dell'utente che stai cercando",
    isClearable: true,
    title: 'Cerca utente',
  };

  const dropdowns: DropdownFilterI[] = [
    {
      filterName: 'Ruoli',
      options: dropdownFilterOptions[roleDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, roleDropdownLabel),
      id: roleDropdownLabel,
      values: filtersList[roleDropdownLabel],
      handleOnSearch: (searchKey) =>
        handleOnSearchDropdownOptions(searchKey, roleDropdownLabel),
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === roleDropdownLabel
      )[0]?.value,
      className: 'mr-3',
    },
    {
      filterName: 'Stati',
      options: dropdownFilterOptions[statusDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, statusDropdownLabel),
      id: statusDropdownLabel,
      values: filtersList[statusDropdownLabel],
      handleOnSearch: (searchKey) =>
        handleOnSearchDropdownOptions(searchKey, statusDropdownLabel),
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === statusDropdownLabel
      )[0]?.value,
    },
  ];

  const onActionClick: TableActionsI = {
    [TableActionViewTypes.VIEW]: (td: TableRowI) => {
      console.log(td);
    },
  };

  const newUtente = () => {
    dispatch(
      openModal({
        id: 'utenti',
        payload: {
          title: 'Crea un nuovo utente',
        },
      })
    );
  };

  const userCta = {
    title: 'Area Amministrativa',
    subtitle:
      'Qui potrai gestire utenti, enti, programmi e progetti e creare i questionari',
    textCta: 'Crea nuovo utente',
    iconCta: 'it-plus',
  };

  return (
    <GenericSearchFilterTableLayout
      searchInformation={searchInformation}
      dropdowns={dropdowns}
      filtersList={filtersList}
      {...userCta}
      cta={newUtente}
    >
      <div>
        <Table
          {...tableValues}
          id='table'
          onActionClick={onActionClick}
          onCellClick={(field, row) => console.log(field, row)}
          //onRowClick={row => console.log(row)}
          withActions
        />
        <Paginator
          activePage={pagination?.pageNumber}
          center
          refID='#table'
          pageSize={pagination?.pageSize}
          total={utentiList.length}
          onChange={handleOnChangePage}
        />
      </div>
      <ManageUsers withTwoColumns creation />
    </GenericSearchFilterTableLayout>
  );
};

export default Utenti;
