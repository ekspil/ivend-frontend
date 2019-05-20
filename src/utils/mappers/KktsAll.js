const getStatus = field => {
    //Проверку оставшихся дней после того как установлю формат
    if(!field.kktActivationDate){
        return "4:Регистрация" ;
    }
    let date =new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let yearF = field.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[2];
    let monthF = field.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[1];

    if(year - yearF >= 1 && month - monthF >=2){
        return "5:Ошибка" ;
    }
    if(Number(field.kktBillsCount) > 230000){
        return "5:Ошибка" ;
    }
    if(year - yearF >= 1 && month - monthF >=0){
        return "3:Внимание" ;
    }
    if(Number(field.kktBillsCount) > 220000){
        return "3:Внимание" ;
    }

    return "0: НОРМА" ;
    };




export const getTableHeaders = () => [
    { name: 'Статус', key: 'activationDate', unsortable: false },
    { name: 'ID', key: 'id', link: true },
    { name: 'Контрагент', key: 'companyName', link: false },
    { name: 'Модель', key: 'model', unsortable: false },
    { name: 'Заводской №', key: 'factoryNum', unsortable: false },
    //{ name: 'Рег. №', key: 'regNum', unsortable: false },
    { name: 'Номер ФН', key: 'fiscalNum', unsortable: true },
    { name: 'КЧ', key: 'countToDie', unsortable: false },
    { name: 'Дата', key: 'timeToDie', unsortable: false },
    { name: 'ОФД', key: 'ofdKey', unsortable: true, raw: true }

];

export const getTableFields = (data, props) => data.map(kkt => ({
    id: kkt.id,
    companyName: kkt.companyName,
    model: kkt.kktModel || '-',
    factoryNum: kkt.kktFactoryNumber || '-',
    regNum: kkt.kktRegNumber || '-',
    fiscalNum: kkt.kktFNNumber || '-',
    countToDie: kkt.kktBillsCount || '-',
    timeToDie: kkt.kktActivationDate || '-',
    ofdKey: kkt.kktOFDRegKey || 'ОТКЛ',
    activationDate: getStatus(kkt),
    props,
    route: `/fiscalAll/edit/${kkt.id}`
}));
