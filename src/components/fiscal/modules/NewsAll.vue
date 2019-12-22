<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="top-buttons__left-container">
                                    <router-link to="/fiscalAll/addNews" class="btn btn-primary">Добавить Новость</router-link>
                                </div>


                                <Table
                                        v-if="news && news.length > 0"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет новостей</div>
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

    import { getTableHeaders, getTableFields } from '@/utils/mappers/NewsAll';

    export default {
        name: 'News',
        components: {
            Table
        },
        data: () => ({
            news: []
        }),
        apollo: {
            news: {
                query: gql`
                    query {
                      getAllNews {
                            id
                            date
                            text
                            link
                            header
                            active
                            }
                    }
                `,
                update (data) {

                    return data.getAllNews;
                }
            }
        },
        methods: {
            async removeNews (id) {
                await this.$apollo.mutate({
                    mutation: gql`
                        mutation ($id: Int!) {
                            deleteNews (id: $id)
                        }
                    `,
                    variables: { id }
                });

                this.news = this.news.filter(ne => ne.id !== id);
            }

        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.news, {
                remove: this.removeNews
            }) }
        }
    }
</script>