<template>
    <div class="container">
        <div class="side-app">
            <div class="row mt-5">
                <div class="col-md-12 col-lg-12">
                    <div class="card">
                        <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                        <div class="card-header">
                            <div class="card-title f-b">Панель партнера</div>
                            <div class="card-title-right f-b" v-if="$store.state.user.partnerFee">Сумма комиссии за период {{($store.state.user.partnerFee).toFixed(2)}} руб.</div>

                        </div>

                        <Tabs :tabs="tabs" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Tabs from '@/modules/Tabs';
    import Vendors from '@/components/partner/PartnerUsers';
    import PartnerPayments from '@/components/partner/PartnerPayments';
    import PartnerInfos from '@/components/partner/PartnerInfos';


    export default {
        name: 'Settings',
        components: { Tabs },
        data: () => ({
            tabs: [
                { name: 'Вендоры', component: Vendors, route: 'vendors' },
                { name: 'Выплаты', component: PartnerPayments, route: 'partnerPayments' },
                { name: 'Информация для партнера', component: PartnerInfos, route: 'partnerInfo' },
            ]
        })
    }
</script>