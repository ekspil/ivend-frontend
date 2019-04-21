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
									<option value="mdb">mdb</option>
									<option value="exe">exe</option>
									<option value="cashless" selected>cashless</option>
									<option value="cashless_free">cashless_free</option>
									<option value="exe_ph">exe_ph</option>
									<option value="mdb_D">mdb_D</option>
									<option value="exe_D">exe_D</option>
									<option value="exe_ph_D">exe_ph_D</option>
									<option value="cashless_D">cashless_D</option>
									<option value="mdb_C">mdb_C</option>
									<option value="exe_C">exe_C</option>
									<option value="exe_ph_C">exe_ph_C</option>
									<option value="cashless_C">cashless_C</option>
									<option value="ps_p">ps_p</option>
									<option value="ps_m_D">ps_m_D</option>
									<option value="ps_M_D">ps_M_D</option>
									<option value="ps_m_C">ps_m_C</option>
									<option value="ps_M_C">ps_M_C</option>
									<option value="mdb2">mdb2</option>
								</select>
							</div>

							<div class="form-group">
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
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Режим фискализации</label>
								<select class="form-control custom-select" v-model="input.fiscalizationMode">
									<option value="NO_FISCAL">Нефискальный</option>
									<option value="UNAPPROVED">Без подтверждения</option>
									<option value="APPROVED">С подтверждением</option>
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
			update ({ getEquipments, getRevisions, getAvailableServices, getMachines }) {
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
