import {  getTimestamp, createTooltip } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'name', link: true},
  {name: 'Наличные', key: 'cashInMachine',
    critery({cashInMachine, controller}) {
      if(Number(cashInMachine) === 0){

        return createTooltip("primary", cashInMachine, false, false);
      }
      else {

        return createTooltip("primary", cashInMachine, false, controller);
      }
    }},

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
  {name: 'Адрес установки', key: 'place'},
  {name: 'Контроллер', key: 'controller'},
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
