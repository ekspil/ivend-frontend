


export const getTableHeaders = () => [
    { name: 'Компания', key: 'inn', unsortable: false , link: true },
    { name: 'ИНН', key: 'companyName', unsortable: false  },
    { name: 'Телефон', key: 'phone', unsortable: false , link: true},
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
