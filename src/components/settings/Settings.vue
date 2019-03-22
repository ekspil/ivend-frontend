<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-md-12 col-lg-12">
					<div class="card">
						<div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
						<div class="card-header">
							<div class="card-title f-b">Настройки</div>
						</div>

						<div class="tab-menu-heading">
							<div class="tabs-menu1">
								<!-- Tabs -->
								<ul class="nav panel-tabs f-b">
									<li>
										<a href="#" :class="activeTab === 'Equipment' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Equipment')">Оборудование</a>
									</li>
									<li>
										<a href="#" :class="activeTab === 'Machines' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Machines')">Автоматы</a>
									</li>
									<li>
										<a href="#" :class="activeTab === 'Notifications' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Notifications')">Уведомления</a>
									</li>
									<li>
										<a href="#" :class="activeTab === 'Company' ? 'active' : ''" data-toggle="tab" @click="setActiveTab('Company')">Компания</a>
									</li>
								</ul>
							</div>
						</div>

						<component :is="getActiveTab"></component>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Equipment from './modules/Equipment';
	import Machines from './modules/Machines/Machines';
	import Notifications from './modules/Notifications';
	import Company from './modules/Company';

	export default {
		name: 'Settings',
		data: () => ({
            activeTab: 'Equipment'
        }),
        computed: {
            getActiveTab () {
                switch (this.activeTab) {
                    case 'Equipment': return Equipment;
										case 'Machines': return Machines;
                    case 'Notifications': return Notifications;
                    case 'Company': return Company;

                    default: return Equipment;
                }
            }
        },
        methods: {
            setActiveTab (tabName = 'Equipment') {
                this.activeTab = tabName;
            }
        }
	}
</script>
