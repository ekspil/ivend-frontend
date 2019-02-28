<template>
    <div class="container" v-if="billing">
        <div class="side-app">
            <div class="balance-info">
                <div :class="['balance-info-block', 'balance-info__block', hasEnoughMoney ? '' : 'balance-info-block--attention']">
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
                    <form class="balance-info-block__recharge-form">
                        <transition name="fade">
                            <input
                                class="balance-info-block__recharge-input"
                                type="number"
                                placeholder="Сумма"
                                v-model="depositSum"
                                v-if="depositRequested"
                            />
                        </transition>
                        <button id="recharge-submit-btn" class="btn btn-primary balance-info-block__btn" :disabled="isDepositPending" @click.prevent="submitDeposit">Пополнить баланс</button>
                    </form>

                    <Hint ref="depositHint" className="billing-hint" />
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

                        <component :is="getActiveTab" :deposits="billing.deposits"></component>
                    </div>
                    <!-- section-wrapper -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import gql from 'graphql-tag';

    import { head, isEmpty } from 'ramda';
    import { convertServerError } from '@/utils';

    import Hint from '@/modules/Hint';

	import BillingHistory from './modules/BillingHistory';
	import BillingServices from './modules/BillingServices';

	export default {
		name: 'Billing',
        components: {
            Hint
        },
		apollo: {
			billing: {
				query: gql`
					query {
						getProfile {
							billing {
								balance,
								dailyBill,
								daysLeft,
                                deposits {
                                    id,
                                    amount,
                                    status
                                }
							}
						}
					}
				`,
				update: data => data.getProfile ? data.getProfile.billing : {}
			}
		},
		data: () => ({
			activeTab: 'History',
			billing: null,

            depositSum: null,
            depositStatus: '',
            depositRequested: false
		}),
        computed: {
            getActiveTab () {
                switch (this.activeTab) {
                    case 'History': return BillingHistory;
                    case 'Services': return BillingServices;
                }
            },

            isDepositPending () {
                if (this.billing && this.billing.deposits) {
                    return this.billing.deposits.some(deposit => deposit.status === 'PENDING') || this.depositStatus === 'PENDING';
                }
            },

            hasEnoughMoney () {
                const billing = this.billing;
                if (billing) {
                    // eslint-disable-next-line
                    const WARN_BALANCE_DAYS = process.env.VUE_APP_WARN_BALANCE_DAYS || 3;
                    return billing.balance > (billing.dailyBill * WARN_BALANCE_DAYS);
                }

                return false;
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
                            amount: parseFloat(this.depositSum)
                        }
                    });

                    if (errors && !isEmpty(errors)) {
                        const error = head(errors).message || 'Ошибка сервера.';
                        this.$refs.depositHint.show(convertServerError(error));
                    } else {
                        this.depositStatus = data.status;

                        if (data.redirectUrl) {
                            window.location.href = data.redirectUrl;
                        }
                    }
                } catch (error) {
                    this.$refs.depositHint.show(convertServerError(error.message));
                }
            },

            submitDeposit () {
                if (this.depositRequested) {
                    if (this.depositSum > 0) {
                        this.requestDeposit();
                    } else {
                        this.$refs.depositHint.show('Некорректная сумма.');
                    }
                } else {
                    this.depositRequested = true;
                }
            }
        }
	}
</script>

<style scoped lang="scss">
	.balance-info {
		margin-top: 50px;
        &-block__recharge-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
	}
</style>
