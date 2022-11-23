<template>
  <div class="container" v-if="billing">
    <div class="side-app">
      <Alert message="Ваш платеж будет подтверждён в ближайшее время." v-if="isRedirectedFromYandex" class="balance-alert" />

      <div class="balance-info">
        <div :class="['balance-info-block', 'balance-info__block', hasEnoughMoney ? '' : 'balance-info-block--attention']">
          <div class="balance-info-block__info-container row">
            <div class="balance-info-block__count balance-info-block__count--currency col">{{ Number(billing.balance).toFixed(0) }}</div>
            <div class="balance-info-block__title col-3">Текущий баланс</div>
            <div class="balance-info-block__icon col-1.5">
              <i class="fas fa-ruble-sign"></i>
            </div>
            <div class="w-100 disabled-small"></div>
            <div class="balance-info-block__count col disabled-small" >{{ billing.daysLeft }}</div>
            <div class="balance-info-block__title col-3 disabled-small">Осталось дней</div>
            <div class="balance-info-block__icon col-1.5 disabled-small">
              <i class="fas fa-clock disabled-small"></i>
            </div>
          </div>
        </div>
        <div class="balance-info-block balance-info__block">
          <div class="balance-info-block__info-container row">
            <div class="balance-info-block__count balance-info-block__count--currency col  disabled-small">{{ (billing.dailyBill + orangeDay).toFixed(0) }}</div>
            <div class="balance-info-block__title col-4  disabled-small">Ежедневное списание</div>
            <div class="balance-info-block__icon col-1.5  disabled-small">
              <i class="far fa-calendar-alt  disabled-small"></i>
            </div>
            <div class="w-100"></div>

            <div class="balance-info-block__count balance-info-block__count--currency col">{{ (billing.dailyBill*(new Date().daysInMonth())/1 + orangeMonth).toFixed(0) * 1 }}</div>
            <div class="balance-info-block__title col-4">Ежемесячное списание</div>
            <div class="balance-info-block__icon col-1.5">
              <i class="far fa-calendar-alt"></i>
            </div>
          </div>


        </div>
        <div class="balance-info-block balance-info__block ">
          <div class="balance-info-block__info-container">
            <div class="balance-info-block__count">
            <p></p>
              <form :class="['balance-info-block__recharge-form', depositRequested && 'active']">
            <input
            class="balance-info-block__recharge-input"
            type="number"
            placeholder="Сумма"
            v-model="depositSum"
            />
                <button id="recharge-submit-btn" class="btn btn-primary balance-info-block__btn" :disabled="false" @click.prevent="submitDeposit">Пополнить <span class="disabled-small">баланс</span></button>
          </form>

          <Hint ref="depositHint" className="billing-hint" />

            </div>
            <div class="balance-info-block__count">
              <p></p>
          <form :class="['balance-info-block__recharge-form2', depositRequested && 'active']">
            <input
            class="balance-info-block__recharge-input2"
            type="number"
            placeholder="Сумма"
            v-model="depositSum"
            />
            <button id="recharge-submit-btn2" class="btn btn-primary balance-info-block__btn2" :disabled="orderBusy" @click.prevent="submitOrder"> Получить счет </button>
          </form>

          <Hint ref="depositHint2" className="billing-hint" />

            </div>


          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header row">
                <div class="col-md-8 col-lg-8 card-title f-b">Оплата</div>
                <div  class=""></div>
                <div  class="col-md-4 col-lg-4 disabled-small">
                  <label class="default-checkbox" for="check1">
                  <input class="auth-block__checkbox" type="checkbox" v-model="autoSend"
                        id="check1" @change="userAutoSend"/>

                  <span class="auth-block__checkbox-labell">Автоматически отправлять счет</span>
                  </label>
                </div>

            </div>

            <Tabs
              :tabs="tabs"
              :props="{ deposits: billing.deposits, orangeBilling }"
            >
              <template slot="top-menu" v-if="$route.hash === '#history'">
                <div class="stats-top-menu">
                  <div class="stats-top-menu__content-container">

                    <div class="stats-top-menu__date-buttons">
                      <Period   @onChange="onPeriodChange"/>
                    </div>
                    <div class="card card-title" style="vertical-align: center" v-if="$apollo.loading">Обновление данных...</div>
                  </div>
                </div>
              </template>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';

import { head, isEmpty } from 'ramda';
import { convertServerError } from '@/utils';

import Alert from '@/modules/Alert';
import Hint from '@/modules/Hint';

import Tabs from '@/modules/Tabs';
import BillingHistory from './modules/BillingHistory';
import BillingServices from './modules/BillingServices';
import {mapGetters} from 'vuex'

import Period from '@/modules/PeriodLarge';

// Query key for marking redirects from Yandex Kassa e.g. ?from=yandex_kassa
const YANDEX_REDIRECT_KEY = 'yandex_kassa';

Date.prototype.daysInMonth = function() {
    return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

export default {
  name: 'Billing',
  components: {
    Alert,
    Hint,
    Period,
    Tabs
  },
  apollo: {
    billing: {
      query: gql`
      query ($period: Period!, $userId: Int) {
        getProfile(userId: $userId) {
          legalInfo{
          inn
          companyName
          }
          billing (userId: $userId){
            balance (userId: $userId),
            dailyBill (userId: $userId),
            daysLeft (userId: $userId),
            deposits (period: $period, userId: $userId, ) {
              id,
              amount(userId: $userId),
              status(userId: $userId),
              meta,
              timestamp(userId: $userId),
              redirectUrl(userId: $userId)
            }
          }
        }

        getOrangeStatistic(userId: $userId) {
            orangeFixSum
        }
      }
      `,
      variables () {
        let userId = null
        if(this.$route.query.userId){
          userId = Number(this.$route.query.userId)
        }
        const notCustomDate = !this.period.from && !this.period.to;
        if (notCustomDate) {
          return {
            period: {
              from: this.period,
              to: Date.now()
            },
            userId
          };
        }

        return {
          period: this.period,
          userId
        };
      },
      update(data){

          if(data.getOrangeStatistic){
            data.getOrangeStatistic.orangeFixSum = Number(Number(data.getOrangeStatistic.orangeFixSum).toFixed(0))
                this.orangeBilling = data.getOrangeStatistic
          }
          if (data.getProfile){
              return data.getProfile.billing
          } else {
              return {}
          }}
    },
      legalInfo: {
          query: gql`
			query {
				getProfile {
				    step,
				    autoSend,
                    legalInfo{
                        inn
                        companyName
            }
          }
			}
			`,
          update: function(data){
              this.autoSend = data.getProfile.autoSend
              if(data.getProfile.legalInfo){
                  return data.getProfile.legalInfo
              }
              else {
                  return {
                      inn: "012345678",
                      companyName: "ООО Не указано"
                  }
              }

          }
      }
  },
  data: () => ({
    orderBusy: false,
    orangeBilling: null,
    tabs: [
      { name: 'Услуги', component: BillingServices, route: 'services' },
      { name: 'Платежи', component: BillingHistory, route: 'history' }
    ],
    billing: null,
    legalInfo: {
        inn: "012345678",
        companyName: "ООО Не указано"
    },
    sendQuery: false,
    depositSum: null,
    depositStatus: '',
    depositRequested: false,
    period: {
      from: Date.now()-24*60*60*1000,
      to: Date.now()
    }
  }),
  computed: {
    ...mapGetters({
      services: "cache/services"
    }),
    isDepositPending () {
        if(this.sendQuery){
            return true
        }
      if (this.billing && this.billing.deposits) {
        return this.billing.deposits.some(deposit => deposit.status === 'PENDING') || this.depositStatus === 'PENDING';
      }
    },
    orangeDay(){
      if(!this.orangeBilling || !this.orangeBilling.orangeFixSum) return 0
      return -Number((this.orangeBilling.orangeFixSum/30).toFixed(0))
    },
    orangeMonth(){
      if(!this.orangeBilling || !this.orangeBilling.orangeFixSum) return 0
      return -Number((this.orangeBilling.orangeFixSum).toFixed(0))
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
    },

    isRedirectedFromYandex () {
      return this.$route.query.from === YANDEX_REDIRECT_KEY;
    }
  },
  methods: {
    async userAutoSend(){
      await this.$nextTick()
      await this.$apollo.mutate({
        mutation: gql`
          mutation userAutoSend ($value: Boolean!) {
            userAutoSend(value: $value)
          }
          `,
        variables: {
          value: this.autoSend
        }
      });

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

       async requestOrder () {
        this.orderBusy = true
        this.sendQuery = true
      try {
        const { errors, data } = await this.$apollo.mutate({
          mutation: gql`
          mutation RequestOrder ($input: pdfInput!) {
            generatePdf(input: $input) {
              url
            }
          }
          `,
          variables: {
            input: {
                amount: parseFloat(Number(this.depositSum).toFixed(0)),
                inn: this.legalInfo.inn,
                companyName: this.legalInfo.companyName,
                services: this.services,
                prefix: "VFT"
            }
          }
        });

        if (errors && !isEmpty(errors)) {
          const error = head(errors).message || 'Ошибка сервера';
          this.$refs.depositHint2.show2(convertServerError(error));
        } else {

          if (data.generatePdf.url) {
           //window.location.href = data.generatePdf.url;
            window.open(data.generatePdf.url, '_blank');
            this.sendQuery = false
          }
        }
      } catch (error) {
        this.$refs.depositHint2.show2(convertServerError(error.message));
      }
      finally {

        this.orderBusy = false
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
          this.depositSum = (this.billing.dailyBill*(new Date().daysInMonth())/100).toFixed(0) * 100
          this.depositRequested = true;
        this.$refs.depositHint.show('Введите сумму для пополнения');
      }
    },

    submitOrder () {
      if (this.depositRequested) {
        if (this.depositSum > 0) {
          this.requestOrder();
        } else {
          this.$refs.depositHint2.show2('Некорректная сумма');
        }
      } else {
          this.depositSum = (this.billing.dailyBill*(new Date().daysInMonth())/100).toFixed(0) * 100
        this.depositRequested = true;
        this.$refs.depositHint2.show2('Введите сумму для пополнения');
      }
    },

    onPeriodChange (period) {

      if(period.to <= period.from){
        period.to = period.from
      }
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


@media (max-width: 992px) {
  .stats-top-menu {
    margin: 10px 0 0 0;
  }
  .payment-table {
    margin-top: 10px;
  }
}
.balance-alert, .balance-info {
  margin-top: 1em;
}
.balance-info {
  &-block__recharge-form {
    display: flex;
    align-items: center;
  }
}
</style>
