<template>
	<div class="container" v-if="controller">
		<div class="side-app">


			<div class="row mt-5">
				<div class="col-lg-10 offset-lg-1 col-md-12">
					<form method="post" class="card">
						<div class="card-header">
							<h3 class="card-title f-b">Добавление товара в матрицу товаров №{{ controller.uid }}</h3>
						</div>


						<div class="card-header-links">
							<router-link :to="`/controllers/edit/${$route.params.id}`" class="card-header-links__item">Вернуться назад</router-link>
						</div>


						<div class="table-responsive product-matrix-table product-matrix-table--add-rproduct">
							<table class="table card-table table-vcenter text-nowrap">
								<thead>
									<tr>
										<th class="">Id</th>
										<th class="">Название товара</th>
									</tr>
								</thead>
								<tbody>

									<tr >
										<td class="input-cel">
											<select data-placeholder="Выберите из списка" v-model="itemId">
												<option :value="button.buttonId">{{ button.buttonId }}</option>
											</select>
										</td>
										<td class="input-cel">
											<input type="text" placeholder="Введите название товара" v-model="itemName" :class="validation.itemName ? 'input-invalid' : ''"/>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div class="card-footer text-right">
							<div class="d-flex">
								<button type="submit" class="btn btn-primary ml-auto" @click.prevent="save">Добавить товар</button>
							</div>

							<transition name="fade">
								<div class="validation-error" v-if="status.error">{{ status.error }}</div>
								<div class="success-message" v-if="status.success">{{ status.success }}</div>
							</transition>
						</div>
					</form>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import gql from 'graphql-tag';

    import { head, isEmpty } from 'ramda';
    import { areKeysNull } from '@/utils';
    import {
        validate, mapValidationObject,
        required
    } from '@/utils/validation';

	export default {
		name: 'AddGoods',
		data: () => ({
			controller: null,

			itemId: 0,
			itemName: '',

			validation: {},
			status: {
				success: '',
				error: null
			}
		}),
		apollo: {
			controller: {
				query: gql`
					query ($id: Int!) {
						controller: getController (id: $id) {
							id,
							uid,
							itemMatrix {
								id,
								buttons {
									buttonId
								}
							}
						}
					}
				`,
				variables () {
					return {
						id: Number(this.$route.params.id)
					};
				}
			}
		},
		methods: {
			showSuccessMessage (message = 'Успешно сохранено.') {
                this.status.success = message;
                setTimeout(() => { this.status.success = ''; }, 2500);
            },
			async save () {
				this.validation = mapValidationObject(validate({ itemId: this.itemId, itemName: this.itemName }, {
					itemName: [required]
				}));

				console.log(this.validation);

				if (areKeysNull(this.validation)) {
                    const itemData = {
                        itemMatrixId: this.controller.itemMatrix.id,
                        buttonId: this.itemId,
                        itemName: this.itemName,
                        price: 1.00
                    };

                    try {
                        const { errors, data } = await this.$apollo.mutate({
                            mutation: gql`
                                mutation CreateMatrixItem ($data: CreateItemInItemMatrixInput!) {
                                    createItemInItemMatrix(input: $data) {
                                    	id
                                    }
                                }
                            `,
                            variables: {
                                data: itemData
                            }
                        });

                        if (errors && !isEmpty(errors)) {
                            this.status.error = head(errors).message || 'Ошибка сохранения.';
                        } else {
                            this.showSuccessMessage();
                        }
                    } catch (error) {
                        this.status.error = error.message || 'Ошибка сохранения.';
                    }
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.input-invalid {
		border: 1px solid #da0000 !important;
	}
</style>
