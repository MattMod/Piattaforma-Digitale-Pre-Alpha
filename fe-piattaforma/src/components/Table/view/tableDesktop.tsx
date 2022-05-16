import React from 'react';
import { Icon, Table as TableKit, Button } from 'design-react-kit';
import clsx from 'clsx';
import { TableI } from '../table';
import { TableActionViewTypes } from '../../../utils/common';

const TableDesktop: React.FC<TableI> = (props) => {
  const {
    className,
    heading = [],
    id = 'table',
    onActionClick,
    onCellClick = () => ({}),
    onRowClick = () => ({}),
    values = [],
    withActions = false,
    rolesTable = false,
  } = props;

  return (
    <TableKit className={clsx('table-container', className)} id={id}>
      {heading?.length ? (
        <thead>
          <tr className='lightgrey-bg-c1 neutral-2-color-b4'>
            {heading.map((th) => (
              <th
                key={th.label}
                scope='col'
                className={clsx(
                  `th-${th.size || 'auto'}`,
                  'table-container__intestazione'
                )}
              >
                <span>{th.label.toUpperCase()}</span>
                {/* <Icon           // TODO: decommentare quando aggiungono il sort
                  icon='it-arrow-down-triangle'
                  color='secondary'
                  className='mb-2'
                /> */}
              </th>
            ))}
            {withActions && (
              <th
                scope='col'
                className={rolesTable ? 'th-actions-roles' : 'th-actions'}
              />
            )}
          </tr>
        </thead>
      ) : null}
      {values?.length ? (
        <tbody>
          {values.map((td, i) => (
            <tr
              key={`tr-${i}`}
              onClick={() => onRowClick(td)}
              className='primary-color-a6 '
            >
              {heading.map((th, j) => (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
                <td
                  key={`td-${i}-${j}`}
                  onClick={() => onCellClick(th.field, td)}
                  className='py-4'
                >
                  {td[th.field]}
                </td>
              ))}
              {onActionClick ? (
                <td>
                  <div className='d-flex justify-content-end align-content-center mt-1'>
                    {onActionClick[TableActionViewTypes.CREATE] ? (
                      <Button
                        onClick={() =>
                          onActionClick[TableActionViewTypes.CREATE](td)
                        }
                        className='mr-2 p-0'
                      >
                        <Icon icon='it-plus-circle' color='primary' size='sm' />
                      </Button>
                    ) : null}
                    {onActionClick[TableActionViewTypes.EDIT] ? (
                      <Button
                        onClick={() =>
                          onActionClick[TableActionViewTypes.EDIT](td)
                        }
                        className='mr-2 p-0'
                      >
                        <Icon icon='it-pencil' color='primary' size='sm' />
                      </Button>
                    ) : null}
                    {onActionClick[TableActionViewTypes.DELETE] ? (
                      <Button
                        onClick={() =>
                          onActionClick[TableActionViewTypes.DELETE](td)
                        }
                        className='mr-2 p-0'
                      >
                        <Icon icon='it-delete' color='primary' size='sm' />
                      </Button>
                    ) : null}
                    {onActionClick[TableActionViewTypes.CLONE] ? (
                      <Button
                        onClick={() =>
                          onActionClick[TableActionViewTypes.CLONE](td)
                        }
                        className='mr-2 p-0'
                      >
                        <Icon icon='it-copy' color='primary' size='sm' />
                      </Button>
                    ) : null}
                    {onActionClick[TableActionViewTypes.VIEW] ? (
                      <Button
                        onClick={() =>
                          onActionClick[TableActionViewTypes.VIEW](td)
                        }
                        className='p-0'
                      >
                        <Icon
                          icon='it-chevron-right'
                          color='primary'
                          size='sm'
                        />
                      </Button>
                    ) : null}
                  </div>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      ) : null}
    </TableKit>
  );
};

export default TableDesktop;
