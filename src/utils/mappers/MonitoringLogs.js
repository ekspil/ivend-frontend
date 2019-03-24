import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
    { name: 'Событие', key: 'type' },
    { name: 'Время', key: 'time' },
    { name: 'Причина', key: 'message' }
];

export const getTableFields = data => data.map(({ type, time, message }) => ({
    type,
    time: getTimestamp(time),
    message,
    class: ''
}));
