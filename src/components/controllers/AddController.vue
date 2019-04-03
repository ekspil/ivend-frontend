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
								<label class="form-label f-b">Тип связи</label>
								<div class="selectgroup w-100">
									<label class="selectgroup-item">
										<input type="radio" name="connection" value="01"
										class="selectgroup-input" checked>
										<span class="selectgroup-button">3G</span>
									</label>
									<label class="selectgroup-item">
										<input type="radio" name="connection" value="02"
										class="selectgroup-input">
										<span class="selectgroup-button">WiFi</span>
									</label>
									<label class="selectgroup-item">
										<input type="radio" name="connection" value="03"
										class="selectgroup-input">
										<span class="selectgroup-button">Ethernet</span>
									</label>
								</div>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Режим работы терминала</label>
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
								<select class="form-control custom-select">
									<option value="0" selected>Выберите режим</option>
									<option value="1">Монетник</option>
									<option value="2">Автомат</option>
									<option value="3">Монетник+автомат</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Режим работы</label>
								<select class="form-control custom-select">
									<option value="0" selected>Нет</option>
									<option value="1">ИНПАС</option>
									<option value="2">Сбербанк</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Версия контроллера</label>
								<select class="form-control custom-select" v-model="input.revisionId">
									<option v-for="revision in controller.revisions"
									:key="revision.id" :value="revision.id">
									{{ revision.name }}
								</option>
							</select>
						</div>

						<div class="form-group">
							<label class="form-label f-b">Привязать автомат:</label>
							<select class="form-control custom-select" v-model="input.machineId">
								<option v-for="machine in controller.machines"
								:key="machine.id" :value="machine.id">
								{{ machine.name }}
							</option>
						</select>
					</div>

					<div class="form-group">
						<label class="form-label f-b">Фискальный регистратор</label>
						<div class="input-group">
							<input type="text" class="form-control" value="ККТ Казначей ФА"
							placeholder="Выберите регистратор">
							<span class="input-group-append">
								<button class="btn btn-dark"
								type="button">Настроить</button>
							</span>
						</div>
					</div>

					<div class="form-group select-services">
						<label class="form-label f-b">Услуги</label>


						<label class="toggle-checkbox" v-for="service in controller.services.controller" :key="service.id">
							<input type="checkbox" v-model="input.serviceIds[service.id]"/>
							<span class="slider round"> </span>
							<span class="label-text">{{ service.name }} ({{ service.price }} руб/{{ getBillingAbbr(service.billingType) }})</span>
						</label>
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
			services: {},
			machines: []
		},
		input: {
			status: "ENABLED",
			mode: "cashless",
			revisionId: 1,
			serviceIds: [],
			machineId: 1
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

				getAvailableServices {
					controller {
						id,
						name,
						price,
						billingType
					}
				},

				getMachines {
					id,
					name
				}
			}
			`,
			update ({ getEquipments, getRevisions, getAvailableServices, getMachines }) {
				if (getMachines.length > 0) {
					this.input.machineId = getMachines[0].id;
				}

				return {
					equipments:getEquipments,
					revisions: getRevisions,
					services: getAvailableServices,
					machines: getMachines
				};
			}
		}
	},
	methods: {
		async save () {
			const data = {
				...this.input,
				...this.$store.getters['cache/data'],
				serviceIds: this.input.serviceIds.map((id, index) => index).filter(id => id)
			};

			try {
				const { errors } = await this.$apollo.mutate({
					mutation: gql`
					mutation saveController ($data: CreateControllerInput!) {
						createController (input: $data) {
							name
						}
					}
					`,
					variables: {
						data
					}
				});

				this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
			} catch (error) {
				this.$refs.form.showMessage('error', 'Ошибка сервера.');
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
