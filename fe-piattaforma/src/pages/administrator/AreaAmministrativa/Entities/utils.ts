import { TableHeadingI } from '../../../../components/Table/table';

const statusTypes = {
  ACTIVE: 'ATTIVO',
  DRAFT: 'BOZZA',
  INACTIVE: 'NON_ATTIVO',
};

export const statusBgColor = (status: string) => {
  switch (status) {
    case statusTypes.ACTIVE:
      return 'primary-bg-a9';
    case statusTypes.DRAFT:
      return 'analogue-2-bg-a2';
    case statusTypes.INACTIVE:
      return 'neutral-1-bg-b4';
    default:
      return 'complementary-1-bg-a2';
  }
};

export const statusColor = (status: string) => {
  switch (status) {
    case statusTypes.ACTIVE:
      return 'text-white';
    case statusTypes.DRAFT:
      return 'primary-color-a9';
    case statusTypes.INACTIVE:
      return 'neutral-1-color-b6';
    default:
      return 'complementary-1-bg-a2';
  }
};

export const TableHeading: TableHeadingI[] = [
  {
    label: 'ID',
    field: 'id',
    size: 'small',
  },
  {
    label: 'Nome',
    field: 'label',
  },
  {
    label: 'Stato',
    field: 'status',
  },
];

export const TableHeadingUsers: TableHeadingI[] = [
  {
    label: 'ID',
    field: 'id',
    size: 'small',
  },
  {
    label: 'Nome',
    field: 'label',
  },
  {
    label: 'Ruolo',
    field: 'role',
  },
  {
    label: 'Stato',
    field: 'status',
  },
];

export const TableHeadingQuestionnaires: TableHeadingI[] = [
  {
    label: 'ID',
    field: 'id',
    size: 'small',
  },
  {
    label: 'Nome questionario',
    field: 'label',
  },
  {
    label: 'Tipo questionario',
    field: 'type',
  },
  {
    label: 'Stato',
    field: 'status',
  },
];

export const TableHeadingEntities: TableHeadingI[] = [
  {
    label: 'ID',
    field: 'id',
    size: 'small',
  },
  {
    label: 'Nome',
    field: 'label',
  },
  {
    label: 'Referente',
    field: 'ref',
  },
  {
    label: 'Tipologia ente',
    field: 'type',
  },
  {
    label: 'Stato',
    field: 'status',
  },
];

export const formTypes = {
  PROGETTI: 'progetti',
  PROGRAMMA: 'programmi',
  PROGETTO: 'progetto',
  ENTE_GESTORE_PROGRAMMA: 'ente-gestore-programma',
  ENTE_GESTORE_PROGETTO: 'ente-gestore-progetto',
  ENTI_GESTORE_PROGETTO: 'enti-gestore-progetto',
  ENTI_PARTNER: 'enti-partner',
  ENTE_PARTNER: 'ente-partner',
  SEDI: 'sedi',
  SEDE: 'sede',
  REFERENTE: 'referente',
  DELEGATO: 'delegato',
};
