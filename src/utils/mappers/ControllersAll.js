
import { createTooltip, getTimestamp, getGradation, getWordEnding } from '@/utils';
import { getTerminal, getMode, mapFiscalizationMode, getStatus } from "@/utils/lists/Controller"


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Контроллер', key: 'uid', link: true },
    { name: 'Пользователь', key: 'user', link: true },
    {
        name: 'Связь',
        key: 'registrationTime',
        critery ({ registrationTime, lastSaleTime }) {
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
                    createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`);
                }
            }

            return createTooltip('info', 'НЕТ');
        }
    },
    {
        name: 'Продажи',
        key: 'lastSaleTime',
        critery ({ lastSaleTime }) {
            const localeTimestamp = getTimestamp(lastSaleTime);
            if (localeTimestamp !== '-') {
                const gradation = getGradation(Date.now() - lastSaleTime);

                if (gradation.seconds < 60) {
                    return createTooltip('primary', `${gradation.seconds} ${getWordEnding(gradation.minutes, 'секунда')}`);
                } else if (gradation.minutes < 60) {
                    return createTooltip('primary', `${gradation.minutes} ${getWordEnding(gradation.minutes, 'минута')}`);
                } else if (gradation.hours < 24) {
                    return createTooltip('warning', `${gradation.hours} ${getWordEnding(gradation.hours, 'час')}`);
                }

                return createTooltip('alert', `${gradation.days} ${getWordEnding(gradation.days, 'день')}`);
            }

            return createTooltip('info', 'НЕТ');
        }
    },
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
    { name: 'Состояние', key: 'status', unsortable: false, raw: true },
    { name: 'Прошивка', key: 'firmwareId', unsortable: true },
    { name: 'Режим', key: 'mode', unsortable: false },
    { name: 'Автомат', key: 'machine', unsortable: true },
    {   name: 'Терминал',
        key: 'simCardNumber',
        unsortable: true,
        critery ({simCardNumber}) {
            if(!simCardNumber || simCardNumber === "0" || simCardNumber === "false"){
                return createTooltip('info', 'ОТКЛ');
            }
            else{
                return createTooltip('primary', "ВКЛ");
            }
        }
    },
    { name: 'Терминал(название)', key: 'bankTerminalMode', unsortable: true },
    { name: 'Фискализация', key: 'fiscalizationMode', unsortable: false },
    { name: 'Удалённый принтер', key: 'remotePrinterId', unsortable: true },
];

export const getTableFields = (data, props) => data.map(controller => ({
    id: controller.id,
    controllerRegistrationTime: controller?.registrationTime,
    lastSaleTime: controller?.machine?.lastSaleTime,
    registrationTime: controller?.lastState?.registrationTime,
    uid: controller.uid,
    simCardNumber: controller.simCardNumber,
    user: controller.user.legalInfo ? controller.user.legalInfo.companyName : "-",
    status: getStatus(controller.status),
    firmwareId: controller.firmwareId || '-',
    mode: getMode(controller.mode) || '-',
    fiscalizationMode: controller.fiscalizationMode ? mapFiscalizationMode(controller.fiscalizationMode) : '-',
    machine: controller.machine?.name || '-',
    remotePrinterId: controller.remotePrinterId,
    bankTerminalMode: getTerminal(controller.bankTerminalMode),
    props,
    route: `/fiscalAll/controller/${controller.id}`
}));
