import { Container } from 'design-react-kit';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table } from '../../../components';
import GenericSearchFilterTableLayout, {
  SearchInformationI,
} from '../../../components/genericSearchFilterTableLayout/genericSearchFilterTableLayout';
import PageTitle from '../../../components/PageTitle/pageTitle';
import { newTable, TableHeadingI } from '../../../components/Table/table';
import { setEntityFilters } from '../../../redux/features/areaAmministrativa/areaAmministrativaSlice';
import {
  selectRolesList,
  selectRolesPagination,
} from '../../../redux/features/roles/rolesSlice';
import { GetRolesListValues } from '../../../redux/features/roles/rolesThunk';
import { useAppSelector } from '../../../redux/hooks';
import { TableActionsI } from '../../../utils/common';

const arrayBreadcrumb = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Profilazione',
  },
];

const RoleManagement = () => {
  const dispatch = useDispatch();
  const ruoliList = useAppSelector(selectRolesList);
  const pagination = useAppSelector(selectRolesPagination);
  const handleOnSearch = (searchValue: string) => {
    dispatch(
      setEntityFilters({ nomeLike: { label: searchValue, value: searchValue } })
    );
  };

  const searchInformation: SearchInformationI = {
    autocomplete: false,
    onHandleSearch: handleOnSearch,
    placeholder: 'Inserisci il nome del ruolo che stai cercando',
    isClearable: true,
    title: 'Cerca ruolo',
  };

  const TableHeading: TableHeadingI[] = [
    {
      label: 'Ruolo',
      field: 'name',
      size: 'small',
    },
  ];

  const updateTableValues = () => {
    const table = newTable(
      TableHeading,
      (ruoliList || []).map((td) => ({
        id: td.id,
        name: td.name,
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
  }, [ruoliList]);

  const getRolesList = () => {
    dispatch(GetRolesListValues('test'));
  };

  useEffect(() => {
    getRolesList();
  }, []);

  const onActionClick: TableActionsI = {};

  return (
    <>
      <PageTitle
        breadcrumb={arrayBreadcrumb}
        // subtititle
      />
      <Container>
        <GenericSearchFilterTableLayout
          searchInformation={searchInformation}
          showButtons={false}
          rolesLayout
        >
          <Table
            {...tableValues}
            id='table'
            onActionClick={onActionClick}
            onCellClick={(field, row) => console.log(field, row)}
            //onRowClick={row => console.log(row)}
            withActions
            rolesTable
          />
        </GenericSearchFilterTableLayout>
      </Container>
    </>
  );
};

export default memo(RoleManagement);
