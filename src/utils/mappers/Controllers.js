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

export const getTableHeaders = () => [
    { name: 'Контроллер', key: 'uid', link: true },
    { name: 'Состояние', key: 'status', unsortable: true, raw: true },
    { name: 'Прошивка', key: 'firmwareId', unsortable: true },
    { name: 'Режим', key: 'mode', unsortable: true },
    { name: 'Автомат', key: 'machine', unsortable: true },
    { name: 'Фискализация', key: 'fiscalRegistrar', unsortable: true }
];

export const getTableFields = (data, props) => data.map(controller => ({
    id: controller.id,
    uid: controller.uid,
    status: getStatus(controller.status),
    firmwareId: controller.firmwareId || '-',
    mode: controller.mode || '-',
    fiscalRegistrar: controller.fiscalRegistrar?.name || '-',
    machine: controller.machine?.name || '-',

    props,
    route: `/controllers/edit/${controller.id}`
}));
