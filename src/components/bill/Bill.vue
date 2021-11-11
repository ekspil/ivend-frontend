<template>
    <div class="auth-page">
        <img src="/assets/images/brand/logo.png" class="auth-page__logo" />
        <!-- Товарный чек -->
        <div class="auth-block" v-if="!bill">
          <div class="auth-block__link-title col-12">{{text}}</div>
        </div>
        <div class="auth-block" v-if="bill">
            <div class="auth-block__title">Кассовый чек / Приход</div>
          <div class="auth-block__link-container row">
          <div class="auth-block__link-title col-12 center">Чек получен ФНС</div>
          </div>

          <div><hr/></div>
          <div class="auth-block__link-container row">

            <div class="auth-block__link-title col-12 center">{{ bill.companyName }} <br> </div>
            <div><hr/></div>

            <div class="auth-block__link-title col-8 left">Фискальный документ</div><div class="auth-block__link-title col-4 right">
            {{ bill.fiscalDocumentNumber }}</div>
            <div class="auth-block__link-title col-6 left">Дата выдачи</div><div class="auth-block__link-title col-6 right">{{datetime[0] + " " + datetime[1]}}</div>

            <div class="auth-block__link-title col-6 left"></div><div class="auth-block__link-title col-6 right"></div>
            <div class="auth-block__link-title col-6 left">Автомат</div><div class="auth-block__link-title col-6 right">{{ bill.machineNumber}}</div>
            <div class="auth-block__link-title col-5 left no-right">Адрес расчетов</div><div class="auth-block__link-title col-7 right no-left">{{ bill.place}}</div>
            <div class="auth-block__link-title col-5 left no-right">Место расчетов</div><div class="auth-block__link-title col-7 right no-left">{{ bill.place}}</div>
            <div class="auth-block__link-title col-4 left">Кассир</div><div class="auth-block__link-title col-8 right">Администратор Kassir</div>

            <div class="auth-block__link-title col-6 left">Номер смены</div><div class="auth-block__link-title col-6 right">
            {{ bill.shiftNumber }}</div>
            <div class="auth-block__link-title col-6 left">Документ в смене</div><div class="auth-block__link-title col-6 right">
            {{ bill.fiscalReceiptNumber }}</div>
            <div class="auth-block__link-title col-6 left no-right">Эл.адр.покупателя</div><div class="auth-block__link-title col-6 right">Не указан</div>
            <div class="auth-block__link-title col-6 left no-right">Версия ФФД</div><div class="auth-block__link-title col-6 right">1.0.5</div>
            <div class="auth-block__link-title col-6 left no-right">Эл.адр.отправителя</div><div class="auth-block__link-title col-6 right">{{ bill.email}}</div>



            <div class="auth-block__link-title col-6 left  no-right">Адрес сайта ФНС</div><div class="auth-block__link-title col-6 right  no-left">
            {{ bill.fnsSite }}</div>
            <div class="auth-block__link-title col-6 left"></div><div class="auth-block__link-title col-6 right"></div>

            <div class="auth-block__link-title col-6 left">ИНН пользователя </div><div class="auth-block__link-title col-6 right">
            {{ bill.inn }}</div>
            <div class="auth-block__link-title col-6 left">РН ККТ:</div><div class="auth-block__link-title col-6 right">
            {{ bill.ecrRegistrationNumber }}</div>
            <div class="auth-block__link-title col-6 left">ФН:</div><div class="auth-block__link-title col-6 right">
            {{ bill.fnNumber }}</div>
            <div class="auth-block__link-title col-6 left">ФП:</div><div class="auth-block__link-title col-6 right">
            {{ bill.fiscalDocumentAttribute }}</div>
            <div class="auth-block__link-title col-8 left no-right">Адрес проверки чека в ОФД</div><div class="auth-block__link-title col-4 right no-left">check.ofd.ru</div>

          </div>
          <div><hr/></div>


            <div class="auth-block__link-container row">
                <div class="auth-block__link col-6 left">1 x {{ bill.sale.item.name }}</div><div class="auth-block__link col-6 right">
              {{ (bill.sale.price).toFixed(2) }}</div>

              <div class="auth-block__link-title col-4 left" v-if="bill.sno !== 'osn'"></div><div class="auth-block__link-title col-8 right" v-if="bill.sno !== 'osn'">в т.ч. НДС НЕ ОБЛАГАЕТСЯ</div>
              <div class="auth-block__link-title col-4 left" v-if="bill.sno !== 'osn'"></div><div class="auth-block__link-title col-8 right" v-if="bill.sno !== 'osn'">{{ '= ' + (bill.sale.price).toFixed(2) }}</div>


              <div class="auth-block__link-title col-4 left" v-if="bill.sno === 'osn'"></div><div class="auth-block__link-title col-8 right" v-if="bill.sno === 'osn'">в т.ч. НДС 20%</div>
              <div class="auth-block__link-title col-4 left" v-if="bill.sno === 'osn'"></div><div class="auth-block__link-title col-8 right" v-if="bill.sno === 'osn'">{{ '= ' +  (bill.sale.price - (bill.sale.price/1.2)).toFixed(2) }}</div>

              <div><hr/></div>
              <div class="auth-block__link-title col-6 left">Еединица измерения</div><div class="auth-block__link-title col-6 right">шт</div>
              <div class="auth-block__link-title col-7 left no-right">Признак способа расчета</div><div class="auth-block__link-title col-5 right no-left">Полный расчет</div>
              <div class="auth-block__link-title col-8 left no-right">Признак предмета расчета</div><div class="auth-block__link-title col-4 right no-left">{{bill.itemType ==='commodity'?'Товар':'Услуга'}}</div>

                <div><hr/></div>
                <div class="auth-block__title col-6 left">ИТОГ:</div><div class="auth-block__title col-6 right">{{ (bill.sale.price).toFixed(2) }}</div>
                <div class="auth-block__link-title col-6 left">Наличными:</div><div class="auth-block__link-title col-6 right">
              {{ bill.sale.type === "CASH" ? (bill.sale.price).toFixed(2)  : 0.00 }}</div>
                <div class="auth-block__link-title col-6 left">Безналичными:</div><div class="auth-block__link-title col-6 right">{{ bill.sale.type === "CASHLESS" ? (bill.sale.price).toFixed(2)  : '0.00' }}</div>
                <div class="auth-block__link-title col-6 left left-add"> в т.ч. налоги</div><div class="auth-block__link-title col-6 right"></div>

              <div class="auth-block__link-title col-9 left left-add" v-if="bill.sno === 'osn'"> {{bill.sno === "osn" ? "НДС 20%:" : "НДС:"}}</div><div v-if="bill.sno === 'osn'" class="auth-block__link-title col-3 right">{{bill.sno === "osn" ? (bill.sale.price - (bill.sale.price/1.2)).toFixed(2) : "Без НДС"}}</div>
              <div class="auth-block__link-title col-9 left left-add" v-if="bill.sno !== 'osn'"> НДС НЕ ОБЛАГАЕТСЯ</div><div v-if="bill.sno !== 'osn'" class="auth-block__link-title col-3 right">{{ (bill.sale.price).toFixed(2)}}</div>
              <div class="auth-block__link-title col-6 left">СНО</div><div class="auth-block__link-title col-6 right">
              {{ snoString(bill.sno) }}</div>
              <div><hr/></div>


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
              email
              itemType
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

          if(!data){
            this.text = "Вашего чека еще нет в системе ОФД, попробуйте перезагрузить страницу через пару минут..."
            return null
          }

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
          if(data.getFiscalReceipt.ecrRegistrationNumber.includes("http")){
            this.$router.replace(data.getFiscalReceipt.ecrRegistrationNumber)
            window.location.href = data.getFiscalReceipt.ecrRegistrationNumber
            data.getFiscalReceipt.ecrRegistrationNumber = "----"
          }
          return data.getFiscalReceipt;
        }
      }
    },
    data: () => ({
      value: 'https://example.com?dkjdkjf=3&kdkfjkdfjkdsjfksf=8977897',
      size: 100,
      bill: null,
      datetime: [],
      text: "Ожидание загрузки чека..."
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
    },
}
</script>
<style>
.left {
  text-align: left !important;
}
.left-add {
  padding-left: 27px;
}
.no-right {
  padding-right: 0px;
}
.no-left {
  padding-left: 0px;
}
.center {
  text-align: center !important;
}
.right {
  text-align: right !important;
}
</style>
