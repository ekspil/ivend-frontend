<template>
  <div class="container">
    <div class="side-app">
      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Тарифы</div>
            </div>

            <div class="card-body">

              <div class="table-responsive">
                <table class="table card-table table-vcenter text-nowrap">
                  <thead class="bg-primary text-white">
                  <tr>
                    <th class="text-white">Название услуги</th>
                    <th class="text-white">Стоимость</th>


                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <th scope="row">Услуга телеметрии за один ТА</th>


                    <td>100 руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row">Услуга фискализации за один ТА</th>


                    <td>100 руб./мес.</td>
                  </tr>
                  <tr>
                    <th scope="row">Услуга СМС информирования</th>


                    <td>2 руб./смс</td>
                  </tr>


                  </tbody>
                </table>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div class="row mt-5">
        <div class="col-md-12 col-lg-12">
          <div class="card">
            <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
            <div class="card-header">
              <div class="card-title f-b">Реквизиты и контакты</div>
            </div>

            <div class="card-body">

              <p>ООО "ИНТЕРНЕТ  ВЕНДИНГ"<br>
                ИНН: 7805714120<br>
                ОГРН: 1177847308671<br><br>

                г. Санкт-Петербург<br>
                пр. Трамвайный 12А<br>
                8 (931) 328 81 59<br>
                info@ivend.pro</p>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Tariffs'
  }
</script>
