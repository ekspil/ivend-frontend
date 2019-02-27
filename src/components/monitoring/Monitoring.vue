<template>
   <div class="container">
    <div class="side-app">

        <div class="row mt-5">
            <div class="col-md-12 col-lg-12">
                <div class="card">
                    <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                    <div class="card-header">
                        <div class="card-title f-b">Мониторинг</div>
                    </div>

                    <div class="tab-menu-heading">
                        <div class="tabs-menu1">
                            <!-- Tabs -->
                            <ul class="nav panel-tabs f-b">
                                <li>
                                    <a href="#" :class="activeTab === 'State' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('State')">Состояние</a></li>
                                    <li>
                                        <a href="#" :class="activeTab === 'Events' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Events')">События</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <component :is="getActiveTab" v-if="!$apollo.loading"></component>
                    </div>
                    <!-- section-wrapper -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import State from './modules/State';
    import Events from './modules/Events';

	export default {
		name: 'Monitoring',
		data: () => ({
            activeTab: 'State'
		}),
        computed: {
            getActiveTab () {
                switch (this.activeTab) {
                    case 'State': return State;
                    case 'Events': return Events;

                    default: return State;
                }
            }
        },
        methods: {
            setActiveTab (tabName = 'MonitoringState') {
                this.activeTab = tabName;
            }
        }
	}
</script>
