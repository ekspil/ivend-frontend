const getStatus = status => {
    //Проверку оставшихся дней после того как установлю формат

    if(!status){
        return '<span class="status-icon bg-secondary"></span>Ожидание регистрации';
    }
    else if(status){
        return '<span class="status-icon bg-success"></span>'+status;
    }
    else {
        return '<span class="status-icon bg-danger"></span>Ошибка';
    }


};

export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Модель', key: 'model', unsortable: true },
    { name: 'Заводской №', key: 'factoryNum', unsortable: true },
    { name: 'Рег. №', key: 'regNum', unsortable: true },
    { name: 'Крайний чек', key: 'lastBillDate', unsortable: true },
    { name: 'Номер ФН', key: 'fiscalNum', unsortable: true },
    { name: 'Заполнение', key: 'countToDie', unsortable: true },
    { name: 'Время жизни', key: 'timeToDie', unsortable: true },
    { name: 'ОФД', key: 'ofdKey', unsortable: true, raw: true },
    { name: 'Активация', key: 'activationDate', unsortable: false }
];

export const getTableFields = data => data.map(kkt => ({
    id: kkt.id,
    model: kkt.model || '-',
    factoryNum: kkt.factoryNum || '-',
    regNum: kkt.regNum || '-',
    lastBillDate: kkt.lastBillDate || '-',
    fiscalNum: kkt.fiscalNum || '-',
    countToDie: kkt.countToDie || '-',
    timeToDie: kkt.timeToDie || '-',
    ofdKey: kkt.ofdKey || 'ОТКЛ',
    activationDate: getStatus(kkt.activationDate),
    route: `/fiscal/edit/${kkt.id}`
}));
