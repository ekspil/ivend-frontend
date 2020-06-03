const getStatus = status => {
    switch (status) {
        case 'ENABLED':
            return '<span class="status-icon bg-success"></span> Активирован';
        case 'DISABLED':
            return '<span class="status-icon bg-danger"></span> Деактивирован';
        case 'PAUSED':
            return '<span class="status-icon bg-secondary"></span> Приостановлен';
        case 'DEBUG':
            return '<span class="status-icon bg-yellow"></span> Отладка';
        case 'TRAINING':
            return '<span class="status-icon bg-info"></span> Обучение';
    }
};

import { getTerminal, getMode } from "@/utils/lists/Controller"


const mapFiscalizationMode = (mode) => {
    return {
        NO_FISCAL: "Нефискальный",
        UNAPPROVED: "Без подтверждения",
        APPROVED: "С подтверждением"
    }[mode]
}

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
