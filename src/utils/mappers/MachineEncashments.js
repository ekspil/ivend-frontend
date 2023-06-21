import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'machineName'},
  {name: 'Оператор', key: 'meta'},
  {
    name: 'Инкассация', key: 'encashmentTimestamp',
    critery({encashmentTimestamp}) {
      return getTimestamp(encashmentTimestamp);
    }
  },
  {name: 'Кол-во продаж', key: 'countInMachine'},
  {name: 'Сумма', key: 'encashSum'},
  {name: 'Наличные', key: 'cashInMachine'},
  {name: 'Безнал', key: 'cashlessInMachine', critery({cashlessInMachine}) { return Number(cashlessInMachine)} },
  {name: 'Адрес установки', key: 'place'},
  {name: 'Контроллер', key: 'controller'},

];

export const getTableFields = (machine) => {
    return machine.encashments.map(encashment => {
      const {timestamp, sum, count, cashless, countCashless, meta,} = encashment
      return {
        machineId: machine.id,
        machineName: machine.name,
        encashmentTimestamp: new Date(timestamp),
        overallAmount: sum,
        encashSum: Number(sum || 0) + Number(cashless || 0),
        countInMachine: Number(count || 0) + Number(countCashless || 0),
        cashInMachine: sum || 0,
        cashlessInMachine: cashless || 0,
        cashCountInMachine: count || 0,
        cashlessCountInMachine: countCashless || 0,
        controller: machine?.controller?.uid,
        place: machine?.place,
        meta,
      }
    })

  }

;

