<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <!--<div class="top-buttons__left-container">-->
                                    <!--<router-link to="/usersAll" class="btn btn-primary">Добавить фискальный регистратор</router-link>-->
                                <!--</div>-->


                                <Table
                                        v-if="users && users.length > 0"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет вендоров</div>
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
    import Table from '@/modules/table/Table';

    import { getTableHeaders, getTableFields } from '@/utils/mappers/UsersAll';

    export default {
        name: 'Users',
        components: {
            Table
        },
        data: () => ({
            users: []
        }),
        apollo: {
            users: {
                query: gql`
                    query {
                      getAllUsers {
                            phone
                            id
                            email
                            role
                            legalInfo{
                                inn
                                companyName
                                }
                             }
                    }
                `,
                update (data) {

                    const returnedData = data.getAllUsers.map(
                        (user) => {
                            if(!user.legalInfo){
                                user.legalInfo = {}
                                user.legalInfo.inn = "Не указан"
                                user.legalInfo.companyName = "Не указан"

                            }
                            return user
                        }
                    )

                    return returnedData;
                }
            }
        },
        // methods: {
        //     async removeKkt (id) {
        //         await this.$apollo.mutate({
        //             mutation: gql`
        //                 mutation ($id: Int!) {
        //                     deleteKkt (id: $id)
        //                 }
        //             `,
        //             variables: { id }
        //         });
        //
        //         this.kkts = this.kkts.filter(controller => controller.id !== id);
        //     }
        //
        // },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.users) }
        }
    }
</script>