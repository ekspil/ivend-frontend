const getStatus = status => {
    //Проверку оставшихся дней после того как установлю формат

    if(!status){
        return 'Ожидание регистрации';
    }
    else if(status){
        return 'Активирована '+status;
    }
    else {
        return 'Ошибка';
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
    model: kkt.kktModel || '-',
    factoryNum: kkt.kktFactoryNumber || '-',
    regNum: kkt.kktRegNumber || '-',
    lastBillDate: kkt.lastBillDate || '-',
    fiscalNum: kkt.kktFNNumber || '-',
    countToDie: kkt.kktBillsCount || '-',
    timeToDie: kkt.kktActivationDate || '-',
    ofdKey: kkt.kktOFDRegKey || 'ОТКЛ',
    activationDate: getStatus(kkt.kktActivationDate),
    route: `/fiscalAll/edit/${kkt.id}`
}));
