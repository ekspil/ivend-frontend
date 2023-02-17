import { createTooltip } from '@/utils';
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
    { name: 'ID', key: 'id', unsortable: false, link: true},
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
    { name: 'Посл.выплата', key: 'lastPayment', unsortable: false,
        critery({lastPayment, lastPaymentStatus, lastPaymentId}) {
            if(!lastPayment) lastPayment = "Выплат нет"
            if(lastPaymentStatus === 'WAITING'){

                return createTooltip("warning", lastPayment, false, false, lastPaymentId);
            }
            else {

                return createTooltip("primary", lastPayment, false, false, lastPaymentId);
            }
        }
    },
    { name: 'Сумма посл.выплаты', key: 'lastPaymentAmount', unsortable: false,
        critery({lastPaymentAmount, lastPaymentStatus, lastPaymentId}) {
            if(!lastPaymentAmount) lastPaymentAmount = "Выплат нет"
            else lastPaymentAmount = Number(lastPaymentAmount).toFixed(2)
            if(lastPaymentStatus === 'WAITING'){


                return createTooltip("warning", lastPaymentAmount, false, false, lastPaymentId);
            }
            else {

                return createTooltip("primary", lastPaymentAmount, false, false, lastPaymentId);
            }
        }  },
    { name: 'Выплат', key: 'payments', unsortable: false  },
    { name: 'Сумма выплат', key: 'paymentsAmount', unsortable: false  },
    //{ name: 'Партнер', key: 'partnerId', link: false },


];

export const getTableFields = (data, props) => data.map(user => ({
    id: user.id,
    phone: user.phone,
    monthPay: (user.vendors?.reduce((acc, item)=>acc+item.monthPay, 0)).toFixed(2),
    fee: (user.partnerFee).toFixed(2),
    kkms: (user.vendors?.reduce((acc, item)=>acc+item.kkts?.length, 0)).toFixed(0) || 0,
    controllers: (user.vendors?.reduce((acc, item)=>acc+item.controllers?.length, 0)).toFixed(0) || 0,
    terminals: terminals(user.vendors),
    balance: balance(user.vendors),
    dailyBill: dailyBill(user.vendors),
    vendors: user.vendors?.length,
    inn: user.legalInfo ? user.legalInfo.inn : "Не указано",
    companyName:  user.legalInfo ? user.legalInfo.companyName : "Не указано",
    lastPayment: user.partnerInfo?.lastPayment ? new Date(user.partnerInfo?.lastPayment).toLocaleDateString() : "",
    lastPaymentAmount: user.partnerInfo?.lastPaymentAmount,
    lastPaymentStatus: user.partnerInfo?.lastPaymentStatus || "SUCCESS",
    lastPaymentId: user.partnerInfo?.lastPaymentId,
    payments: user.partnerInfo?.payments,
    paymentsAmount: user.partnerInfo?.paymentsAmount,
    props: {
        ...props,
        sum: user.partnerFee
    },
    route: `/fiscalAll/userEdit/${user.id}?from=partner`
}));
