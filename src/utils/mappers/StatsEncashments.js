export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Инкассация', key: 'encashmentDate'},
	{ name: 'Кол-во продаж', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Наличные', key: 'cashAmount' }
];

const getDateStr = (date) => `${date.toLocaleDateString('ru-RU')} ${date.toLocaleTimeString('ru-RU')}`

export const getTableFields = data => data.map(({ id, name, lastEncashment, salesByEncashment }) => ({
	id,
	name,
	encashmentDate: lastEncashment ? getDateStr(new Date(lastEncashment.timestamp)): null,
	...salesByEncashment,

	route: `/machine/${id}/encashments`
}));
