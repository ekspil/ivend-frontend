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
                            <router-link to="/controllers" class="card-header-links__item">Вернуться назад</router-link>
                        </div>
                        <div class="top-buttons top-buttons--product-matrix">
                            <div class="top-buttons__left-container">
                                <router-link :to="`/goods/add/${$route.params.id}`" class="btn btn-primary">Добавить товар</router-link>
                            </div>
                            <div class="top-buttons__content-container">
                                <button class="default-green-button btn btn-primary">Выбрать матрицу</button>
                                <button class="default-green-button btn btn-primary">Сохранить</button>
                            </div>
                        </div>
                        <div class="card-body">
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
                            <table class="table card-table table-vcenter text-nowrap">
                                <thead>
                                    <tr>
                                        <th class="sortable up">ID</th>
                                        <th class="sortable">Название товара</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="button in buttons" :key="getRandomKey()">
                                        <td class="input-cel"><input type="text" v-model="button.buttonId" placeholder="ID" /></td>
                                        <td class="input-cel">
                                            <select v-model="button.item.id">
                                                <option v-for="({ item }) in buttons" :key="getRandomKey()" :value="Number(item.id)">
                                                    {{ item.name }}
                                                </option>
                                            </select>
                                        </td>
                                        <td class="delete-cel-btn">
                                            <button class=""><i class="far fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer text-right">
                            <div class="d-flex">
                                <button type="submit" class="btn btn-primary ml-auto" @click.prevent="submit">Сохранить</button>
                            </div>
                            <transition name="fade">
                                <div class="validation-error" v-if="status.error">{{ status.error }}</div>
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

import { numberify, checkForRepeat } from '@/utils';

export default {
    name: 'ControllerGoods',
    apollo: {
        buttons: {
            query: gql `
                    query GetInfo ($id: Int!) {
                        buttons: getItemMatrix (id: $id) {
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

            variables() {
                return {
                    id: Number(this.$route.params.id)
                };
            },

            update: data => data.buttons.buttons
        }
    },
    data: () => ({
        buttons: [],

        status: {
            error: null
        }
    }),
    methods: {
        showError(message = 'Неизвестная ошибка.') {
            const that = this;

            this.status.error = message;

            setTimeout(() => {
                that.status.error = null;
            }, 2500);
        },

        getRandomKey() {
            return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        },

        async submit() {
            const pureButtons = numberify('buttonId', this.buttons);

            const areKeysRepeating = checkForRepeat('buttonId', pureButtons);
            if (!areKeysRepeating) {
                // Mutation
            } else {
                this.showError('ID товаров не могут повторяться.');
            }
        }
    }
}
</script>
