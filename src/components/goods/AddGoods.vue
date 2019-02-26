<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <Validate
                    	class="card"
                    	title="Добавление товара в матрицу товаров"
                    	ref="form"
                    	formName="addGoods"
                    	:schema="schema"
                    	@onSubmit="save"
                    	@onSuccess="onSuccess"
                    >
                        <template slot="form">
                            <div class="table-responsive product-matrix-table product-matrix-table--add-rproduct">
                                <table class="table card-table table-vcenter text-nowrap">
                                    <thead>
                                        <tr>
                                            <th class="">ID</th>
                                            <th class="">Название товара</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="input-cel">
                                                <Field type="text" formName="addGoods" name="buttonId" placeholder="Введите ID кнопки" />
                                            </td>
                                            <td class="input-cel">
                                                <select data-placeholder="Выберите товар" v-model="item.id">
                                                    <option v-for="good in data.goods" :key="good.id" :value="good.id">
                                                        {{ good.name }}
                                                    </option>
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </template>
                        <template slot="submit">
                            <button type="submit" class="btn btn-primary ml-auto">Добавить товар</button>
                        </template>
                    </Validate>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import gql from 'graphql-tag';

	import { any } from 'ramda';
	import { convertServerError } from '@/utils';
	import { required } from '@/utils/validation';

	import Validate from '@/modules/validation/Validate';
	import Field from '@/modules/validation/Field';

	export default {
		name: 'AddGoods',
		components: {
			Validate,
			Field
		},
		apollo: {
			data: {
				query: gql`
					query GetGoods ($id: Int!) {
						buttons: getItemMatrix (id: $id) {
							id,
							buttons {
								buttonId,
								item {
									id,
									name
								}
							}
						}

						items: getProfile {
							items {
								id,
								name
							}
						}
					}
				`,

				variables () {
					return { id: Number(this.$route.params.id) };
				},

				update: data => ({
					buttons: data.buttons.buttons,
					goods: data.items.items
				})
			}
		},

		data: () => ({
			item: {
				id: 0
			},

			schema: {
				buttonId: [required]
			},
			data: {}
		}),

		methods: {
			async save () {
				const cache = this.$store.getters['cache/data'];
			
				try {
					const { errors, data } = await this.$apollo.mutate({
						mutation: gql`
							mutation addButton ($data: AddButtonToItemMatrixInput!) {
								addButtonToItemMatrix (input: $data) {
									buttons {
										buttonId,
										item {
											id,
											name
										}
									}
								}
							}
						`,

						variables: {
							data: {
								itemMatrixId: Number(this.$route.params.id),
								buttonId: Number(cache.buttonId),
								itemId: this.item.id
							}
						},

						update: data => data.buttons
					});
					this.$refs.form.process({ errors, success: 'Товар успешно добавлен.' });
				} catch (error) {
					this.$refs.form.showMessage('error', convertServerError(error.message));
				}
			},

			onSuccess () {
				this.$router.push(`/controllers/edit/${this.$route.params.id}`);
			}
		}
	}
</script>