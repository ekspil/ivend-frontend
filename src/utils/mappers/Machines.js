import gql from 'graphql-tag';

export const getTableHeaders = () => [
    { name: 'Автомат', key: 'number', link: true },
    { name: 'Название', key: 'name' },
    { name: 'Место установки', key: 'place' },
    { name: 'Группа', key: 'groupName' },
    { name: 'Тип', key: 'typeName' },
    { name: 'Модель', key: 'equipmentName' },
    { name: 'Контроллер', key: 'controllerName' }
];

export const getTableFields = (data, apollo) => data.map(({ id, name, place, number, group, type, equipment, controller }) => ({
    id,
    name,
    number,
    place,
    groupName: group.name,
    typeName: type.name,
    equipmentName: equipment.name,
    controllerName: controller?.uid || '-',

    props: {
        removable: async callback => {
            await apollo.mutate({
                mutation: gql`
                    mutation ($id: Int!) {
                        deleteMachine (id: $id) {
                            name
                        }
                    }
                `,
                variables: { id }
            });

            callback();
        }
    },
    route: `/machine/edit/${id}`
}));
