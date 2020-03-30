<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-lg-10 offset-lg-1 col-md-12">
					<Validate
					formName="addController"
					title="Добавление контроллера"
					:schema="schema" ref="form"
					@onSubmit="save"
					@onSuccess="onSuccess"
					>
					<template slot="form">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<div class="form-group">
									<label class="form-label f-b">Номер контроллера</label>
									<Field name="uid" formName="addController" className="form-control" placeholder="Введите номер контроллера"/>
								</div>

							<div class="form-group">
								<label class="form-label f-b">Состояние контроллера</label>
								<select v-model="input.status" class="form-control custom-select">
									<option value="ENABLED">Активирован</option>
									<option value="DISABLED">Деактивирован</option>
									<option value="TRAINING">Обучение</option>
									<option value="PAUSED">Приостановлен</option>
									<option value="DEBUG">Отладка</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Режим работы</label>
								<select class="form-control custom-select" v-model="input.mode">
									<option value="mdb">MDB</option>
									<option value="mdb1">MDB1</option>
									<option value="mdb2">MDB2</option>
									<option value="exe">EXE</option>
									<option value="cashless" selected>CASHLESS</option>
									<option value="cashless2" selected>CASHLESS2</option>
									<option value="cashless_free">CASHLESS_Free</option>
									<option value="ps_m_D">PULSE</option>
									<option value="ps_m_2">PULSE2</option>
									<option value="ps_m_3">PULSE3</option>
									<option value="ps_p">PULSE4</option>
									<option value="rs232">RS232</option>

								</select>
							</div>

							<div v-if="false" class="form-group">
								<label class="form-label f-b">Режим считывания статистики</label>
								<select class="form-control custom-select" v-model="input.readStatMode">
									<option value="COINBOX">Монетник</option>
									<option value="MACHINE">Автомат</option>
									<option value="COINBOX_MACHINE">Монетник+автомат</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Режим работы терминала</label>
								<select class="form-control custom-select" v-model="input.bankTerminalMode">
									<option value="NO_BANK_TERMINAL">Нет</option>
									<option value="INPAS">ИНПАС</option>
									<option value="SBERBANK">Сбербанк</option>
									<option value="d200i_v">PAX D200 Инпас Vend</option>
									<option value="d200i_t">PAX D200 Инпас Trade</option>
									<option value="d200s_v">PAX D200 Сбер Vend</option>
									<option value="d200s_t">PAX D200 Сбер Trade</option>
									<option value="otiu_v">OTI UNO Vend</option>
									<option value="otiu_t">OTI UNO Trade</option>
									<option value="otit_v">OTI TRIO Vend</option>
									<option value="otit_t">OTI TRIO Trade</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Режим фискализации</label>
								<select class="form-control custom-select" v-model="input.fiscalizationMode">
									<option value="NO_FISCAL">Нефискальный</option>
									<option value="UNAPPROVED">Фискальный</option>
									<option v-if="false" value="APPROVED">С подтверждением</option>
								</select>
							</div>

							<div class="form-group" v-if="false">
								<label class="form-label f-b">Версия контроллера</label>
								<select class="form-control custom-select" v-model="input.revisionId">
									<option v-for="revision in controller.revisions"
									:key="revision.id" :value="revision.id">
									{{ revision.name }}
								</option>
							</select>
						</div>
				</div>
			</div>
		</template>
		<template slot="submit">
			<button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
		</template>
	</Validate>
</div>
</div>
</div>
</div>
</template>

<script>
import gql from 'graphql-tag';

import { convertServerError } from '@/utils';
import { required } from '@/utils/validation';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

export default {
	name: 'AddController',
	components: {
		Validate,
		Field
	},
	data: () => ({
		controller: {
			revisions: [],
			equipments: [],
			machines: []
		},
		input: {
			status: "ENABLED",
			mode: "cashless",
			revisionId: 1,
			readStatMode: "COINBOX",
			bankTerminalMode: "NO_BANK_TERMINAL",
			fiscalizationMode: "NO_FISCAL"
		},

		schema: {
			name: [required],
			uid: [required]
		}
	}),
	apollo: {
		controller: {
			query: gql`
			query {
				getEquipments {
					id,
					name
				},

				getRevisions {
					id,
					name
				},

				getMachines {
					id,
					name
				}
			}
			`,
			update ({ getEquipments, getRevisions, getMachines }) {
				return {
					equipments:getEquipments,
					revisions: getRevisions,
					machines: getMachines
				};
			}
		}
	},
	methods: {
		async save () {
			const data = {
				...this.input,
				...this.$store.getters['cache/data']
			};

			try {
				const { errors } = await this.$apollo.mutate({
					mutation: gql`
					mutation saveController ($data: CreateControllerInput!) {
						createController (input: $data) {
							uid
						}
					}
					`,
					variables: {
						data
					}
				});

				this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
			} catch (error) {
				this.$refs.form.showMessage('error', convertServerError(error.message));
			}
		},
		onSuccess () {
			const router = this.$router;
			setTimeout(function () { router.push('/settings'); }, 1000);
		},

		getBillingAbbr (date) {
			if (date === 'DAILY') {
				return 'день';
			} else if (date === 'MONTHLY') {
				return 'мес.';
			}
		}
	}
}
</script>
