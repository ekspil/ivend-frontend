<template>
	<div class="container">
		<div class="side-app max-w-1200">
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
									<label class="form-label f-b">{{machineHeaders.number}}</label>
									<Field name="number" formName="addMachine" className="form-control" placeholder="Введите номер автомата"/>
								</div>
								<div class="form-group">
									<label class="form-label f-b">{{machineHeaders.name}}</label>
									<Field name="name" formName="addMachine" className="form-control" placeholder="Введите название автомата"/>
								</div>
								<div class="form-group">
									<label class="form-label f-b">{{machineHeaders.address}}</label>
									<Field name="place" formName="addMachine" className="form-control" placeholder="Введите место установки автомата"/>
								</div>




                <div class="form-group">
                  <label class="form-label f-b">{{machineHeaders.group}}

                    <a href="#" data-toggle="modal" data-target="#exampleModal2">
                      <i class="dropdown-icon fe fe-trash" style="margin-left: 5px;"></i>
                    </a>
                    </label>
                  <div class="row">
                    <div class="col-md-4">
                      <CustomSelect
                          className="form-control"
                          :initialValue="input.groupId"
                          :options="machine.groups"
                          :notNumber="true"
                          @onSelect="onGroupSelect"
                          @onBlur="onGroupAppend"
                          ref="goodSelect"
                          prefix="1"
                      /></div>
                    <div class="col-md-4">
                      <CustomSelect
                          className="form-control"
                          :initialValue="input.group2Id"
                          :options="machine.groups"
                          :notNumber="true"
                          @onSelect="onGroupSelect"
                          @onBlur="onGroupAppend"
                          ref="goodSelect2"
                          prefix="2"
                      /></div>
                    <div class="col-md-4">
                      <CustomSelect
                          className="form-control"
                          :initialValue="input.group3Id"
                          :options="machine.groups"
                          :notNumber="true"
                          @onSelect="onGroupSelect"
                          @onBlur="onGroupAppend"
                          ref="goodSelect3"
                          prefix="3"
                      /></div>

                  </div>
                </div>

								<div class="form-group">
									<label class="form-label f-b">{{machineHeaders.type}}</label>
									<select class="form-control custom-select" v-model="input.typeId">
										<option key="" value="0" selected="selected">
										</option>
										<option v-for="type in machine.types"
										:key="type.id" :value="type.id">
										{{ type.name }}
									</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">{{machineHeaders.model}}</label>
								<select class="form-control custom-select" v-model="input.equipmentId">
									<option v-for="equipment in machine.equipments" v-if="equipment.machineTypeId === input.typeId"
									:key="equipment.id" :value="equipment.id">
									{{ equipment.name }}
								</option>
							</select>
						</div>

						<div class="row align-items-end justify-content-between">
							<div class="col">
								<label class="form-label f-b">{{machineHeaders.controller}}</label>
								<select class="form-control custom-select" v-model="input.controllerId">
									<option v-bind:value="null" selected>Без контроллера</option>
									<option v-for="controller in getAvailableControllers(machine.controllers)"
											:key="controller.id" :value="controller.id">
										{{ controller.uid }}
									</option>
								</select>

							</div>

							<div class="col-auto">
								<button class="btn btn-primary ml-auto" @click.prevent="controllerEditPage()">Параметры</button>
							</div>
					</div>
						<div style="margin-top: 1rem" class="row align-items-end justify-content-between">
							<div class="col">
								<label class="form-label f-b">{{machineHeaders.kkt}}</label>
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
							<div class="col-auto">
								<button class="btn btn-primary ml-auto" @click.prevent="kktEditPage()">Параметры</button>
							</div>

					</div>
						<div style="margin-top: 1rem" class="row align-items-end justify-content-between">
							<div class="col">
								<label class="form-label f-b">{{machineHeaders.printer}}</label>
								<input name="number" v-model="printer" class="form-control" placeholder="Привяжите номер принтера" disabled="true"/>
							</div>
							<div class="col-auto">
								<button  type="button" class="btn btn-primary ml-auto" data-toggle="modal" data-target="#exampleModal">Параметры</button>
							</div>

					</div>


								<div class="modal fade" id="exampleModal" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered">
										<div class="modal-content">
											<div class="modal-header">
												<h5 class="modal-title" id="exampleModalLabel">Привяжите принтер</h5>

											</div>
											<div class="modal-body">
												<input name="number" v-model="printerNew" class="form-control" placeholder="Привяжите принтер" />
											</div>
											<div class="modal-footer">
												<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
												<button type="button" class="btn btn-primary" @click.prevent="printerEditPage()">Сохранить</button>
											</div>
										</div>
									</div>
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



    <div v-if="machine.groups && machine.groups.length > 0" class="modal fade" id="exampleModal2" tabindex="-1" data-backdrop="static"  role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel2">Удаление группы</h5>

          </div>
          <div class="modal-body">
            <select class="form-control custom-select" v-model="selectedGroup.id">
              <option v-for="group in machine.groups"
                      :key="group.id" :value="group.id">
                {{'id: '+group.id+', Группа: '+group.name}}
              </option>
            </select>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" >Закрыть</button>
            <button type="button" class="btn btn-primary" @click.prevent="deleteGroup">Удалить</button>
          </div>
        </div>
      </div>
    </div>



</div>
</template>

<script>
import gql from 'graphql-tag';

import CustomSelect from '@/modules/CustomSelect';

import { required } from '@/utils/validation';
import { machineHeaders } from '@/utils/lists/Machine';

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

    selectedGroup: {
      id: null
    },
		machine: {
			equipments: [],
			groups: [],
			types: []
		},
		machineHeaders,
		input: {
			controllerId: null,
			equipmentId: 1,
			groupId: null,
			group2Id: null,
			group3Id: null,
			typeId: 1,
			kktId: 0
		},
		printer: null,
		printerNew: null,
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
					machineTypeId
				}

				getControllers {
					id
					uid
					machine {
						id
					}
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
						typeId: 0,
						controllerId: this.getAvailableControllers(getControllers)[0]?this.getAvailableControllers(getControllers)[0].id: null,
						kktId: 0
					};
				}

				return {
					types: getMachineTypes.sort(function(a, b) {if (a.name > b.name) return 1; if (a.name == b.name) return 0; if (a.name < b.name) return -1; }),
					groups: getMachineGroups,
					equipments: getEquipments,
					controllers: getControllers,
					kkts: getUserKkts
				};
			}
		}
	},
	methods: {
    async deleteGroup() {
      if(!this.selectedGroup.id){
        alert("Выберете группу сперва")
        return
      }

      $('#exampleModal2').modal('hide')

      try {

        const { errors } = await this.$apollo.mutate({
          mutation: gql`
					mutation deleteMachineGroup ($id: Int!) {
						deleteMachineGroup (id: $id)
					}
					`,
          variables: {
            id: this.selectedGroup.id
          }
        });

        this.$refs.form.process({ errors, success: 'Успешно сохранено.' });

        alert("Успешное удаление")

      } catch (error) {

        alert("Ошибка удалени, вероятно вгруппе остались автоматы!")
      }
    },
		controllerEditPage(){
			if(!this.input.controllerId) return
			window.open("/controllers/edit/"+this.input.controllerId, '_blank').focus();
		},
		kktEditPage(){
			if(!this.input.kktId) return
			window.open("/fiscal/edit/"+this.input.kktId, '_blank').focus();
		},
		printerEditPage(){
			this.printer = this.printerNew
			$('#exampleModal').modal('hide')

		},
		getAvailableControllers(controllers) {
			if(!controllers) return []
			return controllers.filter(controller => !controller.machine)
		},
		async save () {
            this.input.kktId = Number(this.input.kktId)
      this.input.groupId = Number(this.$refs.goodSelect.value)
      this.input.group2Id = Number(this.$refs.goodSelect2.value)
      this.input.group3Id = Number(this.$refs.goodSelect3.value)
			const data = {
				...this.input,
				...this.$store.getters['cache/data']
			};
            const dataP = {
				printerId: this.printer,
				controllerId: this.input.controllerId
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

				if(this.printer && this.input.controllerId){
					const {err} = await this.$apollo.mutate({
						mutation: gql`
					mutation updatePrinterOnController ($dataP: UpdatePrinter!) {
						updatePrinterOnController (input: $dataP)
					}
					`,
						variables: {
							dataP
						}
					});
					this.$refs.form.process({ err, success: 'Успешно сохранено.' });
				}

				if(this.printer && !this.input.controllerId){
					this.$refs.form.process({ errors, success: 'Сохранено без принтера, т.к. не выбран контроллер.' });
				}
				else{
					this.$refs.form.process({ errors, success: 'Успешно сохранено.' });
				}
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
