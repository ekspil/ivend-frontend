import {  getTimestamp } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'name', link: true},
  {name: 'Контроллер', key: 'controller'},
  {name: 'Наличные', key: 'cashInMachine'},
  {
    name: 'Посл инкасс', key: 'encashmentTimestamp',
    critery({encashmentTimestamp}) {
      return getTimestamp(encashmentTimestamp);
    }
  },
  {name: 'Сумма', key: 'lastEncashSum'},
  {name: 'Кол инкасс', key: 'encashmentsCount'},
  {name: 'Сумма инкасс', key: 'encashmentsAmount'},
  //{name: 'Кол-во продаж', key: 'salesCount'},


  //{name: 'Безнал', key: 'cashlessAmount'},
  {name: 'Адрес установки', key: 'place'}
];

export const getTableFields = data => data.map(({id, name, lastEncashment, cashInMachine, place, controller, encashments}) => ({
  id,
  name,
  encashmentsCount: encashments.length,
  encashmentsAmount: encashments.reduce((acc, item) => {
    return Number(item.sum) + acc
  }, 0),
  controller: controller?.uid,
  place,
  encashmentTimestamp: lastEncashment ? new Date(lastEncashment.timestamp) : null,
  cashInMachine,
  lastEncashSum: lastEncashment ? lastEncashment.sum : null,
  route: `/machine/${id}/encashments`
}));
