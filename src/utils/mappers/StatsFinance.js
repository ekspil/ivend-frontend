export const getTableHeaders = () => [
	{ name: 'Автомат', key: 'name', link: true },
	{ name: 'Кол-во продаж', key: 'salesCount' },
	{ name: 'Сумма', key: 'overallAmount' },
	{ name: 'Наличные', key: 'cashAmount' },
	{ name: 'Безнал', key: 'cashlessAmount' },
	{ name: 'Контроллер', key: 'controller'},

];

export const getTableFields = data => data.map(({ id, name, salesSummary, controller }) => ({
	id,
	name,
	controller: controller?.uid,
	salesCount: Number(salesSummary.salesCount.toFixed(2)),
	overallAmount: Number(salesSummary.overallAmount.toFixed(2)),
	cashAmount: Number(salesSummary.cashAmount.toFixed(2)),
	cashlessAmount: Number(salesSummary.cashlessAmount.toFixed(2)),

	route: `/stats/${id}`
})).filter(e => e.salesCount);
