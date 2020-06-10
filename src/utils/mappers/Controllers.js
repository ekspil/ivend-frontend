
import { getTerminal, getMode, getStatus, mapFiscalizationMode } from "@/utils/lists/Controller"


export const getTableHeaders = () => [
    { name: 'Контроллер', key: 'uid', link: true, ltOrder: true },
    { name: 'Состояние', key: 'status', unsortable: true, raw: true },
    { name: 'Прошивка', key: 'firmwareId', unsortable: true },
    { name: 'Режим', key: 'mode', unsortable: true },
    { name: 'Фискализация', key: 'fiscalizationMode', unsortable: true },
    { name: 'Принтер', key: 'remotePrinterId', unsortable: true },
    { name: 'Автомат', key: 'machine', unsortable: true },
    { name: 'Терминал', key: 'bankTerminalMode', unsortable: true },
];

export const getTableFields = (data, props) => data.map(controller => ({
    id: controller.id,
    uid: controller.uid,
    status: getStatus(controller.status),
    firmwareId: controller.firmwareId || '-',
    mode: getMode(controller.mode) || '-',
    fiscalizationMode: controller.fiscalizationMode ? mapFiscalizationMode(controller.fiscalizationMode) : '-',
    machine: controller.machine?.name || '-',
    remotePrinterId: controller.remotePrinterId,
    bankTerminalMode: getTerminal(controller.bankTerminalMode),
    props,
    route: `/controllers/edit/${controller.id}`
}));
