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
									<label class="form-label f-b">{{controllerHeaders.number}}</label>
									<Field name="uid" formName="addController" className="form-control" placeholder="Введите номер контроллера"/>
								</div>

							<div class="form-group">
								<label class="form-label f-b">{{controllerHeaders.state}}</label>
								<select v-model="input.status" class="form-control custom-select">
									<option v-for="item in controllerStates" :value="item.value" :key="item.value">{{item.name}}</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">{{controllerHeaders.mode}}</label>
								<select class="form-control custom-select" v-model="input.mode">
									<option v-for="item in controllerType" :value="item.value" :key="item.value">{{item.name}}</option>

								</select>
							</div>

							<div v-if="false" class="form-group">
								<label class="form-label f-b">{{controllerHeaders.statMode}}</label>
								<select class="form-control custom-select" v-model="input.readStatMode">
									<option v-for="item in controllerStatType" :value="item.value" :key="item.value">{{item.name}}</option>

								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">{{controllerHeaders.terminalMode}}</label>
								<select class="form-control custom-select" v-model="input.bankTerminalMode">
									<option v-for="item in controllerTerminal" :value="item.value" :key="item.value">{{item.name}}</option>

								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">{{controllerHeaders.fiscalMode}}</label>
								<select class="form-control custom-select" v-model="input.fiscalizationMode">
									<option v-for="item in controllerFiscalType" :value="item.value" :key="item.value">{{item.name}}</option>

								</select>
							</div>

							<div class="form-group" v-if="false">
								<label class="form-label f-b">{{controllerHeaders.version}}</label>
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
import {controllerHeaders, controllerStates, controllerType, controllerStatType, controllerTerminal, controllerFiscalType } from '@/utils/lists/Controller';

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
		controllerHeaders,
		controllerFiscalType,
		controllerTerminal,
		controllerStates,
		controllerType,
		controllerStatType,
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
