


export const getTableHeaders = () => [
    { name: 'Компания', key: 'companyName', unsortable: false , link: true },
    { name: 'ИНН', key: 'inn', unsortable: false  },
    { name: 'Телефон', key: 'phone', unsortable: false},
    { name: 'Почта', key: 'email', unsortable: false  },
    { name: 'Роль', key: 'role', link: false },


];

export const getTableFields = (data, props) => data.map(user => ({
    phone: user.phone,
    email: user.email,
    role: user.role,
    inn: user.legalInfo.inn,
    companyName: user.legalInfo.companyName,
    props,
    route: `/fiscalAll/user/${user.id}`
}));
