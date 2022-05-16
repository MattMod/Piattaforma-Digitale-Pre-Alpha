import React from 'react';
import { TableActionsI } from '../../utils/common';
import { useAppSelector } from '../../redux/hooks';
import { selectDevice } from '../../redux/features/app/appSlice';
import TableDesktop from './view/tableDesktop';
import TableMobile from './view/tableMobile';

export interface TableHeadingI {
  label: string;
  field: string;
  size?: 'small' | 'medium' | 'large' | 'auto';
}

export interface TableRowI {
  [key: string]: string | number | JSX.Element;
}

export interface TableI {
  className?: string;
  heading?: TableHeadingI[];
  id?: string;
  onActionClick?: TableActionsI;
  onCellClick?: (field: string, row: TableRowI) => void;
  onRowClick?: (row: TableRowI) => void;
  values?: TableRowI[];
  withActions?: boolean;
  rolesTable?: boolean;
}

const Table: React.FC<TableI> = (props) => {
  const device = useAppSelector(selectDevice);

  console.log('table', props);

  if (device?.mediaIsPhone) {
    return <TableMobile />;
  }

  return <TableDesktop {...props} />;
};

export const newTable = (th: TableHeadingI[], td: TableRowI[]) => {
  return {
    heading: th,
    values: td,
  };
};

export default Table;
