<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="text-wrap">
                            <div class="example top-buttons-container top-buttons">
                                <div v-if="!$store.state.auth.admin.token" class="top-buttons__left-container btn btn-primary" @click="adminEnter()">Режим администратора</div>
                                <div v-if="$store.state.auth.admin.token" class="top-buttons__left-container btn btn-primary" @click="adminOut()">Выйти из режима администратора</div>

                                <div class="form-group" style="width: 50%; padding-left: 10px">
                                    <input v-model="search" class="form-control custom-select" placeholder="Поиск">
                                </div>


                                <Table
                                        v-if="users"
                                        :headers="getTableHeaders"
                                        :fields="getTableFields"
                                        className="settings-table"
                                        :selections="selections"
                                        :filterAction="filterBy"
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
                                            <option value="100">100</option>
                                            <option value="200">200</option>
                                            <option value="500">500</option>
                                            <option value="1000">1000</option>
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

    import { getTableHeaders, getTableFields } from '@/utils/mappers/UsersAll';
    import { mapMutations } from 'vuex';

    export default {
        name: 'Users',
        components: {
            Table
        },
        data: () => ({
            users: [],
            offset: 0,
            limit:100,
            savedLimit :100,
            search: "",
            selectedRole: "VENDOR",
            savedSelectedRole: "VENDOR",
            selections: [
                {
                key: "role",
                values: [
                    "VENDOR",
                    "CLOSED",
                    "AGGREGATE",
                    "VENDOR_NO_LEGAL_INFO",
                    "VENDOR_NOT_CONFIRMED",
                    "VENDOR_NEGATIVE_BALANCE",
                    "ADMIN"
                ]
            }
            ]
        }),
        apollo: {
            users: {
                query: gql`
                    query($input: AllUsersInput) {
                      getAllUsers(input: $input) {
                            phone
                            id
                            email
                            role
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
                            role: this.selectedRole,
                            offset: Number(this.offset),
                            limit: Number(this.limit)
                        }
                    };
                },
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
        methods: {
            ...mapMutations({setAdminToken: 'auth/setAdminToken'}),
            adminEnter: function(){
                this.setAdminToken({token: this.$store.state.auth.token})
            },
            adminOut: function(){
                this.setAdminToken(null)
            },
            nextPage() {
                if(!this.users || !this.users.length) {
                    return
                }
                this.offset += this.limit
            },
            prevPage() {
                if(this.offset - this.limit < 0) {
                    return
                }

                this.offset -= this.limit
            },
            async changeBalance (id, sum) {
                try {
                    const data = {
                        id,
                        sum: Number(sum)
                    };

                    const { errors } = await this.$apollo.mutate({
                        mutation: gql `mutation change($data: ChangeUserBalanceInput! ){
                                         changeUserBalance(input: $data)
                                                }

          `,
                        variables: {
                            data: data
                        }
                    });

                    this.users = this.users.map(user => {
                        if (user.id === id){
                            user.billing.balance = (Number(user.billing.balance) + Number(sum)).toFixed(2)
                            return user
                        }
                        return user
                    })
                } catch (error) {

                }
            },
            async remove (id) {
                console.log(id)
                try {
                    const { errors } = await this.$apollo.mutate({
                        mutation: gql `mutation remove($id: Int!) {
                                         closeUser(id: $id) {
                                         id
                                         }
                                                }

          `,
                        variables: {
                            id
                        }
                    });

                    this.users = this.users.map(user => {
                        if(user.id !== id) return user
                        user.role = "CLOSED"
                        return user
                    })
                } catch (error) {

                }
            },
            async filterBy (key, value) {
                if(key === "role"){
                    this.selectedRole = value
                }
            }

        },
        computed: {
            userSearch(){
                if(this.search.length > 3){
                    if(this.limit < Number(1001)){
                        this.savedLimit = this.limit
                    }

                    this.limit = 9999
                }
                else if(this.search.length == 0){

                }
                else{
                    if(this.savedLimit < this.limit){
                        this.limit = this.savedLimit
                    }
                }
                return this.users.filter(user => {
                    // id
                    // kktModel
                    // kktFactoryNumber
                    // kktRegNumber
                    // kktFNNumber
                    if(!this.search) return true
                    const r1 = new RegExp(this.search.toUpperCase())
                    const res1 = r1.test(user.legalInfo.inn.toUpperCase())
                    if(res1) return res1
                    const r2 = new RegExp(this.search.toUpperCase())
                    const res2 = r2.test(user.legalInfo.companyName.toUpperCase())
                    if(res2) return res2
                    const r3 = new RegExp(this.search.toUpperCase())
                    const res3 = r3.test(user.phone.toUpperCase())
                    if(res3) return res3

                    const r4 = new RegExp('^'+this.search.toUpperCase())
                    const res4 = r4.test(user.email.toUpperCase())
                    if(res4) return res4
                    return false

                })
            },
            getTableHeaders,
            getTableFields () { return getTableFields(this.userSearch, {
                changeBalance: this.changeBalance,
                sum: 0,
                changeBalanceKey: "balance",
                remove: this.remove,
                routeKey: "id",
                route: "/fiscalAll/userEdit/"
            }) }
        }
    }
</script>