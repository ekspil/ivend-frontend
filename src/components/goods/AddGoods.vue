<template>
	<div class="container">
		<div class="side-app">


			<div class="row mt-5">
				<div class="col-lg-10 offset-lg-1 col-md-12">
					<form method="post" class="card">
						<div class="card-header">
							<h3 class="card-title f-b">Добавление товара в матрицу товаров</h3>
						</div>


						<div class="card-header-links">
							<a href="javascript:void(0)" class="card-header-links__item">Вернуться назад</a>
						</div>


						<div class="table-responsive product-matrix-table product-matrix-table--add-rproduct">
							<table class="table card-table table-vcenter text-nowrap">
								<thead>
									<tr>
										<th class="">Id</th>
										<th class="">Название товара</th>
									</tr>
								</thead>
								<tbody>

									<tr>
										<td class="input-cel">

											<select class="" data-placeholder="Выберите из списка">
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
											</select>

										</td>
										<td class="input-cel"><input type="text" placeholder="Введите назвние товара"></td>
									</tr>
								</tbody>
							</table>
						</div>

						<div class="card-footer text-right">
							<div class="d-flex">
								<button type="submit" class="btn btn-primary ml-auto">Добавить товар</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>