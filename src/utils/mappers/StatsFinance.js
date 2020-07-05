export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Контроллер', key: 'controller'},
	{ name: 'Кол-во продаж', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Наличные', key: 'cashAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },

];

export const getTableFields = data => data.map(({ id, name, salesSummary, controller }) => ({
	id,
	name,
	controller: controller?.uid,
	...salesSummary,

	route: `/stats/${id}`
})).filter(e => e.salesCount);
