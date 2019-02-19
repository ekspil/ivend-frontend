<template>
	<form name="notifications" action="">
		<div class="text-wrap">
			<div class="example top-buttons top-buttons--notification">
				<div class="top-buttons__left-container">
					<div class="top-buttons__field-container top-buttons__field-container--phone">
						<input class="top-buttons__field" type="tel" placeholder="Телефон">
					</div>

					<div class="top-buttons__field-container top-buttons__field-container--email">
						<input class="top-buttons__field" type="email" placeholder="Почта">
					</div>
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


		<div class="table-responsive notification-table">
			<table class="table card-table table-vcenter text-nowrap notification-table">
				<thead>
					<tr>
						<th>Событие</th>
						<th>Email</th>
						<th>Viber</th>
						<th>Whatsapp</th>
						<th>Telegram</th>
						<th>SMS</th>
					</tr>
				</thead>
				<tbody>

					<tr>
						<td>Нет связи с автоматом</td>

						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-11">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-11">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>

						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-12">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-12">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-13">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-13">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<td class="checkbox-cel ">
							<label class="default-checkbox" for="checkbox-14">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-14">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-15">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-15">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
					</tr>

					<tr>
						<td>Отключение питания</td>

						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-21">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-21">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>

						<td class="checkbox-cel ">
							<label class="default-checkbox" for="checkbox-22">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-22">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-23">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-23">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-24">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-24">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
						<td class="checkbox-cel">
							<label class="default-checkbox" for="checkbox-25">
								<input class="auth-block__checkbox" type="checkbox" name="remember"
								id="checkbox-25">

								<span class="auth-block__checkbox-label"></span>
							</label>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</form>
</template>

<script>
	export default {
		name: 'Notifications'
	}
</script>
