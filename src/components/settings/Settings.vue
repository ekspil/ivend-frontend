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

						<Tabs :tabs="tabs" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Tabs from '@/modules/Tabs';
import Equipment from './modules/Equipment';
import Machines from './modules/Machines/Machines';
import Notifications from './modules/Notifications';
import Company from './modules/Company';

export default {
	name: 'Settings',
	components: { Tabs },
	data: () => ({
		tabs: [
			{ name: 'Контроллеры', component: Equipment, route: 'equipment' },
			{ name: 'Автоматы', component: Machines, route: 'machines' },
			{ name: 'Уведомления', component: Notifications, route: 'notifications' },
			{ name: 'Компания', component: Company, route: 'company' }
		]
	})
}
</script>
