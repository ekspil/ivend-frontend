<template>
   <div class="container">
    <div class="side-app">

        <div class="row mt-5">
            <div class="col-md-12 col-lg-12">
                <div class="card">
                    <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                    <div class="card-header">
                        <div class="card-title f-b">Статистика</div>
                    </div>

                    <div class="tab-menu-heading">
                        <div class="tabs-menu1">
                            <!-- Tabs -->
                            <ul class="nav panel-tabs f-b">
                                <li>
                                    <a href="#" :class="activeTab === 'Finance' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Finance')">Финансы и продажи</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <component :is="getActiveTab"></component>
                </div>
                <!-- section-wrapper -->

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
    import Finance from './modules/Finance';

	export default {
		name: 'Stats',
        components: {
            Finance
        },
        data: () => ({
            activeTab: 'Finance'
        }),
        computed: {
            getActiveTab () {
                switch (this.activeTab) {
                    case 'Finance': return Finance;

                    default: return Finance;
                }
            }
        },
        methods: {
            setActiveTab (tabName = 'Finance') {
                this.activeTab = tabName;
            }
        }
	}
</script>
