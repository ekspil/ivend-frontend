export const getTableHeaders = () => [
    { name: 'Автомат', key: 'name', link: true  },
    { name: 'Номер', key: 'number', link: false },
    { name: 'Адрес', key: 'place' },
    { name: 'Группа', key: 'groupName' },
    { name: 'Тип', key: 'typeName' },
    { name: 'Модель', key: 'equipmentName' },
    { name: 'Контроллер', key: 'controllerName' }
];

export const getTableFields = (data, props) => data.map(({ id, name, place, number, group, type, equipment, controller }) => ({
    id,
    name,
    number,
    place,
    groupName: group.name,
    typeName: type.name,
    equipmentName: equipment.name,
    controllerName: controller?.uid || '-',
    controllerId: controller?.id || '-',

    props,
    route: `/machine/edit/${id}`
}));
