


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Заголовок', key: 'header', link: true },
    { name: 'Активный', key: 'active', link: true },
    { name: 'Дата', key: 'date' }
];

export const getTableFields = (data, props) => data.map(news => ({
    id: news.id,
    header: news.header,
    active: news.active,
    date: news.date,
    props,
    route: `/fiscalAll/news/${news.id}`
}));
