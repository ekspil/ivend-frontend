<template>
	<div>
		<div class="text-wrap">
			<div class="example top-buttons-container top-buttons">
				<div class="top-buttons__left-container">
					<a href="#" class="btn btn-primary">Управление сотрудниками</a>
				</div>
				<div class="">
					<div class="row gutters-xs">
						<span class="col-auto">
							<button class="btn btn-primary" type="button">Сохранить
							</button>
						</span>
					</div>
				</div>
			</div>
		</div>

		<div class="company-settings">
			<form class="company-settings__form">
				<div class="company-settings__field-container">
					<label for="company-name" class="company-settings__field-label">Название
					компании</label>
					<input id="company-name" class="company-settings__field" type="text"
					placeholder="Название компании">
				</div>

				<div class="company-settings__field-container">
					<label for="company-city"
					class="company-settings__field-label">Город</label>
					<input id="company-city" class="company-settings__field" type="text"
					placeholder="Город">
				</div>

				<div class="company-settings__field-container">
					<label for="company-fact-address" class="company-settings__field-label">Адрес
					фактический</label>
					<input id="company-fact-address" class="company-settings__field" type="text"
					placeholder="Адрес фактический">
				</div>

				<div class="company-settings__field-container">
					<label for="company-inn" class="company-settings__field-label">ИНН</label>
					<input id="company-inn" class="company-settings__field" type="text"
					placeholder="ИНН">
				</div>

				<div class="company-settings__field-container">
					<label for="company-ogrn" class="company-settings__field-label">ОГРН</label>
					<input id="company-ogrn" class="company-settings__field" type="text"
					placeholder="ОГРН">
				</div>

				<div class="company-settings__field-container">
					<label for="company-legal-address" class="company-settings__field-label">Адрес
					юридический</label>
					<input id="company-legal-address" class="company-settings__field"
					type="text" placeholder="Адрес юридический">
				</div>



				<div class="company-settings__field-container">
					<label for="company-director" class="company-settings__field-label">Директор</label>
					<input id="company-director" class="company-settings__field" type="text"
					placeholder="Директор">
				</div>

				<div class="company-settings__field-container">
					<label for="company-director-phone" class="company-settings__field-label">Телефон директора</label>
					<input id="company-director-phone" class="company-settings__field" type="tel"
					placeholder="Телефон директора">
				</div>

				<div class="company-settings__field-container">
					<label for="company-director-email" class="company-settings__field-label">Почта директора</label>
					<input id="company-director-email" class="company-settings__field"
					type="text" placeholder="Почта директора">
				</div>




				<div class="company-settings__field-container">
					<label for="company-contact-name" class="company-settings__field-label">Контактное лицо</label>
					<input id="company-contact-name" class="company-settings__field" type="text"
					placeholder="Контактное лицо">
				</div>

				<div class="company-settings__field-container">
					<label for="company-contact-phone" class="company-settings__field-label">Контактный телефон</label>
					<input id="company-contact-phone" class="company-settings__field" type="tel"
					placeholder="Контактный телефон">
				</div>

				<div class="company-settings__field-container">
					<label for="company-contact-email" class="company-settings__field-label">Контактная почта</label>
					<input id="company-contact-email" class="company-settings__field"
					type="text" placeholder="Контактная почта">
				</div>
			</form>
		</div>

		<div class="card-footer card-footer--settings-company text-right ">
			<div class="d-flex">
				<button type="submit" class="btn btn-primary ml-auto">Созранить</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Company'
	}
</script>
