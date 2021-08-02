<template>
    <div class="auth-page">
        <img src="/assets/images/brand/logo.png" class="auth-page__logo" />
        <!-- Товарный чек -->
        <div class="auth-block" v-if="!bill">
          <div class="auth-block__link-title col-12">Вашего чека еще нет в системе ОФД, попробуйте перезагрузить страницу через несколько секунд...</div>
        </div>
        <div class="auth-block" v-if="bill">
            <div class="auth-block__link-title col-12">{{ bill.companyName }} ИНН: {{ bill.inn }} / КПП: {{ bill.kpp }} Юр.адрес
              {{ bill.legalAddress }}</div>
          <div><hr/></div>
          <div class="auth-block__link-container row">
            <div class="auth-block__link-title col-6 left">{{ datetime[0] }}</div><div class="auth-block__link-title col-6 right">{{ datetime[1]}}</div>

          </div>
            <div class="auth-block__title">Товарный чек № {{bill.fiscalReceiptNumber}}</div>



            <div class="auth-block__link-container row">
                <div class="auth-block__link col-6 left">1 x {{ bill.sale.item.name }}</div><div class="auth-block__link col-6 right">
              {{ (bill.sale.price).toFixed(2) }}</div>
                <div><hr/></div>
                <div class="auth-block__title col-6 left">ИТОГ:</div><div class="auth-block__title col-6 right">{{ (bill.sale.price).toFixed(2) }}</div>
                <div class="auth-block__link-title col-6 left">Наличными:</div><div class="auth-block__link-title col-6 right">
              {{ bill.sale.type === "CASH" ? (bill.sale.price).toFixed(2)  : 0.00 }}</div>
                <div class="auth-block__link-title col-6 left">Электронными:</div><div class="auth-block__link-title col-6 right">{{ bill.sale.type === "CASHLESS" ? (bill.sale.price).toFixed(2)  : 0.00 }}</div>
                <div class="auth-block__link-title col-6 left">НДС:</div><div class="auth-block__link-title col-6 right">{{bill.sno === "osn" ? (bill.sale.price * 0.2).toFixed(2) : "Без НДС"}}</div>
              <div><hr/></div>
                <div class="auth-block__link-title col-6 left"></div><div class="auth-block__link-title col-6 right"></div>
                <div class="auth-block__link-title col-6 left">Автомат</div><div class="auth-block__link-title col-6 right">{{ bill.machineNumber}}</div>
                <div class="auth-block__link-title col-6 left">Место расчетов</div><div class="auth-block__link-title col-6 right">{{ bill.place}}</div>
              <div><hr/></div>
                <div class="auth-block__link-title col-6 left"></div><div class="auth-block__link-title col-6 right"></div>
                <div class="auth-block__link-title col-6 left">Кассовый чек</div><div class="auth-block__link-title col-6 right">Приход</div>
                <div class="auth-block__link-title col-6 left">СНО</div><div class="auth-block__link-title col-6 right">
              {{ snoString(bill.sno) }}</div>
                <div class="auth-block__link-title col-6 left">ИНН: </div><div class="auth-block__link-title col-6 right">
              {{ bill.inn }}</div>
                <div class="auth-block__link-title col-6 left">Смена:</div><div class="auth-block__link-title col-6 right">
              {{ bill.shiftNumber }}</div>
                <div class="auth-block__link-title col-6 left">РН ККТ:</div><div class="auth-block__link-title col-6 right">
              {{ bill.ecrRegistrationNumber }}</div>
                <div class="auth-block__link-title col-6 left">ФН:</div><div class="auth-block__link-title col-6 right">
              {{ bill.fnNumber }}</div>
                <div class="auth-block__link-title col-6 left">ФНС:</div><div class="auth-block__link-title col-6 right">
              {{ bill.fnsSite }}</div>
                <div class="auth-block__link-title col-6 left">ФП:</div><div class="auth-block__link-title col-6 right">
              {{ bill.fiscalDocumentAttribute }}</div>
                <div class="auth-block__link-title col-6 left">ФД:</div><div class="auth-block__link-title col-6 right">
              {{ bill.fiscalDocumentNumber }}</div>
                <div class="auth-block__link-title col-12">
                  <qrcode-vue :value="value" :size="size" level="H" />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import QrcodeVue from 'qrcode.vue'



export default {
    name: 'Login',
    components: {
        QrcodeVue
    },

    apollo: {
      bill: {
        query: gql`
        query ($receiptId: String!) {
          getFiscalReceipt (receiptId: $receiptId) {
              id
              sale {
                  id
                  type
                  price
                  item {
                    name
                  }
                }
              inn
              kpp
              sno
              place
              machineNumber
              companyName
              legalAddress
              fnsSite
              receiptDatetime
              shiftNumber
              fiscalReceiptNumber
              fiscalDocumentNumber
              ecrRegistrationNumber
              fiscalDocumentAttribute
              fnNumber
            }
        }

        `,

        variables () {
          return { receiptId: this.$route.params.receiptId };
        },

        update (data) {

          const getTwoDigitDateFormat = (monthOrDate) => {
            return (monthOrDate < 10) ? "0" + monthOrDate : "" + monthOrDate
          }

          const receiptDateUtcDate = new  Date(new Date(data.getFiscalReceipt.receiptDatetime).getTime() - 3600000*3)
          let mappedReceiptDate = ""
          mappedReceiptDate += receiptDateUtcDate.getFullYear() + ""
          mappedReceiptDate += getTwoDigitDateFormat((receiptDateUtcDate.getMonth() + 1)) + ""
          mappedReceiptDate += getTwoDigitDateFormat(receiptDateUtcDate.getDate()) + ""
          mappedReceiptDate += "T"
          mappedReceiptDate += getTwoDigitDateFormat(receiptDateUtcDate.getHours())
          mappedReceiptDate += getTwoDigitDateFormat(receiptDateUtcDate.getMinutes())
          //Фэйковые данные
          this.value = `t=${mappedReceiptDate}&s=${(data.getFiscalReceipt.sale.price).toFixed(2)}&fn=${data.getFiscalReceipt.fnNumber}&i=${data.getFiscalReceipt.fiscalDocumentNumber}&fp=${data.getFiscalReceipt.fiscalDocumentAttribute}&n=1`
          this.datetime = data.getFiscalReceipt.receiptDatetime.substr(0, 19).split("T")

          return data.getFiscalReceipt;
        }
      }
    },
    data: () => ({
      value: 'https://example.com?dkjdkjf=3&kdkfjkdfjkdsjfksf=8977897',
      size: 100,
      bill: null,
      datetime: []
    }),
    mounted: async function (){
    },
    beforeCreate() {

    },

    methods: {

      snoString(sno){
        switch(sno){
          case "usn_income":
            return "УСН доходы"
          case "usn_income_outcome":
            return "УСН доходы-расходы"
          case "envd":
            return "ЕНВД"
          case "osn":
            return "ОСН"
          case "esn":
            return "ЕСН"
          default:
            return "Не передано"
        }
      },
        async login() {
            const cache = this.$store.getters['cache/data'];
            const userData = {
                password: cache.password,
                phone: cache.phone.replace(/[()+\s-]/gi, '').slice(1)
            };

            try {
                const { errors, data } = await this.$apollo.mutate({
                    mutation: gql `
                                mutation login ($data: RequestTokenInput!) {
                                    token: requestToken(input: $data)
                                }
                            `,
                    variables: {
                        data: userData
                    }
                });

                this.$refs.login.process({ errors, data, success: 'Переадресация...' });
            } catch (error) {
                this.$refs.login.showMessage('error', convertServerError(error.message));
            }
        },
        onSuccess({ token }) {
            if(token === "NEED_SMS"){
                const cache = this.$store.getters['cache/data'];
                this.$router.push(`/sms/${cache.phone.replace(/[()+\s-]/gi, '')}`)
            }
            else{
                const cache = this.$store.getters['cache/data'];
                this.$store.dispatch('auth/requestUserData', {token, remember: this.remember, phone: cache.phone.replace(/[()+\s-]/gi, '')});
            }


        }
    },
}
</script>
<style>
.left {
  text-align: left !important;
}
.right {
  text-align: right !important;
}
</style>
