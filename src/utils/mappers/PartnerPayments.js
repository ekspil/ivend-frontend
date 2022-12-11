


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false},
    { name: 'Сумма выплаты', key: 'controllerFee', unsortable: false  },
    { name: 'Дата', key: 'createdAt', unsortable: false,
        critery ({createdAt}) {
            const date = new Date(createdAt)
            return date.toLocaleDateString()



        } },


];

export const getTableFields = (data, props) => data.map(({controllerFee, createdAt, id}) => ({
    id,
    createdAt,
    controllerFee: controllerFee.toFixed(2),
    props,
}));
