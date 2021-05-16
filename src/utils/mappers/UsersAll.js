


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false , link: true },
    { name: 'Компания', key: 'companyName', unsortable: false , link: true },
    { name: 'ИНН', key: 'inn', unsortable: false  },

    { name: 'Статус', key: 'role', link: false },
    { name: 'Баланс', key: 'balance', unsortable: false  },
    { name: 'Списание', key: 'dailyBill', unsortable: false  },
    { name: 'Телефон', key: 'phone', unsortable: false},
    { name: 'Почта', key: 'email', unsortable: false  },
    { name: 'Партнер', key: 'partnerId', link: false },


];

export const getTableFields = (data, props) => data.map(user => ({
    id: user.id,
    phone: user.phone,
    balance: Number(Number(user.billing.balance).toFixed(2)),
    dailyBill: (user.billing.dailyBill*(new Date().daysInMonth())/100).toFixed(0) * 100,
    email: user.email,
    role: user.role,
    partnerId: user.partnerId,
    inn: user.legalInfo ? user.legalInfo.inn : "Не указано",
    companyName:  user.legalInfo ? user.legalInfo.companyName : "Не указано",
    city:  user.legalInfo ? user.legalInfo.city : "Не указано",
    actualAddress:  user.legalInfo ? user.legalInfo.actualAddress : "Не указано",
    ogrn:  user.legalInfo ? user.legalInfo.ogrn : "Не указано",
    legalAddress:  user.legalInfo ? user.legalInfo.legalAddress : "Не указано",
    director:  user.legalInfo ? user.legalInfo.director : "Не указано",
    directorPhone:  user.legalInfo ? user.legalInfo.directorPhone : "Не указано",
    directorEmail:  user.legalInfo ? user.legalInfo.directorEmail : "Не указано",
    contactPerson:  user.legalInfo ? user.legalInfo.contactPerson : "Не указано",
    contactPhone:  user.legalInfo ? user.legalInfo.contactPhone : "Не указано",
    contactEmail:  user.legalInfo ? user.legalInfo.contactEmail : "Не указано",
    sno:  user.legalInfo ? user.legalInfo.sno : "Не указано",
    timeZone:  user.legalInfo ? user.legalInfo.timeZone : "Не указано",
    kpp:  user.legalInfo ? user.legalInfo.kpp : "Не указано",
    props,
    route: `/fiscalAll/user/${user.id}`
}));
