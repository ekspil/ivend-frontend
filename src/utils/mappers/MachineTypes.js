
export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false},
    { name: 'Название', key: 'name', unsortable: false },


];

export const getTableFields = (data, props) => data.map(type => ({
    id: type.id,
    name: type.name,
    props,
    route: `#`
}));
