import React, { useEffect, useState } from 'react';
import {
  newTable,
  TableHeadingI,
  TableRowI,
} from '../../../../../components/Table/table';
import {
  statusBgColor,
  statusColor,
} from '../../../AreaAmministrativa/Entities/utils';
import { Button, Chip, ChipLabel, Icon } from 'design-react-kit';
import clsx from 'clsx';
import { Table } from '../../../../../components';
import {
  TableActionsI,
  TableActionViewTypes,
} from '../../../../../utils/common';

const TableHeadingEntities: TableHeadingI[] = [
  {
    label: 'ID',
    field: 'id',
    size: 'small',
  },
  {
    label: 'Tipologia',
    field: 'type',
  },
  {
    label: 'Facilitatore',
    field: 'facilitatore',
  },
  {
    label: 'Data ultima modifica',
    field: 'lastChange',
  },
  {
    label: 'Stato',
    field: 'status',
  },
];

const CitizenQuestionari: React.FC<{
  questionari: {
    id: number;
    type: string;
    facilitatore: string;
    lastChange: string;
    status: string;
  }[];
}> = ({ questionari }) => {
  const updateTableValues = () => {
    const table = newTable(
      TableHeadingEntities,
      questionari.map((td) => ({
        id: td.id,
        type: td.type,
        facilitatore: td.facilitatore,
        lastChange: td.lastChange,
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
      values: table.values,
    };
  };
  const [tableValues, setTableValues] = useState(updateTableValues());
  useEffect(() => {
    setTableValues(updateTableValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionari]);

  const onActionClick: TableActionsI = {
    [TableActionViewTypes.VIEW]: (td: TableRowI) => {
      console.log('go to questionario', td);
    },
  };
  return (
    <>
      <div className='d-flex justify-content-between mb-2 '>
        <div>
          <h1 className='h4 primary-color-b1'>Questionari</h1>
        </div>
        <div>
          <Button
            className='d-flex flex-row justify-content-center align-items-center'
            onClick={() => {
              console.log('compila nuovo questionario');
            }}
          >
            <Icon
              icon='it-plus-circle'
              size='sm'
              className='primary-color-b1 mr-2'
            />
            <span>Compila nuovo questionario</span>
          </Button>
        </div>
      </div>
      <Table
        {...tableValues}
        id='table'
        onActionClick={onActionClick}
        onCellClick={(field, row) => console.log(field, row)}
        withActions
      />
    </>
  );
};

export default CitizenQuestionari;
