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
						-->
						<th>SMS</th>
					</tr>
				</thead>
				<tbody>

					<tr v-for="({ type, email, sms }, index) in profile.notificationSettings" :key="index">
						<td>Нет связи с автоматом</td>

						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-11">
								<input class="auth-block__checkbox" type="checkbox"
								id="checkbox-11" v-model="profile.notificationSettings[index].email">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-12">
								<input class="auth-block__checkbox" type="checkbox"
								id="checkbox-12" v-model="profile.notificationSettings[index].sms">

								<span class="auth-block__checkbox-label"></span>
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
								sms
							}
						}
					}
				`,
				update: data => data.getProfile
			}
		},
		data: () => ({
			profile: null
		}),
		methods: {
			async save () {
				const notification = this.profile.notificationSettings[0];
				await this.$apollo.mutate({
					mutation: gql`
						mutation EditSettings ($data: UpdateNotificationSettingInput!) {
							updateNotificationSetting(input: $data) {
								type
							}
						}
					`,
					variables: {
						data: {
							type: notification.type,
							email: notification.email,
							sms: notification.sms
						}
					}
				});
			}
		}
	}
</script>
