import { Button, Container } from 'design-react-kit';
import React, { memo, useState } from 'react';
import { Form, Input, Table } from '../../../../components';
import PageTitle from '../../../../components/PageTitle/pageTitle';
import { newTable, TableHeadingI } from '../../../../components/Table/table';
import { formFieldI } from '../../../../utils/formHelper';
import './roleManagementDetails.scss';

interface RoleDetailsI {
  name?: string;
}

const arrayBreadcrumb = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Profilazione',
    url: '/gestione-ruoli',
  },
  {
    label: 'current',
  },
];

const TableHeading: TableHeadingI[] = [
  {
    label: 'Funzionalità',
    field: 'name',
  },
  {
    label: 'Permessi',
    field: 'authorized',
    size: 'small',
  },
];

const funzionalita = [
  {
    name: 'Censimento ente',
    id: 1,
  },
  {
    name: 'Visualizzazione scheda ente',
    id: 2,
  },
  {
    name: 'Visualizzazione lista enti',
    id: 3,
  },
  {
    name: 'Modifica scheda ente',
    id: 4,
    authorized: true,
  },
  {
    name: 'Eliminazione ente',
    id: 5,
  },
  {
    name: 'Compilazione questionario',
    id: 6,
    authorized: true,
  },
  {
    name: 'Modifica questionario',
    id: 7,
  },
  {
    name: 'Visualizzazione questionario',
    id: 8,
    authorized: true,
  },
  {
    name: 'Eliminazione questionario',
    id: 9,
  },
  {
    name: 'Invio questionario',
    id: 10,
  },
];

const RolesManagementDetails: React.FC<RoleDetailsI> = (props) => {
  const { name = 'Facilitatore' } = props;
  const [formEnabled, setEnableForm] = useState(false);

  const handleChangeRole = (
    td: { name: string; id: number },
    checked: formFieldI['value']
  ) => {
    console.log('handleChangeRole', td, checked);
    // TODO: implement change role
  };

  const tableValues = newTable(
    TableHeading,
    (funzionalita || []).map((td) => ({
      id: td.id,
      name: td.name,
      authorized: (
        <Form>
          <Input
            id={'checkbox'}
            field='authorization'
            type='checkbox'
            withLabel={false}
            className='shadow-none w-25'
            aria-label={'Checkbox permesso per ' + td.name}
            checked={td.authorized}
            disabled={!formEnabled}
            onInputChange={(checked) => handleChangeRole(td, checked)}
          />
        </Form>
      ),
    }))
  );

  return (
    <>
      <PageTitle
        breadcrumb={arrayBreadcrumb}
        // subtititle
      />
      <Container>
        <h1 className='h6 text-primary my-4'>
          Informazioni ruolo: <strong>{name}</strong>
        </h1>
        <Form>
          <Input
            id='role-name'
            field='role-name'
            disabled
            label={'Nome'}
            value={name}
            className='role-management-details-container__input my-4'
          />
        </Form>
        <Table
          {...tableValues}
          id='table'
          onCellClick={(field, row) => console.log(field, row)}
          //onRowClick={row => console.log(row)}
        />
        <div className='d-flex flex-row justify-content-end my-4'>
          {formEnabled ? (
            <>
              <Button
                color='primary'
                outline
                onClick={() => setEnableForm(!formEnabled)}
                className='mr-2 role-management-details-container__button-width'
              >
                Annulla
              </Button>
              <Button
                color='primary'
                onClick={() => console.log('salva modifiche')}
                className='role-management-details-container__button-width'
              >
                Salva modifiche
              </Button>
            </>
          ) : (
            <>
              <Button
                color='primary'
                outline
                onClick={() => console.log('elimina ruolo')}
                className='mr-2 role-management-details-container__button-width'
              >
                Elimina ruolo
              </Button>
              <Button
                color='primary'
                onClick={() => setEnableForm(!formEnabled)}
                className='role-management-details-container__button-width'
              >
                Modifica
              </Button>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default memo(RolesManagementDetails);
