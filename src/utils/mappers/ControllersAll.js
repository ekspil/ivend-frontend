
import { createTooltip, getTimestamp, getGradation, getWordEnding } from '@/utils';
import { getTerminal, getMode, mapFiscalizationMode, getStatus } from "@/utils/lists/Controller"


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Контроллер', key: 'uid', link: true },
    { name: 'Пользователь', key: 'user', link: true },
    {
        name: 'Связь',
        key: 'registrationTime',
        critery ({ registrationTime, lastSaleTime}) {


            let latestTime = registrationTime > lastSaleTime ? registrationTime : lastSaleTime;
            const localeTimestamp = getTimestamp(latestTime);

            if (localeTimestamp !== '-') {
                const gradation = getGradation(Date.now() - latestTime);

                if (gradation.seconds < 60) {
                    return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.seconds, 'секунда')}`);
                } else if (gradation.minutes < 15) {
                    return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
                } else if (gradation.minutes >= 15 && gradation.minutes <= 30) {
                    return createTooltip('warning', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
                } else if (gradation.minutes > 30 && gradation.hours < 24) {
                    return createTooltip('alert', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')}`);
                } else if (gradation.days > 0) {
                    return createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`);
                }
            }

            return createTooltip('info', 'НЕТ');
        }
    },
    // {
    //     name: 'Продажи',
    //     key: 'lastSaleTime',
    //     critery ({ lastSaleTime }) {
    //         const localeTimestamp = getTimestamp(lastSaleTime);
    //         if (localeTimestamp !== '-') {
    //             const gradation = getGradation(Date.now() - lastSaleTime);
    //
    //             if (gradation.seconds < 60) {
    //                 return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.minutes, 'секунда')}`);
    //             } else if (gradation.minutes < 60) {
    //                 return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
    //             } else if (gradation.hours < 24) {
    //                 return createTooltip('warning', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')}`);
    //             }
    //
    //             return createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`);
    //         }
    //
    //         return createTooltip('info', 'НЕТ');
    //     }
    // },
    {
        name: 'Регистрация',
        key: 'controllerRegistrationTime',
        critery ({ controllerRegistrationTime }) {
            const localeTimestamp = getTimestamp(controllerRegistrationTime);
            if (localeTimestamp !== '-') {
                return createTooltip('primary', localeTimestamp);
            }

            return createTooltip('info', 'ОТКЛ');
        }
    },
    { name: 'Работа', key: 'status', unsortable: false, raw: true },
    { name: 'Прошивка', key: 'firmwareId', unsortable: true },
    { name: 'Режим', key: 'mode', unsortable: false },
  //  { name: 'Автомат', key: 'machine', unsortable: true },
    {   name: 'Режим терминала',
        key: 'simCardNumber',
        unsortable: true,
        critery ({simCardNumber, bankTerminalMode}) {
            if(!simCardNumber || simCardNumber === "0" || simCardNumber === "false"){
                return createTooltip('info', bankTerminalMode);
            }
            else{
                return createTooltip('primary', bankTerminalMode);
            }
        }
    },
    {
        name: 'Терминал',
        key: 'terminal',
        critery ({terminal}) {
            switch (terminal) {
                case 'OK':
                    return createTooltip('primary', "Ок");
                case 'ERROR':
                    return createTooltip('alert', "Ошибка");
                case '24H':
                    return createTooltip('warning', "24 часа");

                case 'OK (100руб/мес)':
                    return createTooltip('primary', "Ок");
                case 'ERROR (100руб/мес)':
                    return createTooltip('alert', "Ошибка");
                case '24H (100руб/мес)':
                    return createTooltip('warning', "24 часа");


                default:
                    return createTooltip('info', "ОТКЛ");
            }}
    },
    { name: 'Фискализация', key: 'fiscalizationMode', unsortable: false },
    { name: 'Принтер', key: 'remotePrinterId', unsortable: true },
];

export const getTableFields = (data, props) => data.map(controller => ({
    id: controller.id,

    attentionRequired: controller?.lastState?.attentionRequired,
    controllerRegistrationTime: controller?.registrationTime,
    registrationTime: controller?.lastState?.registrationTime,
    lastSaleTime: controller?.machine?.lastSaleTime,
    uid: controller.uid,
    sim: controller.sim,
    simCardNumber: controller.simCardNumber,
    user: (controller.user &&  controller.user.companyName ? controller.user.companyName.split(" ")[0] : "-")  +  " " +   (controller.user &&  controller.user.companyName  &&  controller.user.companyName.split(" ")[1]? controller.user.companyName.split(" ")[1] : ''),
    status: getStatus(controller.status),
    firmwareId: controller.firmwareId || '-',
    mode: getMode(controller.mode) || '-',
    terminal: controller.machine?.terminalStatus,
    fiscalizationMode: controller.fiscalizationMode ? mapFiscalizationMode(controller.fiscalizationMode) : '-',
    remotePrinterId: controller.remotePrinterId,
    bankTerminalMode: getTerminal(controller.bankTerminalMode),
    props,
    route: `/fiscalAll/controller/${controller.id}`

}));
