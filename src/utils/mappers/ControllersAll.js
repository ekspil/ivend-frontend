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

const mapFiscalizationMode = (mode) => {
    return {
        NO_FISCAL: "Нефискальный",
        UNAPPROVED: "Без подтверждения",
        APPROVED: "С подтверждением"
    }[mode]
}

export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Контроллер', key: 'uid', link: true },
    { name: 'Пользователь', key: 'user', link: true },
    { name: 'Состояние', key: 'status', unsortable: false, raw: true },
    { name: 'Прошивка', key: 'firmwareId', unsortable: true },
    { name: 'Режим', key: 'mode', unsortable: false },
    { name: 'Автомат', key: 'machine', unsortable: true },
    { name: 'Фискализация', key: 'fiscalizationMode', unsortable: false },
    { name: 'Удалённый принтер', key: 'remotePrinterId', unsortable: true },
];

export const getTableFields = (data, props) => data.map(controller => ({
    id: controller.id,
    uid: controller.uid,
    user: controller.user.legalInfo ? controller.user.legalInfo.companyName : "-",
    status: getStatus(controller.status),
    firmwareId: controller.firmwareId || '-',
    mode: controller.mode || '-',
    fiscalizationMode: controller.fiscalizationMode ? mapFiscalizationMode(controller.fiscalizationMode) : '-',
    machine: controller.machine?.name || '-',
    remotePrinterId: controller.remotePrinterId,
    props,
    route: `/fiscalAll/controller/${controller.id}`
}));
