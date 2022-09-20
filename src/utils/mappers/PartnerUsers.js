


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false},
    { name: 'Компания', key: 'companyName', unsortable: false },
    { name: 'ИНН', key: 'inn', unsortable: false  },
    { name: 'Контроллеры', key: 'controllers', unsortable: false  },
    { name: 'Терминалы', key: 'terminals', unsortable: false  },
    { name: 'Кассы', key: 'kkms', unsortable: false  },
    { name: 'Баланс', key: 'balance', unsortable: false  },
    { name: 'Списание', key: 'dailyBill', unsortable: false  },
    { name: 'Оплата', key: 'monthPay', unsortable: false  },
    { name: 'Комиссия', key: 'fee', unsortable: false  },
    { name: 'Статус', key: 'role', link: false },
    //{ name: 'Партнер', key: 'partnerId', link: false },


];

export const getTableFields = (data, props) => data.map(user => ({
    id: user.id,
    phone: user.phone,
    monthPay: user.monthPay,
    fee: user.partnerFee.toFixed(2),
    kkms: user.kkts?.length || 0,
    controllers: user.controllers?.length || 0,
    terminals: user.controllers?.filter(c=> (c.simCardNumber && c.simCardNumber !== "0"&& c.simCardNumber !== "false")).length || 0,
    balance: Number(Number(user.billing.balance).toFixed(2)),
    dailyBill: (user.billing.dailyBill*(new Date().daysInMonth())/50).toFixed(0) * 50,
    email: user.email,
    role: user.role,
    partnerId: user.partnerId,
    inn: user.legalInfo ? user.legalInfo.inn : "Не указано",
    companyName:  user.legalInfo ? user.legalInfo.companyName : "Не указано",
    props,
    route: `/fiscalAll/user/${user.id}`
}));
