import {  getTimestamp } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'name', link: true},
  {name: 'Контроллер', key: 'controller'},
  {name: 'Наличные', key: 'cashAmount'},
  {
    name: 'Посл инкасс', key: 'encashmentTimestamp',
    critery({encashmentTimestamp}) {
      return getTimestamp(encashmentTimestamp);
    }
  },
  {name: 'Сумма', key: 'cashAmount'},
  {name: 'Кол инкасс', key: 'encashmentsCount'},
  {name: 'Сумма инкасс', key: 'encashmentsAmount'},
  //{name: 'Кол-во продаж', key: 'salesCount'},


  //{name: 'Безнал', key: 'cashlessAmount'},
  {name: 'Адрес установки', key: 'place'}
];

export const getTableFields = data => data.map(({id, name, lastEncashment, salesByEncashment, place, controller, encashmentsSummariesFast}) => ({
  id,
  name,
  encashmentsCount: encashmentsSummariesFast.length,
  encashmentsAmount: encashmentsSummariesFast.reduce((acc, item) => {
    return Number(item.encashmentsAmount) + acc
  }, 0),
  controller: controller?.uid,
  place,
  encashmentTimestamp: lastEncashment ? new Date(lastEncashment.timestamp) : null,
  ...salesByEncashment,
  route: `/machine/${id}/encashments`
}));
