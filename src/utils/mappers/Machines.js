export const getTableHeaders = () => [
    { name: 'Автомат', key: 'name', link: true  },
    { name: 'Номер', key: 'number', link: false },
    { name: 'Адрес', key: 'place' },
    { name: 'Группа', key: 'groupName' },
    { name: 'Тип', key: 'typeName' },
    { name: 'Модель', key: 'equipmentName' },
    {
        name: 'Касса',
        key: 'registrationTime',
        critery ({ fiscalizationMode, kkt}) {


            if(fiscalizationMode === "UNAPPROVED" && kkt) return kkt.kktFactoryNumber
            if(fiscalizationMode === "UNAPPROVED" && !kkt) return "Все ККМ"
            return "Без кассы"

        }
    },
    { name: 'Контроллер', key: 'controllerName' }
];

export const getTableFields = (data, props) => data.map(({ id, name, place, number, group, type, equipment, kkt, controller }) => ({
    id,
    name,
    number,
    place,
    groupName: group.name,
    typeName: type.name,
    equipmentName: equipment.name,
    controllerName: controller?.uid || '',
    controllerId: controller?.id || '',
    kkt,
    fiscalizationMode: controller?.fiscalizationMode,

    props,
    route: `/machine/edit/${id}`
}));
