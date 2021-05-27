<template>
	<form name="notifications" action="POST" v-if="profile">
		<div class="table-responsive notification-table">
			<table class="table card-table table-vcenter text-nowrap notification-table">
				<thead>


					<tr>
						<th class="width-notif">Событие</th>
						<th width="24%">Email</th>
						<!--
						<th>Viber</th>
						<th>Whatsapp</th>
						<th>Telegram</th>

						<th>SMS</th>-->
						<th>Telegram</th>
					</tr>
				</thead>
				<tbody>
				<tr>

					<td></td>
					<td class="checkbox-cel">
						<div >

							<input  name="extraEmail" class="company-settings__field" type="text"
									placeholder="Электронная почта"  v-model="extraEmail" @change="saveAll()" />
						</div>
					</td>

					<td class="checkbox-cel">
						<div>

							<input  name="telegram" class="company-settings__field" type="text" id="popover111"
                      title="Для подключения уведомлений вам необходимо вписать свой ник(посмотреть и изменить можно в настройках телеграм) и после этого написать '/start' боту @ivend_bot"
									  placeholder="login в телеграм"  v-model="telegram" @change="saveAll()" />
						</div>
					</td>

				</tr>

					<tr v-if="false" v-for="({ type, email, sms, tlgrm, telegram, telegramChat }, index) in profile.notificationSettings" :key="index">
						<td>{{ getType(type) }}</td>

						<td class="checkbox-cel">
							<label class="default-checkbox" :for="'checkbox-11'+index">
								<input class="auth-block__checkbox" type="checkbox"
								:id="'checkbox-11'+index" v-model="profile.notificationSettings[index].email" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<!--<td class="checkbox-cel">-->
							<!--<label class="default-checkbox" :for="'checkbox-12'+index">-->
								<!--<input class="auth-block__checkbox" type="checkbox"-->
								<!--:id="'checkbox-12'+index" v-model="profile.notificationSettings[index].sms" @change="save(index)"/>-->

								<!--<span class="auth-block__checkbox-label"></span>-->
							<!--</label>-->
						<!--</td>-->
						<td class="checkbox-cel">
							<label class="default-checkbox" :for="'checkbox-13'+index">
								<input class="" type="checkbox"
								:id="'checkbox-13'+index" v-model="profile.notificationSettings[index].tlgrm" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

								<span class=""></span>
							</label>
						</td>

					</tr>
				</tbody>
			</table>


      <div class="panel-group checkbox-cel" id="accordion" role="tablist" aria-multiselectable="true">
        <div class="panel panel-default">
          <div class="" role="tab" id="headingOne">
            <h4 class="panel-title" style="font-weight: bold">

                <table class="table card-table table-vcenter  notification-table" style>
                  <tr >
                    <td class="width-notif"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      <i class="dropdown-icon fe fe-chevron-down"></i>Новости компании
                    </a></td>

                    <td class="checkbox-cel">
                      <label class="default-checkbox" >
                        <input class="" type="checkbox"  v-model="group.news.email"
                                @change.prevent="saveByName(['GET_NEWS', 'ALARM_SMS'], 'email', 'news')" />

                        <span class="auth-block__checkbox-label"></span>
                      </label>
                    </td>
                    <td class="checkbox-cel">
                      <label class="default-checkbox" for="checkbox-news">
                        <input class=""  id="checkbox-news" type="checkbox"   v-model="group.news.tlgrm"   @change.prevent="saveByName(['GET_NEWS', 'ALARM_SMS'], 'tlgrm', 'news')"/>

                        <span class=""></span>
                      </label>
                    </td>

                  </tr>
                </table>
            </h4>
          </div>
          <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">

            <table class="table card-table table-vcenter  notification-table">
              <tr v-for="({ type, email, sms, tlgrm, telegram, telegramChat }, index) in profile.notificationSettings" :key="index"  v-if="type === 'GET_NEWS' || type === 'ALARM_SMS'">
                <td width="50%">{{ getType(type) }}</td>

                <td class="checkbox-cel">
                  <label class="default-checkbox" :for="'checkbox-11'+index">
                    <input class="auth-block__checkbox" type="checkbox"
                           :id="'checkbox-11'+index" v-model="profile.notificationSettings[index].email" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                    <span class="auth-block__checkbox-label"></span>
                  </label>
                </td>
                <td class="checkbox-cel">
                  <label class="default-checkbox" :for="'checkbox-13'+index">
                    <input class="" type="checkbox"
                           :id="'checkbox-13'+index" v-model="profile.notificationSettings[index].tlgrm" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                    <span class=""></span>
                  </label>
                </td>

              </tr>
              </table>


            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="" role="tab" id="heading2">
            <h4 class="panel-title" style="font-weight: bold">

              <table class="table card-table table-vcenter  notification-table" style>
                <tr >
                  <td class="width-notif"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse2" aria-expanded="true" aria-controls="collapse2">
                    <i class="dropdown-icon fe fe-chevron-down"></i>Финансовые отчеты
                  </a></td>

                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-news-166'">
                      <input class="auth-block__checkbox" type="checkbox"   v-model="group.finance.email"
                             :id="'checkbox-news-166'" @change.prevent="saveByName(['GET_DAY_SALES', 'GET_WEEK_SALES', 'GET_MONTH_SALES', 'CONTROLLER_ENCASHMENT'], 'email', 'finance')" />

                      <span class="auth-block__checkbox-label"></span>
                    </label>
                  </td>
                  <td class="checkbox-cel">
                    <label class="default-checkbox" for="checkbox-news222">
                      <input class=""  id="checkbox-news222" type="checkbox"   v-model="group.finance.tlgrm"  @change.prevent="saveByName(['GET_DAY_SALES', 'GET_WEEK_SALES', 'GET_MONTH_SALES', 'CONTROLLER_ENCASHMENT'], 'tlgrm','finance')"/>

                      <span class=""></span>
                    </label>
                  </td>

                </tr>
              </table>
            </h4>
          </div>
          <div id="collapse2" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">

              <table class="table card-table table-vcenter  notification-table">
                <tr v-for="({ type, email, sms, tlgrm, telegram, telegramChat }, index) in profile.notificationSettings" :key="index"  v-if="type === 'GET_DAY_SALES' || type === 'GET_WEEK_SALES' || type === 'GET_MONTH_SALES' || type === 'CONTROLLER_ENCASHMENT'">
                  <td width="50%">{{ getType(type) }}</td>

                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-21'+index">
                      <input class="auth-block__checkbox" type="checkbox"
                             :id="'checkbox-21'+index" v-model="profile.notificationSettings[index].email" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                      <span class="auth-block__checkbox-label"></span>
                    </label>
                  </td>
                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-23'+index">
                      <input class="" type="checkbox"
                             :id="'checkbox-23'+index" v-model="profile.notificationSettings[index].tlgrm" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                      <span class=""></span>
                    </label>
                  </td>

                </tr>
              </table>


            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="" role="tab" id="heading3">
            <h4 class="panel-title" style="font-weight: bold">

              <table class="table card-table table-vcenter  notification-table" style>
                <tr >
                  <td class="width-notif"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse3" aria-expanded="true" aria-controls="collapse3">
                    <i class="dropdown-icon fe fe-chevron-down"></i>Ошибки автомата
                  </a></td>

                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-news-31'">
                      <input class="auth-block__checkbox" type="checkbox"  v-model="group.errors.email"
                             :id="'checkbox-news-31'" @change.prevent="saveByName(['MACHINE_ATTENTION_REQUIRED', 'CONTROLLER_NO_CONNECTION', 'CONTROLLER_NO_SALES', 'NO_COINS_24H', 'NO_CASH_24H', 'NO_CASHLESS_24H', 'NO_RECEIPT_24H'], 'email', 'errors')" />

                      <span class="auth-block__checkbox-label"></span>
                    </label>
                  </td>
                  <td class="checkbox-cel">
                    <label class="default-checkbox" for="checkbox-news33">
                      <input class=""  id="checkbox-news33" type="checkbox"   v-model="group.errors.tlgrm" @change.prevent="saveByName(['MACHINE_ATTENTION_REQUIRED', 'CONTROLLER_NO_CONNECTION', 'CONTROLLER_NO_SALES', 'NO_COINS_24H', 'NO_CASH_24H', 'NO_CASHLESS_24H', 'NO_RECEIPT_24H'], 'tlgrm', 'errors')"/>

                      <span class=""></span>
                    </label>
                  </td>

                </tr>
              </table>
            </h4>
          </div>
          <div id="collapse3" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">

              <table class="table card-table table-vcenter  notification-table">
                <tr v-for="({ type, email, sms, tlgrm, telegram, telegramChat }, index) in profile.notificationSettings" :key="index"  v-if="type === 'MACHINE_ATTENTION_REQUIRED' || type === 'CONTROLLER_NO_CONNECTION' || type === 'CONTROLLER_NO_SALES' || type === 'NO_COINS_24H' || type === 'NO_CASH_24H' || type === 'NO_CASHLESS_24H' || type === 'NO_RECEIPT_24H'">
                  <td width="50%">{{ getType(type) }}</td>

                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-11'+index">
                      <input class="auth-block__checkbox" type="checkbox"
                             :id="'checkbox-11'+index" v-model="profile.notificationSettings[index].email" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                      <span class="auth-block__checkbox-label"></span>
                    </label>
                  </td>
                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-13'+index">
                      <input class="" type="checkbox"
                             :id="'checkbox-13'+index" v-model="profile.notificationSettings[index].tlgrm" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                      <span class=""></span>
                    </label>
                  </td>

                </tr>
              </table>


            </div>
          </div>
        </div>
        <div class="panel panel-default">
          <div class="" role="tab" id="heading4">
            <h4 class="panel-title" style="font-weight: bold">

              <table class="table card-table table-vcenter  notification-table" style>
                <tr >
                  <td class="width-notif"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse4" aria-expanded="true" aria-controls="collapse4">
                    <i class="dropdown-icon fe fe-chevron-down"></i>Баланс личного кабинета
                  </a></td>

                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-news-41'">
                      <input class="auth-block__checkbox"  type="checkbox"  v-model="group.balance.email"
                             :id="'checkbox-news-41'" @change.prevent="saveByName(['USER_LOW_BALANCE'], 'email', 'balance')" />

                      <span class="auth-block__checkbox-label"></span>
                    </label>
                  </td>
                  <td class="checkbox-cel">
                    <label class="default-checkbox" for="checkbox-news44">
                      <input class="" v-model="group.balance.tlgrm" id="checkbox-news44" type="checkbox" @change.prevent="saveByName(['USER_LOW_BALANCE'], 'tlgrm', 'balance')"/>

                      <span class=""></span>
                    </label>
                  </td>

                </tr>
              </table>
            </h4>
          </div>
          <div id="collapse4" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
            <div class="panel-body">

              <table class="table card-table table-vcenter  notification-table">
                <tr v-for="({ type, email, sms, tlgrm, telegram, telegramChat }, index) in profile.notificationSettings" :key="index"  v-if="type === 'USER_LOW_BALANCE'">
                  <td width="50%">{{ getType(type) }}</td>

                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-11'+index">
                      <input class="auth-block__checkbox" type="checkbox"
                             :id="'checkbox-11'+index" v-model="profile.notificationSettings[index].email" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                      <span class="auth-block__checkbox-label"></span>
                    </label>
                  </td>
                  <td class="checkbox-cel">
                    <label class="default-checkbox" :for="'checkbox-13'+index">
                      <input class="" type="checkbox"
                             :id="'checkbox-13'+index" v-model="profile.notificationSettings[index].tlgrm" @change.prevent="save(index)" :disabled="baseNotif(profile.notificationSettings[index])"/>

                      <span class=""></span>
                    </label>
                  </td>

                </tr>
              </table>


            </div>
          </div>
        </div>
      </div>



		</div>
	</form>
</template>

<script>
	import gql from 'graphql-tag';

	import { omit } from 'ramda';

	export default {
		name: 'Notifications',
		apollo: {
			profile: {
        query: gql`
					query {
						getProfile {
							email,
							phone,
							notificationSettings {
								type,
								email,
								sms,
								tlgrm,
								extraEmail,
								telegram,
								telegramChat
							}
						}
					}
				`,
        update(data){

          data.getProfile.notificationSettings.map(item => {
          if (item.type === "ALARM_SMS") {
            item.tlgrm = true
            item.email = true
          }
          return item
        })
          this.checkGroupCheckboxes(data.getProfile.notificationSettings)
          return data.getProfile
      }
			}
		},
		data: () => ({
      group: {
        news: {
          tlgrm: false,
          email: false
        },
        finance: {
          tlgrm: false,
          email: false
        },
        errors: {
          tlgrm: false,
          email: false
        },
        balance: {
          tlgrm: false,
          email: false
        },
      },
			profile: null,
      myPopover: {},
			values: {
				telegram: "",
				extraEmail: ""
			},
			status: {
				error: null,
				success: null
			}
		}),
    mounted() {
    },
    methods: {
		  checkGroupCheckboxes(data){

		    const result = data.reduce((acc, item) => {
		      if(item.type === 'GET_NEWS' || item.type === 'ALARM_SMS'){
		        if(item.tlgrm) acc.news.tlgrm++
		        if(item.email) acc.news.email++
          }
		      if(item.type === 'GET_DAY_SALES' || item.type === 'GET_WEEK_SALES' || item.type === 'GET_MONTH_SALES' || item.type === 'CONTROLLER_ENCASHMENT'){
		        if(item.tlgrm) acc.finance.tlgrm++
		        if(item.email) acc.finance.email++
          }
		      if(item.type === 'MACHINE_ATTENTION_REQUIRED' || item.type === 'CONTROLLER_NO_CONNECTION' || item.type === 'CONTROLLER_NO_SALES' || item.type === 'NO_COINS_24H' || item.type === 'NO_CASH_24H' || item.type === 'NO_CASHLESS_24H' || item.type === 'NO_RECEIPT_24H'){
		        if(item.tlgrm) acc.errors.tlgrm++
		        if(item.email) acc.errors.email++
          }
		      if(item.type === 'USER_LOW_BALANCE'){
		        if(item.tlgrm) acc.balance.tlgrm++
		        if(item.email) acc.balance.email++
          }
		      return acc
        }, {
          news: {
            tlgrm: 0,
            email: 0
          },
          finance: {
            tlgrm: 0,
            email: 0
          },
          errors: {
            tlgrm: 0,
            email: 0
          },
          balance: {
            tlgrm: 0,
            email: 0
          },
        })

        if(result.news.tlgrm === 2) this.group.news.tlgrm = true
        if(result.news.email === 2) this.group.news.email = true

        if(result.finance.tlgrm === 4) this.group.finance.tlgrm = true
        if(result.finance.email === 4) this.group.finance.email = true

        if(result.errors.tlgrm === 7) this.group.errors.tlgrm = true
        if(result.errors.email === 7) this.group.errors.email = true

        if(result.balance.tlgrm === 1) this.group.balance.tlgrm = true
        if(result.balance.email === 1) this.group.balance.email = true

        if(result.news.tlgrm !== 2) this.group.news.tlgrm = false
        if(result.news.email !== 2) this.group.news.email = false

        if(result.finance.tlgrm !== 4) this.group.finance.tlgrm = false
        if(result.finance.email !== 4) this.group.finance.email = false

        if(result.errors.tlgrm !== 7) this.group.errors.tlgrm = false
        if(result.errors.email !== 7) this.group.errors.email = false

        if(result.balance.tlgrm !== 1) this.group.balance.tlgrm = false
        if(result.balance.email !== 1) this.group.balance.email = false

      },
		  baseNotif(data){
		    if(data.type === "ALARM_SMS") return true
        return false
      },
			getType (type) {
				switch (type) {
					case 'CONTROLLER_NO_CONNECTION': return 'Нет связи с автоматом';
					case 'CONTROLLER_NO_SALES': return 'Не было продаж за последние сутки';
					case 'CONTROLLER_ENCASHMENT': return 'Произведена инкассация';
					case 'USER_LOW_BALANCE': return 'Необходимо пополнить баланс';
					case 'GET_MONTH_SALES': return 'Получать ежемесячную выручку';
					case 'GET_WEEK_SALES': return 'Получать еженедельную выручку';
					case 'GET_DAY_SALES': return 'Получать ежедневную выручку';
					case 'GET_NEWS': return 'Получать новости сервиса';
					case 'NO_RECEIPT_24H': return 'Нет чеков за 24 часа';
					case 'NO_CASHLESS_24H': return 'Нет безнала за 24 часа';
					case 'NO_COINS_24H': return 'Нет монет за 24 часа';
					case 'NO_CASH_24H': return 'Нет купюр за 24 часа';
					case 'MACHINE_ATTENTION_REQUIRED': return 'Неисправность автомата';
					case 'ALARM_SMS': return 'Экстренные уведомления по СМС';
					default: return 'Неизвестный тип уведомления';
				}
			},
      async saveByName(array, type, source){
        this.profile.notificationSettings = this.profile.notificationSettings.map(item => {
          if (!array.includes(item.type)) return item
          switch (type){
            case "tlgrm":
                if(this.group[source].tlgrm === false) item.tlgrm = false
                if(this.group[source].tlgrm === true) item.tlgrm = true

              break
            case "email":
              if(this.group[source].email === false) item.email = false
              if(this.group[source].email === true) item.email = true
              break
            default:
              break
          }
          return item
        })
        await this.saveAll()
      },
			async saveAll () {
				for(let i in this.profile.notificationSettings){
					await this.save(i)
				}
			},
			async save (index) {
				const notification = this.profile.notificationSettings[index];
        this.checkGroupCheckboxes(this.profile.notificationSettings)

				await this.$apollo.mutate({
					mutation: gql`
					mutation EditSettings ($data: UpdateNotificationSettingInput!) {
						updateNotificationSetting(input: $data) {
							type
						}
					}
					`,
					variables: {
						data: omit(['__typename'], notification)
					}
				});
			}
		},
	computed: {
			extraEmail:{
				get () {
					const [notifMail] = this.profile.notificationSettings.filter(notif => notif.extraEmail)
					if(notifMail) {
						this.values.extraEmail = notifMail.extraEmail
					}
					return this.values.extraEmail
				},
				set (value) {
					this.profile.notificationSettings = this.profile.notificationSettings.map(notif =>{
						notif.extraEmail = value
						return notif
					})
					this.values.extraEmail = value
				}
			},
			telegram:{
				get () {

					const [notifMail] = this.profile.notificationSettings.filter(notif => notif.telegram)
					if(notifMail){
						this.values.telegram = notifMail.telegram
					}
					return this.values.telegram
				},
				set (value) {
					this.profile.notificationSettings = this.profile.notificationSettings.map(notif =>{
						notif.telegram = value
						return notif
					})
					this.values.telegram = value
				}
			},


	}
	}
</script>

<style scoped lang="scss">
	.top-buttons {
		justify-content: flex-end;
	}
  .width-notif {
    width: 45%;
    overflow: hidden;
  }
  //table {
  //  max-width: 100%
  //}
</style>
