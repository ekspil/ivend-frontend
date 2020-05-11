

const mapType = type => {
    switch (type) {
        case 'news': return 'Новость';
        case 'info': return 'Информация';
        case 'instr': return 'Инструкция';
        default: return '?';
    }
}

export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Тип', key: 'type', link: true },
    { name: 'Заголовок', key: 'header', link: true },
    { name: 'Активный', key: 'active', link: true },
    { name: 'Дата', key: 'date' }
];

export const getTableFields = (data, props) => data.map(news => ({
    id: news.id,
    type: mapType(news.type),
    header: news.header,
    active: news.active,
    date: news.date,
    props,
    route: `/fiscalAll/news/${news.id}/${news.type}`
}));
