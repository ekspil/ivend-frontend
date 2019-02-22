<template>
	<div class="container">
		<div class="side-app">
			<div class="row mt-5">
				<div class="col-lg-10 offset-lg-1 col-md-12">
					<form method="post">
						<div class="top-buttons top-buttons--product-matrix">
							<div class="top-buttons__left-container">
								<router-link :to="`/goods/add/${$route.params.id}`" class="btn btn-primary">Добавить товар</router-link>
							</div>
							<div class="top-buttons__content-container">
								<button class="default-green-button btn btn-primary">Выбрать матрицу</button>
								<button class="default-green-button btn btn-primary">Сохранить</button>
							</div>

						</div>


						<div>
							<div class="row">
								<div class="col-md-12 col-lg-12">
									<div class="form-group">
										<label class="form-label f-b">Название товарной матрицы</label>
										<input type="text" class="form-control" value=""
										name="example-text-input" placeholder="Название товарной матрицы">
									</div>

									<div class="form-group">
										<label class="form-label f-b">Группа</label>
										<select class="form-control select2-show-search"
										data-placeholder="Выберите из списка">

										<option label="Выберите из списка">
										</option>
										<option value="1">Necta Kikko Max</option>
										<option value="2">Без автомата</option>
										<option value="3" selected>Necta Kikko ES6</option>
										<option value="4">Necta Astro</option>
										<option value="5">Necta Snakky Max</option>
										<option value="6">Necta Colibri C5</option>
										<option value="7">Spengler 1000</option>
										<option value="8">Crane 167</option>
										<option value="9">Necta Opera</option>
										<option value="10">Unicum Rosso</option>
										<option value="11">Unicum FoodBox</option>
										<option value="12">Unicum Nero</option>
										<option value="13">Necta Concerto</option>
										<option value="14">Rheavendors Luce X2</option>
										<option value="15">Crane 472</option>
										<option value="16">Rheavendors Sagoma H7</option>
										<option value="17">Saeco Atlante 500</option>
										<option value="18">Crane Vendo Sanden 217</option>
										<option value="19">Crane Vendo Sanden 680</option>
									</select>
								</div>

								<div class="form-group">
									<label class="form-label f-b">Тип</label>
									<select class="form-control select2-show-search"
									data-placeholder="Выберите из списка">

									<option label="Выберите из списка">
									</option>
									<option value="1">Напитки</option>
									<option value="2">Товар</option>
									<option value="3" selected>Услуги</option>
								</select>
							</div>

							<div class="form-group">
								<label class="form-label f-b">Модель</label>
								<select class="form-control select2-show-search"
								data-placeholder="Выберите из списка">

								<option label="Выберите из списка">
								</option>
								<option value="1">Напитки</option>
								<option value="2">Товар</option>
								<option value="3" selected>Услуги</option>
							</select>
						</div>
					</div>
				</div>
			</div>

			<div class="table-responsive product-matrix-table">
				<table class="table card-table table-vcenter text-nowrap">
					<thead>
						<tr>
							<th class="sortable up">Id</th>
							<th class="sortable">Название товара</th>
							<th>Мин</th>
							<th>Макс</th>
						</tr>
					</thead>
					<tbody>

						<tr>
							<td>1</td>
							<td>Эспрессо</td>
							<td>10</td>
							<td >100</td>
						</tr>

						<tr>
							<td>2</td>
							<td>Американо</td>
							<td>10</td>
							<td >100</td>
						</tr>

					</tbody>
				</table>
			</div>

			<div class="card-footer text-right">
				<div class="d-flex">
					<button type="submit" class="btn btn-primary ml-auto">Сохранить</button>
				</div>
			</div>
		</form>

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
	export default {
		name: 'ControllerGoods'
	}
</script>
