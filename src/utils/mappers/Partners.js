
function dailyBill(vendors){
    return (vendors?.reduce((acc, item)=> {
        let dayBill = item.billing?.dailyBill
        return acc + Number((dayBill*(new Date().daysInMonth())/100).toFixed(0)) * 100

    }, 0)).toFixed(2)
}
function balance(vendors){
    return (vendors?.reduce((acc, item)=> {
        let balance = item.billing?.balance
        return acc + balance

    }, 0)).toFixed(2)
}

function terminals(vendors){

    return (vendors?.reduce((acc, item)=> {
        const count = (item.controllers?.filter(c=> (c.simCardNumber && c.simCardNumber !== "0"&& c.simCardNumber !== "false"))).length

        return acc + count

    }, 0)).toFixed(0)
}


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false},
    { name: 'Компания', key: 'companyName', unsortable: false },
    { name: 'ИНН', key: 'inn', unsortable: false  },
    { name: 'Вендоры', key: 'vendors', unsortable: false  },
    { name: 'Контроллеры', key: 'controllers', unsortable: false  },
    { name: 'Терминалы', key: 'terminals', unsortable: false  },
    { name: 'Кассы', key: 'kkms', unsortable: false  },
    { name: 'Баланс', key: 'balance', unsortable: false  },
    { name: 'Списание', key: 'dailyBill', unsortable: false  },
    { name: 'Оплата', key: 'monthPay', unsortable: false  },
    { name: 'Комиссия', key: 'fee', unsortable: false  },
    //{ name: 'Партнер', key: 'partnerId', link: false },


];

export const getTableFields = (data, props) => data.map(user => ({
    id: user.id,
    phone: user.phone,
    monthPay: (user.vendors?.reduce((acc, item)=>acc+item.monthPay, 0)).toFixed(2),
    fee: (user.vendors?.reduce((acc, item)=>acc+item.partnerFee, 0)).toFixed(2),
    kkms: (user.vendors?.reduce((acc, item)=>acc+item.kkts?.length, 0)).toFixed(0) || 0,
    controllers: (user.vendors?.reduce((acc, item)=>acc+item.controllers?.length, 0)).toFixed(0) || 0,
    terminals: terminals(user.vendors),
    balance: balance(user.vendors),
    dailyBill: dailyBill(user.vendors),
    vendors: user.vendors?.length,
    inn: user.legalInfo ? user.legalInfo.inn : "Не указано",
    companyName:  user.legalInfo ? user.legalInfo.companyName : "Не указано",
    props,
    route: `/fiscalAll/user/${user.id}`
}));
