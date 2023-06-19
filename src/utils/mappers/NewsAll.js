

const mapType = type => {
    switch (type) {
        case 'news': return 'Новость';
        case 'info': return 'Информация';
        case 'partnerInfo': return 'Партнер инфо';
        case 'instr': return 'Инструкция';
        default: return '?';
    }
}

export const getTableHeaders = () => [
    { name: 'ID', key: 'id', link: true },
    { name: 'Тип', key: 'type', link: true },
    { name: 'Заголовок', key: 'header', link: true,
        critery ({ type, header, smsStatus, mailStatus }) {

        if(type !== "Новость"){
            return header
        }
        if(!smsStatus && !mailStatus){
            return header
        }
        let string = ""
        if(smsStatus){
            const sms = JSON.parse(smsStatus)
            string += `SMS: ${sms.all}/${sms.success}/${sms.error} `
        }
        if(mailStatus){
            const mail = JSON.parse(mailStatus)
            string += `MAIL: ${mail.all}/${mail.success}/${mail.error}`
        }

        return header + " (" + string + ")"


        }, },
    { name: 'Активный', key: 'active', link: true },
    { name: 'Дата', key: 'date' }
];

export const getTableFields = (data, props) => data.map(news => ({
    id: news.id,
    type: mapType(news.type),
    header: news.header,
    active: news.active,
    date: news.date,
    smsStatus: news.smsStatus,
    mailStatus: news.mailStatus,
    props,
    route: `/fiscalAll/news/${news.id}/${news.type}`
}));
