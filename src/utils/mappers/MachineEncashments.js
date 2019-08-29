export const getTableHeaders = () => [
  {name: 'Автомат', key: 'machineName'},
  {name: 'Инкассация', key: 'encashmentTimestamp'},
  {name: 'Кол-во', key: 'salesCount'},
  {name: 'Сумма', key: 'overallAmount'},
  {name: 'Нал', key: 'cashAmount'},
  {name: 'Безнал', key: 'cashlessAmount'},
];

const getDateStr = (date) => `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`

export const getTableFields = (machine) => {
    return machine.encashmentsSummaries.map(encashmentSummary => {
      const {salesSummary, encashment} = encashmentSummary
      const {timestamp} = encashment

      return {
        machineId: machine.id,
        machineName: machine.name,
        encashmentTimestamp: getDateStr(new Date(timestamp)),
        ...salesSummary
      }
    })

  }

;

