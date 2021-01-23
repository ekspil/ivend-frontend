<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div class="form-label f-b card-header my-auto">Партнерская ссылка: <a :href="'https://cabinet.ivend.pro/register?ref='+user.id">https://cabinet.ivend.pro/register?ref={{this.user.id}}</a></div>

                                <div class="stats-top-menu__date-buttons">
                                    <Period @onChange="onPeriodChange"/>
                                </div>

                                <Table
                                        v-if="users"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                        :orderAll="descFunc"
                                />

                                <div v-else-if="$apollo.loading" class="aligned-text">Загрузка...</div>
                                <div v-else class="aligned-text">Нет вендоров</div>
                                <div class="card-body row" style="padding: 4px;">
                                    <ul class="pagination col">
                                        <li class="page-item page-prev"> <a class="page-link" v-on:click="prevPage()">Пред</a> </li>
                                        <li class="page-item page-next"> <a class="page-link" v-on:click="nextPage()">След</a> </li>
                                    </ul>
                                    <div class="form-label f-b col">{{(this.offset/this.limit) + 1}} страница</div>
                                    <div class="form-group col" style="width: 20%; padding-left: 10px">
                                        <label class="form-label f-b col">Показывать по:</label>
                                    </div>
                                    <div class="form-group kol">
                                        <select v-model="limit" class="form-control custom-select">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </div>
                                </div>
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
    import Period from '@/modules/PeriodLarge';
    import { getTableHeaders, getTableFields } from '@/utils/mappers/PartnerUsers';

    export default {
        name: 'Users',
        components: {
            Table,
            Period
        },
        data: () => ({
            period: {
              from: null,
              to: null
            },
            user: {
              id:null
            },
            orderKey: null,
            orderDesc: null,
            users: null,
            offset: 0,
            limit:100,
            savedLimit :100,
            search: "",
            savedSelectedRole: "VENDOR",
            selections: [
            ]
        }),
        apollo: {
            users: {
                query: gql`
                    query($input: AllUsersInput, $orderDesc: Boolean, $orderKey: String, $period: Period) {
                      getAllUsers(input: $input, orderDesc: $orderDesc, orderKey: $orderKey) {
                            phone
                            id
                            email
                            role
                            partnerId
                            monthPay(period: $period)
                            partnerFee(period: $period)
                            controllers{
                                id
                                simCardNumber
                            }
                            kkts{
                                id
                            }
                            billing{
                                balance
                                dailyBill
                                }
                            legalInfo{
                                inn
                                companyName
                                }
                             }
                    }
                `,
                variables () {
                    return {
                        input: {
                            offset: Number(this.offset),
                            limit: Number(this.limit),
                        },

                      orderKey: this.orderKey,
                      orderDesc: this.orderDesc,
                      period: this.period
                    };
                },
                update (data) {
                  let feeSum = 0
                    const returnedData = data.getAllUsers.map(
                        (user) => {
                            if(!user.legalInfo){
                                user.legalInfo = {}
                                user.legalInfo.inn = "Не указан"
                                user.legalInfo.companyName = "Не указан"

                            }

                            if(user.partnerFee){
                              feeSum += Number(user.partnerFee)
                            }

                            return user
                        }
                    )
                    this.$store.state.user.partnerFee = feeSum
                    return returnedData;
                }
            },
            user: {
                query: gql`
                    query {
                      getProfile {
                            id
                      }
                    }
                `,
                update (data) {

                    return data.getProfile
                }
            }
        },
        methods: {
            onPeriodChange (period) {
                if(period.to <= period.from){
                period.to = period.from
                }
                this.period = period;
            },
            nextPage() {
                if(!this.users || !this.users.length) {
                    return
                }
                this.offset += this.limit
            },

            descFunc(key, desc){
                this.orderKey = key
                this.orderDesc = desc
            },
            prevPage() {
                if(this.offset - this.limit < 0) {
                    return
                }

                this.offset -= this.limit
            },

            async filterBy (key, value) {
                if(key === "role"){
                    this.selectedRole = value
                }
            }

        },
        computed: {
            getTableHeaders,
            getTableFields () { return getTableFields(this.users) }
        }
    }
</script>
