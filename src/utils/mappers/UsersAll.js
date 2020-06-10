


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false , link: true },
    { name: 'Компания', key: 'companyName', unsortable: false , link: true },
    { name: 'ИНН', key: 'inn', unsortable: false  },
    { name: 'Баланс', key: 'balance', unsortable: false  },
    { name: 'Списание', key: 'dailyBill', unsortable: false  },
    { name: 'Телефон', key: 'phone', unsortable: false},
    { name: 'Почта', key: 'email', unsortable: false  },
    { name: 'Статус', key: 'role', link: false },


];

export const getTableFields = (data, props) => data.map(user => ({
    id: user.id,
    phone: user.phone,
    balance: user.billing.balance,
    dailyBill: (user.billing.dailyBill*(new Date().daysInMonth())/10).toFixed(0) * 10,
    email: user.email,
    role: user.role,
    inn: user.legalInfo ? user.legalInfo.inn : "Не указано",
    companyName:  user.legalInfo ? user.legalInfo.companyName : "Не указано",
    props,
    route: `/fiscalAll/user/${user.id}`
}));
