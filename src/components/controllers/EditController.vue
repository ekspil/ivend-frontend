<template>
    <div class="container">
        <div class="side-app" v-if="controller">
            <div class="row mt-5">
                <div class="col-lg-8 offset-2 card">
                    <div class="card-header">
                        <h3 class="card-title f-b">Редактирование оборудования №{{controller.uid}}</h3>
                    </div>

                    <div class="tab-menu-heading">
                        <div class="tabs-menu1 ">
                            <!-- Tabs -->
                            <ul class="nav panel-tabs f-b">
                                <li>
                                    <a href="#" :class="activeTab === 'Settings' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Settings')">Настройки</a>
                                </li>
                                <li>
                                    <a href="#" :class="activeTab === 'Fiscal' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Fiscal')">Фискальный регистратор</a>
                                </li>
                                <li>
                                    <a href="#" :class="activeTab === 'Goods' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Goods')">Товары</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <component :is="getActiveTab"></component>
                </div>
            </div>


        </div>
        <!--footer-->
        <footer class="footer">
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-md-12 col-sm-12 mt-3 mt-lg-0 text-center">
                        © 2018 <a href="#">ivend</a>. Все права защищены.
                    </div>
                </div>
            </div>
        </footer>
        <!-- End Footer-->
    </div>

</template>


<script>
    import gql from 'graphql-tag';

    import ControllerSettings from './modules/ControllerSettings';
    import ControllerGoods from './modules/ControllerGoods';

    import { head, isEmpty } from 'ramda';
    import { areKeysNull } from '@/utils';
    import {
        validate, mapValidationObject,
        required
    } from '@/utils/validation';

    export default {
        data: () => ({
            controller: null,
            equipments: [],
            revisions: [],

            validation: {},
            status: {
                error: null,
                success: ''
            },

            activeTab: 'Settings'
        }),
        apollo: {
            controller: {
                variables() {
                    return {
                        id: Number(this.$route.params.id),
                    }
                },
                query: gql`
                    query GetController($id: Int!) {
                      controller: getController(id: $id) {
                        uid
                      }
                    }
                `
            }
        },
        computed: {
            getActiveTab () {
                switch (this.activeTab) {
                    case 'Settings': return ControllerSettings;
                    case 'Goods': return ControllerGoods;

                    default: return ControllerSettings;
                }
            }
        },
        methods: {
            setActiveTab (tabName = 'Settings') {
                this.activeTab = tabName;
            }
        }
    }
</script>
