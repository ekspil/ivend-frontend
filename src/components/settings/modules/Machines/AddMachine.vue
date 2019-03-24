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
                            <div class="row">
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
                                    <label class="form-label f-b">Модель автомата</label>
                                    <select class="form-control custom-select" v-model="input.equipmentId">
                                        <option v-for="equipment in machine.equipments"
                                        :key="equipment.id" :value="equipment.id">
                                        {{ equipment.name }}
                                        </option>
                                  </select>
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
                typeId: 1
            },

            schema: {
                name: [required],
                number: [required],
                place: [required]
            }
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
					}
				`,
				update ({ getMachineTypes, getMachineGroups, getEquipments }) {
					this.input.groupId = getMachineGroups[0].id;
					return {
						types: getMachineTypes,
						groups: getMachineGroups,
            equipments: getEquipments
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
