<template>
	<form name="notifications" action="POST" v-if="profile">
		<div class="table-responsive notification-table">
			<table class="table card-table table-vcenter text-nowrap notification-table">
				<thead>


					<tr>
						<th>Событие</th>
						<th>Email</th>
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

					<tr v-for="({ type, email, sms, tlgrm, telegram, telegramChat }, index) in profile.notificationSettings" :key="index">
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
        update: (data) => {
          data.getProfile.notificationSettings.map(item => {
          if (item.type === "ALARM_SMS") {
            item.tlgrm = true
            item.email = true
          }
          return item
        })
          return data.getProfile
      }
			}
		},
		data: () => ({
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
			async saveAll () {
				for(let i in this.profile.notificationSettings){
					await this.save(i)
				}
			},
			async save (index) {
				const notification = this.profile.notificationSettings[index];

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
</style>
