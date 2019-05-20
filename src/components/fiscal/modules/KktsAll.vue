<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                    <router-link to="/fiscalAll/add" class="btn btn-primary">Добавить фискальный регистратор</router-link>
                                </div>


                                <Table
                                        v-if="kkts && kkts.length > 0"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет ККТ</div>
                            </div>
                            <!-- section-wrapper -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    import Table from '@/modules/table/TableF';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/KktsAll';

    export default {
        name: 'Kkts',
        components: {
            Table
        },
        data: () => ({
            kkts: []
        }),
        apollo: {
            kkts: {
                query: gql`
                    query {
                      getAllKkts {
                            id
                            kktModel
                            kktFactoryNumber
                            kktRegNumber
                            kktFNNumber
                            kktActivationDate
                            kktBillsCount
                            kktOFDRegKey

                             }
                    }
                `,
                update (data) {
                    return data.getAllKkts;
                }
            }
        },
        methods: {

        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.kkts); }
        }
    }
</script>