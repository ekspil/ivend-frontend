
export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false},
    { name: 'Название', key: 'name', unsortable: false },
    { name: 'Тип автомата', key: 'type', unsortable: false },


];

export const getTableFields = (data, props) => data.map(model => ({
    id: model.id,
    name: model.name,
    type: model.type,
    props,
    route: `#`
}));
