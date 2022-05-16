import React, { useEffect, useState } from 'react';
import {
  GetEntityFilterValues,
  GetEntityValues,
} from '../../../../../redux/features/areaAmministrativa/areaAmministrativaThunk';
import { statusColor, statusBgColor, TableHeading, formTypes } from '../utils';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../redux/hooks';
import {
  selectEntityFilters,
  selectEntityFiltersOptions,
  selectEntityList,
  selectEntityPagination,
  setEntityFilters,
  setEntityPagination,
} from '../../../../../redux/features/areaAmministrativa/areaAmministrativaSlice';
import { newTable, TableRowI } from '../../../../../components/Table/table';
import { Chip, ChipLabel } from 'design-react-kit';
import clsx from 'clsx';
import {
  DropdownFilterI,
  FilterI,
} from '../../../../../components/DropdownFilter/dropdownFilter';
import GenericSearchFilterTableLayout, {
  SearchInformationI,
} from '../../../../../components/genericSearchFilterTableLayout/genericSearchFilterTableLayout';
import { Paginator, Table } from '../../../../../components';
import {
  TableActionsI,
  TableActionViewTypes,
} from '../../../../../utils/common';
import { formFieldI } from '../../../../../utils/formHelper';
import { openModal } from '../../../../../redux/features/modal/modalSlice';
import ManageProject from '../Programmi/manageProject/manageProject';

const statusDropdownLabel = 'status';
const policyDropdownLabel = 'policy';
const programDropdownLabel = 'program';
const entity = 'progetti';

const Progetti: React.FC = () => {
  const dispatch = useDispatch();
  const progettiList = useAppSelector(selectEntityList);
  const filtersList = useAppSelector(selectEntityFilters);
  const pagination = useAppSelector(selectEntityPagination);
  const dropdownFilterOptions = useAppSelector(selectEntityFiltersOptions);
  const [searchDropdown, setSearchDropdown] = useState<
    { filterId: string; value: formFieldI['value'] }[]
  >([]);

  useEffect(() => {
    dispatch(setEntityPagination({ pageSize: 2 }));
    dispatch(GetEntityFilterValues(entity, 'test', statusDropdownLabel));
    dispatch(GetEntityFilterValues(entity, 'test', programDropdownLabel));
    dispatch(GetEntityFilterValues(entity, 'test', policyDropdownLabel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTableValues = () => {
    const table = newTable(
      TableHeading,
      progettiList.map((td) => ({
        id: td.id,
        label: td.name,
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
  }, [progettiList]);

  const getListaProgetti = () => {
    dispatch(GetEntityValues({ entity }));
  };

  const getProgrammiDropdown = () => {
    dispatch(GetEntityFilterValues(entity, 'test', programDropdownLabel));
  };

  useEffect(() => {
    getProgrammiDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListaProgetti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList, pagination]);

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
      GetEntityFilterValues(entity, 'test', filterId, {
        filterName: searchValue,
      })
    ); // esempio di parametro con cui filtrare le opzioni tramite api
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
      filterName: 'Stati',
      options: dropdownFilterOptions[statusDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, statusDropdownLabel),
      id: statusDropdownLabel,
      className: 'mr-3',
      values: filtersList[statusDropdownLabel],
      handleOnSearch: (searchKey) => {
        handleOnSearchDropdownOptions(searchKey, statusDropdownLabel);
      },
      valueSearch: searchDropdown?.filter(
        (f) => f.filterId === statusDropdownLabel
      )[0]?.value,
    },
  ];

  const searchInformation: SearchInformationI = {
    autocomplete: false,
    onHandleSearch: handleOnSearch,
    placeholder:
      "Inserisci il nome, l'identificativo o il nome dell'ente gestore del progetto che stai cercando",
    isClearable: true,
    title: 'Cerca progetto',
  };

  const onActionClick: TableActionsI = {
    [TableActionViewTypes.VIEW]: (td: TableRowI) => {
      console.log(td);
    },
  };

  const newGestoreProgetto = () => {
    dispatch(
      openModal({
        id: formTypes.PROGETTO,
        payload: {
          title: 'Crea un nuovo progetto',
        },
      })
    );
  };

  const ctaProgetti = {
    title: 'Area Amministrativa',
    subtitle:
      'Qui potrai gestire utenti, enti, programmi e progetti e creare i questionari',
    textCta: 'Crea nuovo progetto',
    iconCta: 'it-plus',
  };

  return (
    <GenericSearchFilterTableLayout
      searchInformation={searchInformation}
      dropdowns={dropdowns}
      filtersList={filtersList}
      {...ctaProgetti}
      cta={newGestoreProgetto}
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
          total={progettiList.length}
          onChange={handleOnChangePage}
        />
      </div>
      <ManageProject withTwoColumns creation />
    </GenericSearchFilterTableLayout>
  );
};

export default Progetti;
