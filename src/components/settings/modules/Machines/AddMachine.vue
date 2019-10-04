<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-lg-10 offset-lg-1 col-md-12">
					<Validate
					formName="addMachine"
					title="Добавление автомата"
					:schema="schema" ref="form"
					@onSubmit="save"
					@onSuccess="onSuccess"
					>
					<template slot="form">
						<div class="row" v-if="!$apollo.loading">
							<div class="col-md-12 col-lg-12">
								<div class="form-group">
									<label class="form-label f-b">Номер автомата</label>
									<Field name="number" formName="addMachine" className="form-control" placeholder="Введите номер автомата"/>
								</div>
								<div class="form-group">
									<label class="form-label f-b">Название автомата</label>
									<Field name="name" formName="addMachine" className="form-control" placeholder="Введите название автомата"/>
								</div>
								<div class="form-group">
									<label class="form-label f-b">Место установки автомата</label>
									<Field name="place" formName="addMachine" className="form-control" placeholder="Введите место установки автомата"/>
								</div>

								<div class="form-group">
									<label class="form-label f-b">Группа автомата</label>
									<CustomSelect
									className="form-control"
									:initialValue="input.groupId"
									:options="machine.groups"
									@onSelect="onGroupSelect"
									@onBlur="onGroupAppend"
									/>
								</div>

								<div class="form-group">
									<label class="form-label f-b">Тип автомата</label>
									<select class="form-control custom-select" v-model="input.typeId">
										<option v-for="type in machine.types"
										:key="type.id" :value="type.id">
										{{ type.name }}
									</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Модель автомата</label>
								<select class="form-control custom-select" v-model="input.equipmentId">
									<option v-for="equipment in machine.equipments"
									:key="equipment.id" :value="equipment.id">
									{{ equipment.name }}
								</option>
							</select>
						</div>

						<div class="form-group">
							<label class="form-label f-b">Привязать контроллер</label>
							<select class="form-control custom-select" v-model="input.controllerId">
								<option v-for="controller in getAvailableControllers(machine.controllers)"
								:key="controller.id" :value="controller.id">
								{{ controller.uid }}
							</option>
						</select>
					</div>
						<div class="form-group">
							<label class="form-label f-b">Привязать KKT</label>
							<select class="form-control custom-select" v-model="input.kktId">
								<option key="0" value="0">
									Все ККМ
								</option>
								<option v-for="kkt in machine.kkts"
								:key="kkt.id" :value="kkt.id">
								{{ kkt.kktFactoryNumber}}
							</option>
						</select>
					</div>

					</div>
				</div>
				<div class="aligned-text" v-else>Загрузка...</div>
			</template>
			<template slot="submit" v-if="!$apollo.loading">
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

import CustomSelect from '@/modules/CustomSelect';

import { required } from '@/utils/validation';

import Validate from '@/modules/validation/Validate';
import Field from '@/modules/validation/Field';

export default {
	name: 'AddMachine',
	components: {
		Validate,
		Field,
		CustomSelect
	},
	data: () => ({
		machine: {
			equipments: [],
			groups: [],
			types: []
		},
		input: {
			equipmentId: 1,
			groupId: 1,
			typeId: 1,
			kktId: 0
		},

		schema: {
			name: [required],
			number: [required],
			place: [required]
		},

		machineUploading: false
	}),
	apollo: {
		machine: {
			query: gql`
			query {
				getMachineGroups {
					id
					name
				}
				getMachineTypes {
					id
					name
				}
				getEquipments {
					id
					name
				}

				getControllers {
					id
					uid
				}
				getUserKkts {
					id
					kktFactoryNumber
        			kktRegNumber
				}
			}
			`,
			update ({ getMachineTypes, getMachineGroups, getEquipments, getControllers, getUserKkts }) {
				if (!this.machineUploading) {
					this.input = {
						equipmentId: getEquipments[0].id,
						groupId: getMachineGroups[0].id,
						typeId: getMachineTypes[0].id,
						controllerId: getControllers[0].id,
						kktId: 0
					};
				}

				return {
					types: getMachineTypes,
					groups: getMachineGroups,
					equipments: getEquipments,
					controllers: getControllers,
					kkts: getUserKkts
				};
			}
		}
	},
	methods: {
		getAvailableControllers(controllers) {
			return controllers.filter(controller => !controller.machine)
		},
		async save () {
            this.input.kktId = Number(this.input.kktId)
			const data = {
				...this.input,
				...this.$store.getters['cache/data']
			};

			try {
				this.machineUploading = true;

				const { errors } = await this.$apollo.mutate({
					mutation: gql`
					mutation saveMachine ($data: CreateMachineInput!) {
						createMachine (input: $data) {
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
			this.machineUploading = false;

			const router = this.$router;
			setTimeout(function () { router.push('/settings'); }, 1000);
		},

		onGroupSelect (group) {
			this.input.groupId = group.id;
		},
		async onGroupAppend (name) {
			if (name && name !== this.input.groupId) {
				const { data } = await this.$apollo.mutate({
					mutation: gql`
					mutation ($input: CreateMachineGroupInput!) {
						createMachineGroup(input: $input) {
							id,
							name
						}
					}
					`,
					variables: {
						input: {
							name
						}
					}
				});

				this.machine.groups.push(data.createMachineGroup);
			}
		}
	}
}
</script>
