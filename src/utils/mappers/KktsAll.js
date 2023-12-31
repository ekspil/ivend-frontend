import { createTooltip} from '@/utils';

const statusToText = field => {
    switch(field){
        case null:
            return "0: Ожидание"
        case 0:
            return "0: Ожидание"
        case 1:
            return "1: Удаление"
        case 2:
            return "2: Ошибка"
        case 3:
            return "3: Внимание"
        case 4:
            return "4: Регистрация"
        case 5:
            return "5: Активация"
        case 6:
            return "6: Зарегистрирована"
        case 7:
            return "7: Работает"
    }

}
// const getStatus = field => {
//     //Проверку оставшихся дней после того как установлю формат
//     if(field.action === "DELETE"){
//         return "6:Удаление" ;
//     }
//     if(!field.kktActivationDate){
//         return "4:Регистрация" ;
//     }
//     let date =new Date();
//     let year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     let yearF = Number(field.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[2])
//     let monthF = Number(field.kktActivationDate.replace(/[,-/ ]/g, ".").split('.')[1])
//
//
//
//
//     if(field.kktModel === "УМКА-01-ФА (ФН36)"){
//
//         if((year - yearF >= 3 && month - monthF >=0) || (year - yearF >= 4)){
//             return "5:Ошибка" ;
//         }
//         if(Number(field.kktBillsCount) > 230000){
//             return "5:Ошибка" ;
//         }
//         if(year - yearF >= 3 && month - monthF == 1){
//             return "3:Внимание" ;
//         }
//         if(Number(field.kktBillsCount) > 220000){
//             return "3:Внимание" ;
//         }
//     }
//     if(field.kktModel === "УМКА-01-ФА (ФН15)"){
//         if((year - yearF >= 1 && month - monthF >=3) || (year - yearF >= 2)){
//             return "5:Ошибка" ;
//         }
//         if(Number(field.kktBillsCount) > 230000){
//             return "5:Ошибка" ;
//         }
//         if(year - yearF >= 1 && month - monthF >=2){
//             return "3:Внимание" ;
//         }
//         if(Number(field.kktBillsCount) > 220000){
//             return "3:Внимание" ;
//         }
//     }
//     if(field.kktLastBill){
//         let da = new Date(field.kktLastBill).getTime()
//         let dn = new Date()
//         if (da < (dn - (1000 * 60 * 60 * 24 * 10))) {
//            return "3:Внимание" ;
//         }
//     }
//
//
//
//
//     return "0: НОРМА" ;
//     };


const getKktModel = (model) => {
    switch(model){
        case "ORANGE_15":
            return "PAYONLINE-01-ФА ФН15"
        case "ORANGE_36":
            return "PAYONLINE-01-ФА ФН36"
        default:
            return model
    }
}



export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Пользователь', key: 'companyName', link: false },
    { name: 'Тип ФН', key: 'model', unsortable: false },
    { name: 'Номер кассы', key: 'factoryNum', unsortable: false },
    //{ name: 'Рег. №', key: 'regNum', unsortable: false },
    { name: 'Номер ФН', key: 'fiscalNum', unsortable: true },
    { name: 'КЧ', key: 'countToDie', unsortable: false },
    { name: 'Последний чек', key: 'kktLastBill',
        critery ({kktLastBill, kktStatus}) {
            if(kktStatus == "ERROR"){
                return createTooltip('alert', kktLastBill);
            }
            if(kktStatus == "OK"){
                return createTooltip('primary', kktLastBill);
            }
            else {
                return createTooltip('warning', kktLastBill);
            }



        }
    },
    { name: 'Дата', key: 'timeToDie', unsortable: false },
    { name: 'Рег данные', key: 'ofdKey', unsortable: true, raw: true },
    { name: 'Сервер', key: 'server', unsortable: true, raw: true },
    { name: 'Статус', key: 'activationDate', unsortable: false },

];

export const getTableFields = (data, props) => data.map(kkt => ({
    id: kkt.id,
    companyName: (kkt.companyName ? kkt.companyName.split(" ")[0] : '-') +  ' ' +   (kkt.companyName &&  kkt.companyName.split(" ")[1]? kkt.companyName.split(" ")[1] : ''),
    model: getKktModel(kkt.kktModel) || '-',
    factoryNum: kkt.kktFactoryNumber || '-',
    regNum: kkt.kktRegNumber || '-',
    kktStatus: kkt.kktStatus || '-',
    fiscalNum: kkt.kktFNNumber || '-',
    countToDie: kkt.kktBillsCount || '-',
    timeToDie: kkt.kktActivationDate || '-',
    ofdKey: kkt.kktOFDRegKey || 'ОТКЛ',
    //activationDate: getStatus(kkt),
    activationDate: statusToText(kkt.status),
    kktLastBill: kkt.kktLastBill ? String(kkt.kktLastBill).substr(0, 19).replace("T", " ") : '-',
    server: kkt.server || 'Стандартный',
    props,
    route: `/fiscalAll/edit/${kkt.id}`
}));
