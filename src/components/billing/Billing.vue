<template>
    <div class="container">
        <div class="side-app">
            <div class="balance-info" v-if="billing">
                <div class="balance-info-block balance-info__block">
                    <div class="balance-info-block__info-container">
                        <div class="balance-info-block__count balance-info-block__count--currency">{{ billing.balance }}</div>
                        <div class="balance-info-block__title">Текущий баланс</div>
                    </div>
                    <div class="balance-info-block__icon">
                        <i class="fas fa-ruble-sign"></i>
                    </div>
                </div>
                <div class="balance-info-block balance-info__block">
                    <div class="balance-info-block__info-container">
                        <div class="balance-info-block__count balance-info-block__count--currency">{{ billing.dailyBill }}</div>
                        <div class="balance-info-block__title">Ежедневное списание</div>
                    </div>
                    <div class="balance-info-block__icon">
                        <i class="far fa-calendar-alt"></i>
                    </div>
                </div>
                <div class="balance-info-block balance-info-block--attention balance-info__block">
                    <div class="balance-info-block__info-container">
                        <div class="balance-info-block__count">{{ billing.daysLeft }}</div>
                        <div class="balance-info-block__title">Осталось дней</div>
                    </div>
                    <div class="balance-info-block__icon">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                <div class="balance-info-block balance-info__block ">
                    <form action="" id="recharge-balance-form" class="balance-info-block__recharge-form ">
                        <input class=" balance-info-block__recharge-input" type="number" placeholder="сумма">
                        <button id="recharge-submit-btn" class="btn btn-primary balance-info-block__btn">Пополнить баланс</button>
                    </form>
                    <div id="recharge-hint" class="balance-info-block__hint">Введите сумму для пополнения</div>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title f-b">Оплата</div>
                        </div>
                        <div class="tab-menu-heading">
                            <div class="tabs-menu1 ">
                                <!-- Tabs -->
                                <ul class="nav panel-tabs f-b">
                                    <li>
                                        <a href="#" :class="activeTab === 'Services' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Services')">Услуги</a>
                                    </li>
                                    <li>
                                        <a href="#" :class="activeTab === 'History' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('History')">История пополнений</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <component :is="getActiveTab"></component>
                    </div>
                    <!-- section-wrapper -->
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
	import gql from 'graphql-tag';

	import BillingHistory from './modules/BillingHistory';
	import BillingServices from './modules/BillingServices';

	export default {
		name: 'Billing',
		apollo: {
			billing: {
				query: gql`
					query {
						getProfile {
							billing {
								balance,
								dailyBill,
								daysLeft
							}
						}
					}
				`,
				update: data => data.getProfile.billing
			}
		},
		data: () => ({
			activeTab: 'History',
			billing: null
		}),
        computed: {
            getActiveTab () {
                switch (this.activeTab) {
                    case 'History': return BillingHistory;
                    case 'Services': return BillingServices;
                }
            }
        },
        methods: {
            setActiveTab (tabName = 'History') {
                this.activeTab = tabName;
            }
        }
	}
</script>

<style scoped lang="scss">
	.balance-info {
		margin-top: 50px;
	}	
</style>
