<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">

                                <div class="top-buttons__left-container">
                                    <router-link to="/fiscalAll/addNews" class="btn btn-primary">Добавить запись</router-link>
                                </div>
                                <div class="form-group">
                                    <select v-model="selectType" class="form-control custom-select">
                                        <option value="all">Все</option>
                                        <option value="news">Новость</option>
                                        <option value="info">(ТП) Информация</option>
                                        <option value="instr">(ТП) Инструкция</option>
                                    </select>
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
            news: [],
            selectType: "all"
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
                      getAllInfo {
                            id
                            date
                            text
                            link
                            header
                            active
                            }
                      getAllInstr {
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
                    const instr = data.getAllInstr.map(item => {
                        item.type = "instr"
                        return item
                    })
                    const info = data.getAllInfo.map(item => {
                        item.type = "info"
                        return item
                    })
                    const news = data.getAllNews.map(item => {
                        item.type = "news"
                        return item
                    })
                    return [...instr, ...info, ...news];
                }
            }
        },
        methods: {
            async removeNews (id, type) {
                switch (type) {
                    case "Новость":

                        await this.$apollo.mutate({
                            mutation: gql`
                        mutation ($id: Int!) {
                            deleteNews (id: $id)
                        }
                    `,
                            variables: { id }
                        });

                        this.news = this.news.filter(ne => {
                            return !(ne.id === id && ne.type === "news")
                        });
                        break

                    case "Информация":

                        await this.$apollo.mutate({
                            mutation: gql`
                        mutation ($id: Int!) {
                            deleteInfo (id: $id)
                        }
                    `,
                            variables: { id }
                        });


                        this.news = this.news.filter(ne => {
                            return !(ne.id === id && ne.type === "info")
                        });
                        break

                    case "Инструкция":

                        await this.$apollo.mutate({
                            mutation: gql`
                        mutation ($id: Int!) {
                            deleteInstr (id: $id)
                        }
                    `,
                            variables: { id }
                        });


                        this.news = this.news.filter(ne => {
                            return !(ne.id === id && ne.type === "instr")
                        });
                        break
                }
            }

        },
        computed: {
            getTableHeaders,
            newsFiltred (){
                return this.news.filter(item => {
                    if(this.selectType === "all") return true
                    return item.type === this.selectType
                })
            },
            getTableFields () { return getTableFields(this.newsFiltred, {
                remove: this.removeNews
            }) }
        }
    }
</script>