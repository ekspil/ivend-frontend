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
        <div :class="['balance-info-block', 'balance-info__block', hasEnoughDays ? '' : 'balance-info-block--attention']">
          <div class="balance-info-block__info-container">
            <div class="balance-info-block__count">{{ billing.daysLeft }}</div>
            <div class="balance-info-block__title">Осталось дней</div>
          </div>
          <div class="balance-info-block__icon">
            <i class="fas fa-check"></i>
          </div>
        </div>
        <div class="balance-info-block balance-info__block ">
          <form :class="['balance-info-block__recharge-form', depositRequested && 'active']">
            <input
            class="balance-info-block__recharge-input"
            type="number"
            placeholder="Сумма"
            v-model="depositSum"
            />
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
                    <a href="#" :class="activeTab === 'History' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('History')">Платежи</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="stats-top-menu">
              <div class="stats-top-menu__content-container">
                <div class="stats-top-menu__date-buttons">
                  <Period @onChange="onPeriodChange"/>
                </div>
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

import Period from '@/modules/Period';

export default {
  name: 'Billing',
  components: {
    Hint,
    Period
  },
  apollo: {
    billing: {
      query: gql`
      query ($period: Period!) {
        getProfile {
          billing {
            balance,
            dailyBill,
            daysLeft,
            deposits (period: $period) {
              id,
              amount,
              status
            }
          }
        }
      }
      `,
      variables () {
        const notCustomDate = !this.period.from && !this.period.to;
        if (notCustomDate) {
          return {
            period: {
              from: this.period,
              to: Date.now()
            }
          };
        }

        return {
          period: this.period
        };
      },
      update: data => data.getProfile ? data.getProfile.billing : {}
    }
  },
  data: () => ({
    activeTab: 'History',
    billing: null,

    depositSum: null,
    depositStatus: '',
    depositRequested: false,
    period: {
      calendar: {
        from: null,
        to: null
      },
      value: null
    }
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
        const WARN_BALANCE_DAYS = process.env.VUE_APP_WARN_BALANCE_DAYS || 3;
        return billing.balance > (billing.dailyBill * WARN_BALANCE_DAYS);
      }

      return false;
    },
    hasEnoughDays () {
      const billing = this.billing;
      if (billing && process.env.VUE_APP_WARN_BALANCE_DAYS >= billing.daysLeft) {
        return false;
      }

      return true;
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
          const error = head(errors).message || 'Ошибка сервера';
          this.$refs.depositHint.show(convertServerError(error));
        } else {
          this.depositStatus = data.requestDeposit.status;
          if (data.requestDeposit.redirectUrl) {
            window.location.href = data.requestDeposit.redirectUrl;
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
          this.$refs.depositHint.show('Некорректная сумма');
        }
      } else {
        this.depositRequested = true;
        this.$refs.depositHint.show('Введите сумму для пополнения');
      }
    },

    onPeriodChange (period) {
      this.period = period;
    }
  }
}
</script>

<style scoped lang="scss">
.stats-top-menu {
  margin: 30px 0 0 0;
}
.payment-table {
  margin-top: 30px;
}
.balance-info {
  margin-top: 50px;
  &-block__recharge-form {
    display: flex;
    align-items: center;
  }
}
</style>
