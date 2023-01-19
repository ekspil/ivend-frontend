


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false},
    { name: 'Сумма выплаты', key: 'controllerFee', unsortable: false  },
    { name: 'Дата', key: 'createdAt', unsortable: false,
        critery ({createdAt}) {
            const date = new Date(createdAt)
            return date.toLocaleDateString()



        } },
    { name: 'Статус', key: 'status', unsortable: false  },


];

export const getTableFields = (data, props) => data.map(({controllerFee, createdAt, id, status}) => ({
    id,
    createdAt,
    status,
    controllerFee: controllerFee.toFixed(2),
    props,
}));
