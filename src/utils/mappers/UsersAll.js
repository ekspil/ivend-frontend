


export const getTableHeaders = () => [
    { name: 'ID', key: 'id', unsortable: false , link: true },
    { name: 'Компания', key: 'companyName', unsortable: false , link: true },
    { name: 'ИНН', key: 'inn', unsortable: false  },

    { name: 'Баланс', key: 'balance', unsortable: false  },
    { name: 'Списание', key: 'dailyBill', unsortable: false  },
    { name: 'Телефон', key: 'phone', unsortable: false},
    { name: 'Почта', key: 'email', unsortable: false  },

    { name: 'Статус', key: 'role', link: false },
    { name: 'Партнер', key: 'partnerId', link: false },
    { name: 'Менеджер', key: 'managerId', critery ({managerId, props}) {
        if(!props.managers) return ""
          const manager = props.managers.find(item => item.id === managerId)
            if(!manager) return ""
            return manager.name

        }, link: false },


];

export const getTableFields = (data, props) => data.map(user => ({
    id: user.id,
    phone: user.phone,
    balance: Number(Number(user.billing.balance).toFixed(2)),
    dailyBill: (user.billing.dailyBill*(new Date().daysInMonth())/50).toFixed(0) * 50,
    email: user.email,
    role: user.role,
    partnerId: user.partnerId,
    managerId: user.managerId,
    inn: user.inn || "Не указано",
    companyName:  (user && user.companyName ? user.companyName.split(" ")[0] : "Не указано") + " " +  (user && user.companyName && user.companyName.split(" ")[1] ? user.companyName.split(" ")[1] : ""),
    props,
    route: `/fiscalAll/user/${user.id}`
}));
