import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  statusColor,
  statusBgColor,
  TableHeadingQuestionnaires,
} from '../utils';

import GenericSearchFilterTableLayout, {
  SearchInformationI,
} from '../../../../../components/genericSearchFilterTableLayout/genericSearchFilterTableLayout';
import {
  TableActionsI,
  TableActionViewTypes,
} from '../../../../../utils/common';

import {
  DropdownFilterI,
  FilterI,
} from '../../../../../components/DropdownFilter/dropdownFilter';

import { formFieldI } from '../../../../../utils/formHelper';
import SideSelection from '../../../../../components/SideSelection/sideSelection';
import PageTitle from '../../../../../components/PageTitle/pageTitle';

const entity = 'questionari';
const typeDropdownLabel = 'tipo';
const statusDropdownLabel = 'stato';

const Questionari = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionariList = useAppSelector(selectEntityList);
  const dropdownFilterOptions = useAppSelector(selectEntityFiltersOptions);
  const filtersList = useAppSelector(selectEntityFilters);
  const pagination = useAppSelector(selectEntityPagination);
  const [searchDropdown, setSearchDropdown] = useState<
    { filterId: string; value: formFieldI['value'] }[]
  >([]);

  useEffect(() => {
    dispatch(setEntityPagination({ pageSize: 3 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTableValues = () => {
    const table = newTable(
      TableHeadingQuestionnaires,
      questionariList?.map((td) => ({
        id: td.id,
        label: td.name,
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

  const questionaraireCta = {
    title: 'Area Amministrativa',
    subtitle:
      'Qui potrai gestire utenti, enti, programmi e progetti e creare i questionari',
    textCta: 'Crea nuovo questionario',
    iconCta: 'it-plus',
  };
  const addendumCta = {
    title: 'Area Amministrativa',
    subtitle:
      'Qui potrai gestire utenti, enti, programmi e progetti e creare i questionari',
    textCta: 'Crea nuovo addendum',
    iconCta: 'it-plus',
  };

  interface QuestionnaireFilter {
    label: string;
    key?: string;
    value: string;
  }

  const questionnaireOptionsMock: QuestionnaireFilter[] = [
    { label: 'Questionari', key: 'questionnaire', value: 'questionnaire' },
    { label: 'Addendum', key: 'addendum', value: 'Addendum' },
  ];

  const [filter, setFilter] = useState<QuestionnaireFilter>(
    questionnaireOptionsMock[0]
  );

  useEffect(() => {
    setTableValues(updateTableValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionariList]);

  const getListaQuestionari = () => {
    dispatch(GetEntityValues({ entity }));
  };

  useEffect(() => {
    getListaQuestionari();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersList, pagination]);

  const handleOnChangePage = (pageNumber: number = pagination?.pageNumber) => {
    dispatch(setEntityPagination({ pageNumber }));
  };

  const handleOnSearch = (searchValue: string) => {
    dispatch(
      setEntityFilters({ nomeLike: { label: searchValue, value: searchValue } })
    );
  };

  const handleDropdownFilters = (values: FilterI[], filterKey: string) => {
    dispatch(setEntityFilters({ [filterKey]: [...values] }));
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

  const searchInformation: SearchInformationI = {
    autocomplete: false,
    onHandleSearch: handleOnSearch,
    placeholder:
      filter.value === 'questionnaire'
        ? 'Cerca questionario'
        : 'Cerca addendum',
    isClearable: true,
    title:
      filter.value === 'questionnaire'
        ? 'Cerca Questionario'
        : 'Cerca Addendum',
  };

  const dropdowns: DropdownFilterI[] = [
    {
      filterName: 'Tipo',
      options: dropdownFilterOptions[typeDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, typeDropdownLabel),
      id: typeDropdownLabel,
      values: filtersList[typeDropdownLabel],
      handleOnSearch: (searchKey) =>
        handleOnSearchDropdownOptions(searchKey, typeDropdownLabel),
      valueSearch: searchDropdown
        ?.filter((f) => f.filterId === typeDropdownLabel)[0]
        ?.value?.toString(),
      className: 'mr-3',
    },
    {
      filterName: 'Stato',
      options: dropdownFilterOptions[statusDropdownLabel],
      onOptionsChecked: (options) =>
        handleDropdownFilters(options, statusDropdownLabel),
      id: statusDropdownLabel,
      values: filtersList[statusDropdownLabel],
      handleOnSearch: (searchKey) =>
        handleOnSearchDropdownOptions(searchKey, statusDropdownLabel),
      valueSearch: searchDropdown
        ?.filter((f) => f.filterId === statusDropdownLabel)[0]
        ?.value?.toString(),
    },
  ];

  const onActionClick: TableActionsI = {
    [TableActionViewTypes.VIEW]: (td: TableRowI) => {
      navigate(`/area-amministrativa/questionari/riepilogo/${td.id}`);
    },
    [TableActionViewTypes.DELETE]: (td: TableRowI) => {
      console.log(td);
    },
  };

  const objectToPass =
    filter.value === 'questionnaire'
      ? { ...questionaraireCta }
      : { ...addendumCta };

  return (
    <div className='row'>
      <div className='col-2 mr-2'>
        <SideSelection
          filterOptions={questionnaireOptionsMock}
          onFilterChange={setFilter}
          defaultOption={questionnaireOptionsMock[0]}
        />
      </div>
      <div className='col-9 ml-3'>
        <PageTitle
          title={filter.value === 'questionnaire' ? 'Questionario' : 'Addendum'}
        />
        <GenericSearchFilterTableLayout
          searchInformation={searchInformation}
          showButtons={false}
          filtersList={filtersList}
          dropdowns={dropdowns}
          {...objectToPass}
          cta={() => navigate('/area-amministrativa/questionari/nuovo')}
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
              total={questionariList.length}
              onChange={handleOnChangePage}
            />
          </div>
        </GenericSearchFilterTableLayout>
      </div>
    </div>
  );
};

export default Questionari;
