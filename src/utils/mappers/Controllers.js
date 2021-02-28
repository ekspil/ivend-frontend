
import { getTerminal, getMode, getStatus, mapFiscalizationMode } from "@/utils/lists/Controller"


export const getTableHeaders = () => [
    { name: 'Контроллер', key: 'uid', link: true, ltOrder: true },
    { name: 'Состояние', key: 'status', raw: true },
    { name: 'Прошивка', key: 'firmwareId'},
    { name: 'Режим', key: 'mode'},
    { name: 'Терминал', key: 'bankTerminalMode'},
    { name: 'Фискализация', key: 'fiscalizationMode'},
   // { name: 'Принтер', key: 'remotePrinterId', unsortable: true },
    { name: 'Автомат', key: 'machine' },
];

export const getTableFields = (data, props) => data.map(controller => ({
    id: controller.id,
    uid: controller.uid,
    status: getStatus(controller.status),
    firmwareId: controller.firmwareId || '-',
    mode: getMode(controller.mode) || '-',
    fiscalizationMode: controller.fiscalizationMode ? mapFiscalizationMode(controller.fiscalizationMode) : '-',
    machine: controller.machine?.name || '-',
    machineId: controller.machine?.id || '-',
    remotePrinterId: controller.remotePrinterId,
    bankTerminalMode: getTerminal(controller.bankTerminalMode),
    props,
    route: `/controllers/edit/${controller.id}`
}));
