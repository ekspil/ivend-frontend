import { createTooltip} from '@/utils';
let num = 0
function getEquipment(sim){
    if(sim.controllerId){
        return `Контроллер ( ${sim.controllerUid} )`
    }
    if(sim.terminalId){
        return `${sim.terminal} ( ${sim.controllerUid} )`
    }
}

function getNum(){
    num++
    return num
}



export const getTableHeaders = () => [
    //{ name: '№', key: 'num', link: false },
    { name: 'ИД', key: 'id', link: false },
    { name: 'Тип', key: 'type', unsortable: false },
    { name: 'Компания', key: 'userName', unsortable: false },
    { name: 'Сумма', key: 'amount', unsortable: false },
    { name: 'Создан', key: 'createdAt',
        critery ({createdAt}) {
            const date = new Date(createdAt)
            return date.toLocaleDateString()



        }
    },
    { name: 'Статус', key: 'applied',
        critery ({applied}) {
            if(applied){
                return createTooltip('primary', "Оплачен");
            }
            else {
                return createTooltip('warning', "Не оплачен");
            }



        }},

];

export const getTableFields = (data, props) => data.map(bill => ({
    id: bill.id,
    type: bill.type,
    userName: bill.userName,
    applied: bill.applied,
    amount: bill.amount,
    createdAt: bill.createdAt,
    props,
    route: ``
}));
