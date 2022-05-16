import React, { useEffect, useState } from 'react';
import { Chip, ChipLabel } from 'design-react-kit';
import clsx from 'clsx';
import { Paginator, Table } from '../../../../../components';
import { newTable } from '../../../../../components/Table/table';
import { statusBgColor, statusColor, TableHeading } from '../utils';
import {
  TableActionsI,
  TableActionViewTypes,
} from '../../../../../utils/common';
import { useNavigate } from 'react-router-dom';
import { PaginatorI } from '../../../../../components/Paginator/paginator';
import { useDispatch } from 'react-redux';
import { GetAllProgettiDetail } from '../../../../../redux/features/areaAmministrativa/detail/detailThunk';
import { useAppSelector } from '../../../../../redux/hooks';
import { selectListData } from '../../../../../redux/features/areaAmministrativa/detail/detailSlice';

interface ProgrammiTableI {
  pagination?: PaginatorI | undefined;
  pageChange?: (activePage: number) => void;
}
const ProgettiTable: React.FC<ProgrammiTableI> = ({
  pagination,
  pageChange = () => ({}),
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const progettiList = useAppSelector(selectListData);
  const progettiLength = progettiList?.length;

  useEffect(() => {
    dispatch(GetAllProgettiDetail());
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
      values:
        pagination?.activePage && pagination?.pageSize
          ? table.values.slice(
              pagination?.activePage * pagination?.pageSize -
                pagination?.pageSize,
              pagination?.activePage * pagination?.pageSize
            )
          : [...table.values],
    };
  };

  const [tableValues, setTableValues] = useState(updateTableValues());

  useEffect(() => {
    setTableValues(updateTableValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progettiLength]);

  const handleOnChangePage = (
    activePage: number = pagination?.activePage ? pagination.activePage : 0
  ) => {
    // dispatch(setEntityPagination({ activePage }));
    pageChange(activePage);
  };

  const onActionClick: TableActionsI = {
    [TableActionViewTypes.VIEW]: (td: any) => {
      console.log(td);
      //TODO REPLACE WITH DYNAMIC ID WHEN WE HAVE THE APIS
      navigate(`${td.id}`);
    },
  };

  return (
    <>
      <Table
        {...tableValues}
        id='table'
        onActionClick={onActionClick}
        onCellClick={(field, row) => console.log(field, row)}
        //onRowClick={row => console.log(row)}
        withActions
      />
      {pagination && (
        <Paginator
          activePage={pagination?.activePage}
          center
          refID='#table'
          pageSize={pagination?.pageSize}
          total={progettiList.length}
          onChange={handleOnChangePage}
        />
      )}
    </>
  );
};

export default ProgettiTable;
