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
import { statusColor, statusBgColor, TableHeadingEntities } from '../utils';

import GenericSearchFilterTableLayout, {
  SearchInformationI,
} from '../../../../../components/genericSearchFilterTableLayout/genericSearchFilterTableLayout';
import {
  TableActionsI,
  TableActionViewTypes,
} from '../../../../../utils/common';
import { formFieldI } from '../../../../../utils/formHelper';
import { openModal } from '../../../../../redux/features/modal/modalSlice';
import ManageEntiGeneric from '../Programmi/manageEntiGeneric/manageEntiGeneric';

const entity = 'enti';
const profileDropdownLabel = 'profile';
const programDropdownLabel = 'program';
const projectDropdownLabel = 'project';
const statusDropdownLabel = 'status';

const Enti = () => {
  const dispatch = useDispatch();
  const entiList = useAppSelector(selectEntityList);
  const filtersList = useAppSelector(selectEntityFilters);
  const pagination = useAppSelector(selectEntityPagination);
  const dropdownFilterOptions = useAppSelector(selectEntityFiltersOptions);
  const [searchDropdown, setSearchDropdown] = useState<
    { filterId: string; value: formFieldI['value'] }[]
  >([]);

  useEffect(() => {
    dispatch(setEntityPagination({ pageSize: 3 }));
    dispatch(GetEntityFilterValues(entity, 'test', statusDropdownLabel));
    dispatch(GetEntityFilterValues(entity, 'test', programDropdownLabel));
    dispatch(GetEntityFilterValues(entity, 'test', projectDropdownLabel));
    dispatch(GetEntityFilterValues(entity, 'test', profileDropdownLabel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSearch = (searchValue: string) => {
    dispatch(
      setEntityFilters({ nomeLike: { label: searchValue, value: searchValue } })
    );
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

  const dropdowns: DropdownFilterI[] = [
    {
      filterName: 'Profilo',
      options: dropdownFilterOptions[profileDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, profileDropdownLabel),
      id: profileDropdownLabel,
      className: 'mr-3',
      values: filtersList[profileDropdownLabel],
      handleOnSearch: (searchKey) => {
        handleOnSearchDropdownOptions(searchKey, profileDropdownLabel);
      },
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === profileDropdownLabel
      )[0]?.value,
    },
    {
      filterName: 'Programma',
      options: dropdownFilterOptions[programDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, programDropdownLabel),
      id: programDropdownLabel,
      values: filtersList[programDropdownLabel],
      handleOnSearch: (searchKey) =>
        handleOnSearchDropdownOptions(searchKey, programDropdownLabel),
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === programDropdownLabel
      )[0]?.value,
      className: 'mr-3',
    },
    {
      filterName: 'Progetto',
      options: dropdownFilterOptions[projectDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, projectDropdownLabel),
      id: projectDropdownLabel,
      values: filtersList[projectDropdownLabel],
      handleOnSearch: (searchKey) =>
        handleOnSearchDropdownOptions(searchKey, projectDropdownLabel),
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === projectDropdownLabel
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

  const searchInformation: SearchInformationI = {
    autocomplete: false,
    onHandleSearch: handleOnSearch,
    placeholder:
      "Inserisci il nome, l'identificativo o il codice fiscale dell'ente che stai cercando",
    isClearable: true,
    title: 'Cerca ente',
  };

  const updateTableValues = () => {
    const table = newTable(
      TableHeadingEntities,
      entiList.map((td) => ({
        id: td.id,
        label: td.name,
        ref: td.ref,
        type: td.type,
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
  }, [entiList]);

  const getListaEnti = () => {
    dispatch(GetEntityValues({ entity }));
  };

  useEffect(() => {
    getListaEnti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList, pagination]);

  const handleOnChangePage = (pageNumber: number = pagination?.pageNumber) => {
    dispatch(setEntityPagination({ pageNumber }));
  };

  const handleDropdownFilters = (values: FilterI[], filterKey: string) => {
    dispatch(setEntityFilters({ [filterKey]: [...values] }));
  };

  const onActionClick: TableActionsI = {
    [TableActionViewTypes.VIEW]: (td: TableRowI) => {
      console.log(td);
    },
  };

  const ctaEnti = {
    title: 'Area Amministrativa',
    subtitle:
      'Qui potrai gestire utenti, enti, programmi e progetti e creare i questionari',
    textCta: 'Crea nuovo ente',
    iconCta: 'it-plus',
  };

  const newEntePartner = () => {
    dispatch(
      openModal({
        id: 'ENTE',
        payload: {
          title: 'Crea un ente nuovo',
        },
      })
    );
  };

  return (
    <GenericSearchFilterTableLayout
      searchInformation={searchInformation}
      dropdowns={dropdowns}
      filtersList={filtersList}
      {...ctaEnti}
      cta={newEntePartner}
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
          total={entiList.length}
          onChange={handleOnChangePage}
        />
      </div>
      <ManageEntiGeneric creation withTwoColumns />
    </GenericSearchFilterTableLayout>
  );
};

export default Enti;
