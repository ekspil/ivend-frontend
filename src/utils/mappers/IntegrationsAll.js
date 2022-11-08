import { createTooltip, createInput} from '@/utils';
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
    { name: '№', key: 'id', link: false },
    { name: 'Тип', key: 'type', link: false },
    { name: 'IMEI', key: 'imei', link: false },
    { name: 'UUID', key: 'controllerUid', link: false },
    { name: 'Serial', key: 'serial', link: false },
    { name: 'User', key: 'userId', link: false },
];

export const getTableFields = (data, props) => data.map(item => ({
    id: item.id,
    imei: item.imei,
    type: item.type,
    userId: item.user?.companyName || item.userId,
    serial: item.serial,
    controllerUid: item.controllerUid,
    props,
    route: ``
}));
