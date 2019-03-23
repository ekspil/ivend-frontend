import { map } from 'ramda';

export const getTableHeaders = () => [
    { name: 'Автомат', key: 'number' },
    { name: 'Название', key: 'name' },
    { name: 'Место установки', key: 'place' },
    { name: 'Группа', key: 'groupName' },
    { name: 'Тип', key: 'typeName' },
    { name: 'Модель', key: 'equipmentName' }
];

export const getTableFields = data => map(({ name, place, number, group, type, equipment }) => ({
    name,
    number,
    place,
    groupName: group.name,
    typeName: type.name,
    equipmentName: equipment.name
}), data);
