/* https://github.com/ctimmerm/axios-mock-adapter */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import MockAdapter from 'axios-mock-adapter';
import { AxiosInstance } from 'axios';

//const shouldUseMock = process.env.NODE_ENV === 'development'
const shouldUseMock = true;

export const initMock = (apiInstance: AxiosInstance) => {
  if (apiInstance && shouldUseMock) {
    const mockInstance = new MockAdapter(apiInstance);

    mockInstance.onPut('/programma').reply(() => {
      return [500];
    });

    mockInstance.onPost('/programma').reply(() => {
      return [201];
    });

    mockInstance.onGet('/programmi/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaProgrammi.json');
      return [200, response];
    });

    mockInstance.onPost('/programmi/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaProgrammi.json');
      return [200, response];
    });

    mockInstance.onGet('/progetti/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaProgetti.json');
      return [200, response];
    });

    mockInstance.onPost('/progetti/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaProgetti.json');
      return [200, response];
    });

    mockInstance.onGet('/enti/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaEnti.json');
      return [200, response];
    });

    mockInstance.onPost('/enti/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaEnti.json');
      return [200, response];
    });

    mockInstance.onGet('/utenti/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaUtenti.json');
      return [200, response];
    });

    mockInstance.onPost('/utenti/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaUtenti.json');
      return [200, response];
    });

    mockInstance.onGet('/questionari/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaQuestionari.json');
      return [200, response];
    });

    mockInstance.onPost('/questionari/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaQuestionari.json');
      return [200, response];
    });

    mockInstance.onGet('/programmi/status/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/statiDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/progetti/policy/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/policyDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/progetti/program/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/programmiDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/progetti/status/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/statiDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/enti/profile/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/profiloDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/enti/status/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/statiDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/enti/project/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/progettiDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/enti/program/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/programmiDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/utenti/roles/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/roleDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/utenti/status/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/statiDropdown.json');
      return [200, response];
    });

    mockInstance.onGet('/areaCittadini/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaCittadini.json');
      return [200, response];
    });

    mockInstance.onPost('/areaCittadini/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaCittadini.json');
      return [200, response];
    });

    mockInstance.onGet('/areaCittadini/site/dropdown/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/sedeDropdown.json');
      return [200, response];
    });

    mockInstance
      .onGet('/areaCittadini/project/dropdown/test')
      .reply(async () => {
        // @ts-ignore
        const response = await import('/mock/progettiDropdown.json');
        return [200, response];
      });

    mockInstance
      .onGet('/areaCittadini/program/dropdown/test')
      .reply(async () => {
        // @ts-ignore
        const response = await import('/mock/programmiDropdown.json');
        return [200, response];
      });

    mockInstance
      .onGet('/areaCittadini/policy/dropdown/test')
      .reply(async () => {
        // @ts-ignore
        const response = await import('/mock/policyDropdown.json');
        return [200, response];
      });

    mockInstance.onGet('/areaCittadini/detail').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/cittadinoDetail.json');
      return [200, response];
    });

    mockInstance.onGet('/areaCittadini/search').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/cittadinoDetailSearchDetail.json');
      return [200, response];
    });

    mockInstance.onGet('/roles/all/test').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaRuoli.json');
      return [200, response];
    });

    mockInstance.onGet('/programma/321321').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/programmaMock.json');
      return [200, response];
    });

    mockInstance
      .onGet('/ente/321321/gestoreProgramma/prova')
      .reply(async () => {
        // @ts-ignore
        const response = await import('/mock/enteProgrammaMock.json');
        return [200, response];
      });
    mockInstance
      .onGet('/ente/project1/gestoreProgetto/prova')
      .reply(async () => {
        // @ts-ignore
        const response = await import('/mock/enteProgettoMock.json');
        return [200, response];
      });
    mockInstance.onGet('/ente/project1/partner/prova').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/entePartnerMock.json');
      return [200, response];
    });
    mockInstance.onGet('/ente-sede/project1/prova/prova').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/sedeMock.json');
      return [200, response];
    });

    mockInstance.onGet('/progetto/project1').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/progettoMock.json');
      return [200, response];
    });

    mockInstance.onGet('/ente/project1/partner/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaEnti.json');
      return [200, response];
    });
    mockInstance.onGet('/ente-sede/project1/prova/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaSedi.json');
      return [200, response];
    });

    mockInstance.onGet('/ente/project1/gestoreProgetto/all').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaGestoriProgetto.json');
      return [200, response];
    });

    mockInstance.onGet('/programmi/321321/progetti').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/listaProgetti.json');
      return [200, response];
    });

    mockInstance.onGet('/utente/1').reply(async () => {
      // @ts-ignore
      const response = await import('/mock/userMock.json');
      return [200, response];
    });

    mockInstance.onAny().reply(async () => {
      // @ts-ignore
      const response = await import('/mock/user.json');
      return [200, response];
    });

    // sample
    mockInstance.onAny().reply(500, {
      data: [{ id: 1, name: 'John Smith' }],
    });
  }
};
