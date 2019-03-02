import { map } from 'ramda';
import { getTimestamp } from '@/utils';

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
    { name: 'Название', key: 'name', link: true },
    { name: 'Контроллер', key: 'uid' },
    { name: 'Модель', key: 'equipmentName', unsortable: true },
    { name: 'Состояние', key: 'status', unsortable: true, raw: true },
    { name: 'Прошивка', key: 'firmwareId', unsortable: true },
    { name: 'Режим', key: 'mode', unsortable: true },
    { name: 'Фискализация', key: 'fiscalRegistrar', unsortable: true }
];

export const getTableFields = data => map(controller => ({
    name: controller.name,
    uid: controller.uid,
    equipmentName: controller.equipment?.equipmentName || '-',
    status: getStatus(controller.status),
    firmwareId: controller.lastState?.firmwareId || '-',
    mode: controller.mode || '-',
    fiscalRegistrar: controller.fiscalRegistrar?.name || '-',

    route: `/controllers/edit/${controller.id}`
}), data);
