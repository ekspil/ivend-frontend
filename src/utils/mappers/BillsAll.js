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
    { name: 'Компания', key: 'userName', unsortable: false },
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
    userName: bill.userName,
    applied: bill.applied,
    props,
    route: ``
}));
