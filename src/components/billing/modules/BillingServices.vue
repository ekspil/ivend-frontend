<template>
    <div class="table-responsive payment-table payment-table--services">
        <table class="table card-table table-vcenter text-nowrap">
            <thead>
                <th class="service-name-cel sortable up">Название</th>
                <th class="service-price-cel sortable">Стоимость р/день</th>
                <th></th>
            </thead>
            <tbody>
                <tr class="payment-table__row-subtable">
                    <td class="cel-table" colspan="3">
                        <table class="controller-service-table">
                            <thead class="active">
                                <tr>
                                    <th colspan="3">Контроллер 1</th>
                                </tr>
                            </thead>
                            <tr>
                                <td class="service-name-cel">Услуга 1</td>
                                <td class="service-price-cel">1000</td>
                                <td class="delete-cel-btn">
                                    <button class=""><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td class="service-name-cel">Услуга 2</td>
                                <td class="service-price-cel">3000</td>
                                <td class="delete-cel-btn">
                                    <button class=""><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="payment-table__row-subtable">
                    <td class="cel-table" colspan="3">
                        <table class="controller-service-table">
                            <thead class="">
                                <tr>
                                    <th colspan="3">Контроллер 2</th>
                                </tr>
                            </thead>
                            <tr>
                                <td class="service-name-cel">Услуга 1</td>
                                <td class="service-price-cel">1000</td>
                                <td class="delete-cel-btn">
                                    <button class=""><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td class="service-name-cel">Услуга 2</td>
                                <td class="service-price-cel">3000</td>
                                <td class="delete-cel-btn">
                                    <button class=""><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="payment-table__row-subtable">
                    <td class="cel-table" colspan="3">
                        <table class="controller-service-table">
                            <thead class="active">
                                <tr>
                                    <th colspan="3">Контроллер 3</th>
                                </tr>
                            </thead>
                            <tr>
                                <td class="service-name-cel">Услуга 1</td>
                                <td class="service-price-cel">1000</td>
                                <td class="delete-cel-btn">
                                    <button class=""><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                            <tr>
                                <td class="service-name-cel">Услуга 2</td>
                                <td class="service-price-cel">3000</td>
                                <td class="delete-cel-btn">
                                    <button class=""><i class="far fa-trash-alt"></i></button>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
	export default {
		name: 'BillingServices'
	}
</script>
