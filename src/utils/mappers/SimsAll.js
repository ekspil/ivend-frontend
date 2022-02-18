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
    { name: 'Оператор', key: 'provider', link: false },
    { name: 'Номер в системе', key: 'number', unsortable: false },
    { name: 'IMSI', key: 'imsi', link: false },
    { name: 'Статус', key: 'status',
        critery ({status}) {
        console.log(status)
            if(status && status !== "0"){
                return createTooltip('primary', "Активна");
            }
            else {
                return createTooltip('warning', "Не активна");
            }



        }},
    { name: 'Траффик', key: 'traffic', link: false },
    { name: 'Расход', key: 'expense', link: false },
    { name: 'Оборудование', key: 'equipment', link: true },
    { name: 'Пользователь', key: 'userName', link: true },

];

export const getTableFields = (data, props) => data.map(sim => ({
    provider: "Гудлайн",
    userId: sim.userId,
    userName: sim.userName,
    imsi: sim.imsi,
    number: sim.number,
    equipment: getEquipment(sim),
    status: Number(Number(sim.traffic).toFixed(3)),
    traffic: Number(sim.traffic)?Number(Number(sim.traffic).toFixed(3)):"",
    expense: Number(sim.expense)?Number(Number(sim.expense).toFixed(3)):"",
    props,
    route: `/fiscalAll/controller/${sim.controllerId || sim.terminalId}`
}));
