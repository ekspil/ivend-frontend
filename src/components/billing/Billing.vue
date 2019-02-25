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
                    <Validate
                        id="recharge-balance-form"
                        className="balance-info-block__recharge-form" 
                        :card="false"
                        :schema="depositSchema"
                        formName="deposit"
                        ref="deposit"
                        @onSubmit="requestDeposit"
                        @onSuccess="requestOnSuccess"
                    >
                        <Field className="balance-info-block__recharge-input" type="number" placeholder="Сумма" formName="deposit" name="sum"/>
                        <button id="recharge-submit-btn" class="btn btn-primary balance-info-block__btn" @click.prevent="$refs.deposit.submit">Пополнить баланс</button>
                    </Validate>
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
</template>

<script>
	import gql from 'graphql-tag';

    import Validate from '@/modules/validation/Validate';
    import Field from '@/modules/validation/Field';

	import BillingHistory from './modules/BillingHistory';
	import BillingServices from './modules/BillingServices';

	export default {
		name: 'Billing',
        components: {
            Validate,
            Field
        },
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
			billing: null,

            depositSchema: {
                sum: [sum => ({ error: sum > 0 ? null : 'Некорректная сумма.' })]
            }
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
            },

            async requestDeposit () {
                try {
                    const { errors, data } = await this.$apollo.mutate({
                        mutation: gql`
                            mutation RequestDeposit ($amount: Float!) {
                                requestDeposit(amount: $amount) {
                                    id,
                                    status,
                                    redirectUrl
                                }
                            }
                        `,
                        variables: {
                            amount: parseFloat(this.$store.getters['cache/data'].sum)
                        }
                    });

                    this.$refs.deposit.process({ errors, success: 'Успешно.', data });
                } catch (error) {
                    this.$refs.deposit.showMessage('error', 'Ошибка пополнения.');
                }
            },

            requestOnSuccess (data) {
                if (data.status === 'CANCELED') {
                    this.$refs.deposit.showMessage('error', 'Пополнение отменено.');
                } else {
                    window.location.replace(data.redirectUrl);
                }
            }
        }
	}
</script>

<style scoped lang="scss">
	.balance-info {
		margin-top: 50px;
	}
</style>
