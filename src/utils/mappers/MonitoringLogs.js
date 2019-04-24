import { getTimestamp } from '@/utils';

export const getTableHeaders = () => [
    { name: 'Событие', key: 'type' },
    { name: 'Время', key: 'timestamp' },
    { name: 'Причина', key: 'message' }
];

export const getTableFields = data => data.map(({ type, timestamp, message }) => ({
    type,
    timestamp: getTimestamp(timestamp),
    message,
    class: ''
}));
