function showPartner(id){
    if(!id) return "Для всех"
    return "Партнер №"+id
}

export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false},
    { name: 'Партнер', key: 'partnerId', unsortable: false },
    { name: 'Телеметрия', key: 'telemetry', unsortable: true  },
    { name: 'Эквайринг', key: 'acquiring', unsortable: true  },
    { name: 'Фискализация', key: 'fiscal', unsortable: true  },
    { name: 'Действует с', key: 'startedAt', unsortable: true  }


];

export const getTableFields = (data, props) => data.map(tariff => ({
    id: tariff.id,
    partnerId: showPartner(tariff.partnerId),
    telemetry: tariff.telemetry,
    acquiring: tariff.acquiring,
    fiscal: tariff.fiscal,
    startedAt: new Date(tariff.startedAt).toLocaleDateString(),
    props,
    route: `#`
}));
