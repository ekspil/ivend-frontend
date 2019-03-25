<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-lg-10 offset-lg-1 col-md-12">
                    <form method="post" class="card">
                        <div class="card-header">
                            <h3 class="card-title f-b">Настройки товарной матрицы</h3>
                        </div>
                        <div class="card-header-links">
                            <router-link to="/settings" class="card-header-links__item">Вернуться назад</router-link>
                        </div>
                        <div class="top-buttons top-buttons--product-matrix">
                            <div class="top-buttons__left-container">
                                <router-link :to="`/goods/add/${$route.params.id}`" class="btn btn-primary">Добавить товар</router-link>
                            </div>
                            <div class="top-buttons__content-container">
                                <button class="default-green-button btn btn-primary" v-if="false">Выбрать матрицу</button>
                                <button class="default-green-button btn btn-primary" v-if="false">Сохранить</button>
                            </div>
                        </div>
                        <div class="card-body" v-if="false">
                            <div class="row">
                                <div class="col-md-12 col-lg-12">
                                    <div class="form-group">
                                        <label class="form-label f-b">Название товарной матрицы</label>
                                        <input type="text" class="form-control" value="" name="example-text-input" placeholder="Название товарной матрицы">
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Группа</label>
                                        <select class="form-control select2-show-search" data-placeholder="Выберите из списка">
                                            <option label="Выберите из списка">
                                            </option>
                                            <option value="1">Necta Kikko Max</option>
                                            <option value="2">Без автомата</option>
                                            <option value="3" selected>Necta Kikko ES6</option>
                                            <option value="4">Necta Astro</option>
                                            <option value="5">Necta Snakky Max</option>
                                            <option value="6">Necta Colibri C5</option>
                                            <option value="7">Spengler 1000</option>
                                            <option value="8">Crane 167</option>
                                            <option value="9">Necta Opera</option>
                                            <option value="10">Unicum Rosso</option>
                                            <option value="11">Unicum FoodBox</option>
                                            <option value="12">Unicum Nero</option>
                                            <option value="13">Necta Concerto</option>
                                            <option value="14">Rheavendors Luce X2</option>
                                            <option value="15">Crane 472</option>
                                            <option value="16">Rheavendors Sagoma H7</option>
                                            <option value="17">Saeco Atlante 500</option>
                                            <option value="18">Crane Vendo Sanden 217</option>
                                            <option value="19">Crane Vendo Sanden 680</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Тип</label>
                                        <select class="form-control select2-show-search" data-placeholder="Выберите из списка">
                                            <option label="Выберите из списка">
                                            </option>
                                            <option value="1">Напитки</option>
                                            <option value="2">Товар</option>
                                            <option value="3" selected>Услуги</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label f-b">Модель</label>
                                        <select class="form-control select2-show-search" data-placeholder="Выберите из списка">
                                            <option label="Выберите из списка">
                                            </option>
                                            <option value="1">Напитки</option>
                                            <option value="2">Товар</option>
                                            <option value="3" selected>Услуги</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive product-matrix-table">
                            <table class="table card-table table-vcenter text-nowrap" v-if="data.buttons.length > 0 && !$apollo.loading">
                                <thead>
                                    <tr>
                                        <th class="sortable up">ID</th>
                                        <th class="sortable">Название товара</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="({ buttonId, item }) in data.buttons" :key="buttonId">
                                        <td class="input-cel">{{ buttonId }}</td>
                                        <td class="input-cel">
                                            {{ item.name }}
                                        </td>
                                        <td class="delete-cel-btn">
                                            <button @click.prevent="removeItem(buttonId)"><i class="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div class="aligned-text" v-else-if="$apollo.loading">
                              Загрузка...
                            </div>
                            <div class="aligned-text" v-else>Нет товаров</div>
                        </div>
                        <div class="card-footer text-right" v-if="false">
                            <div class="d-flex">
                                <button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';

export default {
    name: 'ControllerGoods',
    apollo: {
        data: {
            query: gql `
                    query ($id: Int!) {
                        getController (id: $id) {
                          itemMatrix {
                            id
                            buttons {
                              buttonId
                              item {
                                id
                                name
                              }
                            }
                          }
                        }
                    }
                `,

            variables() {
                return {
                    id: Number(this.$route.params.id)
                };
            },

            update: data => ({
              buttons: data.getController.itemMatrix.buttons,
              matrixId: data.getController.itemMatrix.id
            })
        }
    },
    data: () => ({
        data: {
          buttons: [],
          matrixId: null
        }
    }),
    methods: {
        getRandomKey() {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        },

        async removeItem (id) {
          const { data } = await this.$apollo.mutate({
            mutation: gql`
              mutation ($data: RemoveButtonFromItemMatrixInput!) {
                matrix: removeButtonFromItemMatrix (input: $data) {
                  buttons {
                    buttonId
                    item {
                      id
                      name
                    }
                  }
                }
              }
            `,

            variables: {
              data: {
                itemMatrixId: this.data.matrixId,
                buttonId: id
              }
            }
          });

          this.data.buttons = data.matrix.buttons;
        }
    }
}
</script>
