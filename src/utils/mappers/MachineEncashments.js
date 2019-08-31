import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
  {name: 'Автомат', key: 'machineName'},
  {
    name: 'Инкассация', key: 'encashmentTimestamp',
    critery({encashmentTimestamp}) {
      return getTimestamp(encashmentTimestamp);
    }
  },
  {name: 'Кол-во', key: 'salesCount'},
  {name: 'Сумма', key: 'overallAmount'},
  {name: 'Нал', key: 'cashAmount'},
  {name: 'Безнал', key: 'cashlessAmount'},
];

export const getTableFields = (machine) => {
    return machine.encashmentsSummaries.map(encashmentSummary => {
      const {salesSummary, encashment} = encashmentSummary
      const {timestamp} = encashment

      return {
        machineId: machine.id,
        machineName: machine.name,
        encashmentTimestamp: new Date(timestamp),
        ...salesSummary
      }
    })

  }

;

