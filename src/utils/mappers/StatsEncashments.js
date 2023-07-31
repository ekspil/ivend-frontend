import {  getTimestamp, createTooltip } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'name', link: true},
  {name: 'Кол-во продаж', key: 'countInMachine'},
  {name: 'Сумма', key: 'encashSum'},
  {name: 'Наличные', key: 'cashInMachine',
    critery({cashInMachine, controller}) {
      if(Number(cashInMachine) === 0){

        return createTooltip("primary", cashInMachine, false, false);
      }
      else {

        return createTooltip("primary", cashInMachine, false, controller);
      }
    }},

  {name: 'Безнал', key: 'cashlessInMachine', critery({cashlessInMachine}) { return Number(cashlessInMachine)} },
  {
    name: 'Посл инкасс', key: 'encashmentTimestamp',
    critery({encashmentTimestamp}) {
      return getTimestamp(encashmentTimestamp);
    }
  },

  {name: 'Кол-во продаж', key: 'encashmentsCount', critery({encashmentsCount, encashmentsCountCashless}) { return Number(encashmentsCount) +  Number(encashmentsCountCashless)}},
  {name: 'Сумма', key: 'encashmentsSum', critery({encashmentsSum, encashmentsSumCashless}) { return Number(encashmentsSum) +  Number(encashmentsSumCashless)}},
  {name: 'Наличные', key: 'encashmentsSum'},
  {name: 'Безнал', key: 'encashmentsSumCashless'},
    //{name: 'Сумма инкасс', key: 'lastEncashSum'},
  // {name: 'Кол инкасс', key: 'encashmentsCount'},
  // {name: 'Сумма инкасс', key: 'encashmentsAmount'},
  //{name: 'Кол-во продаж', key: 'salesCount'},


  //{name: 'Безнал', key: 'cashlessAmount'},
  {name: 'Адрес установки', key: 'place'},
  {name: 'Контроллер', key: 'controller'},
];
import store from '@/store'
export const getTableFields = data => data.map(({id, name, lastEncashment, dataAfterEncashment, place, controller, encashments}) => ({
  id,
  name,
  encashmentsSum: encashments.reduce((acc, item) => {
    return Number(item.sum) + acc
  }, 0),
  encashmentsSumCashless: encashments.reduce((acc, item) => {
    return Number(item.cashless) + acc
  }, 0),
  encashmentsCount: encashments.reduce((acc, item) => {
    return Number(item.count) + acc
  }, 0),
  encashmentsCountCashless: encashments.reduce((acc, item) => {
    return Number(item.countCashless) + acc
  }, 0),
  // encashmentsAmount: encashments.reduce((acc, item) => {
  //   return Number(item.sum) + acc
  // }, 0),
  controller: controller?.uid,
  place,
  encashmentTimestamp: lastEncashment ? new Date(lastEncashment.timestamp) : null,
  encashSum: Number(dataAfterEncashment?.cashInMachine || 0) + Number(dataAfterEncashment?.cashlessInMachine || 0),
  countInMachine: Number(dataAfterEncashment?.cashCountInMachine || 0) + Number(dataAfterEncashment?.cashlessCountInMachine || 0),
  cashInMachine: dataAfterEncashment?.cashInMachine || 0,
  cashlessInMachine: dataAfterEncashment?.cashlessInMachine || 0,
  cashCountInMachine: dataAfterEncashment?.cashCountInMachine || 0,
  cashlessCountInMachine: dataAfterEncashment?.cashlessCountInMachine || 0,
  lastEncashSum: lastEncashment ? (lastEncashment.sum + Number(lastEncashment.cashless)) : null,
  route: `/machine/${id}/encashments`
})).filter(e => {
  if(store.getters['cache/showZeroValues']){
    return true
  }
  else {
    return Boolean(e.encashSum + e.encashmentsCount + e.encashmentsCountCashless)
  }

});;
