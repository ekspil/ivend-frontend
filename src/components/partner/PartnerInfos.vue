<template>
    <div class="container">
                <div class="card-status bg-gradient br-tr-3 br-tl-3" ></div>
                <div class="card-header" >
                  <h3 class="card-title f-b">{{"Информация для партнера"}}</h3>
                </div>
                <div class="card-body">
                  <div class="fluid-container" v-if="news">
                    <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3" v-for="ne in news">
                      <div class="ticket-details col-md-12">
                        <p class="mb-2 mr-2 text-muted" v-if="!nodate">{{ne.date}}</p>

                        <div class="d-flex">
                          <p class="text-black f-b mr-2 mb-2 no-wrap">{{ne.header}}</p>
                        </div>
                        <div  class="row" v-if="ne.link">

                          <div class="col-sm-4" v-if="ne.link"><img :src="ne.link" /></div>
                          <div class="col-sm-8"><p class="text-black mb-2" v-for="par in splitP(ne.text)"><span class="noMargin" v-html="par"></span></p></div>
                        </div>
                        <p class="text-black mb-2" v-if="!ne.link" v-for="par in splitP(ne.text)"><span class="noMargin" v-html="par"></span></p>




                      </div>

                    </div>


                  </div>
                </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    export default {
        name: 'payments',
        data: () => ({
            nodate: true,
            news: null,
        }),
        apollo: {
          news: {
            query: gql`
                    query {
                        getPartnerInformation {

                            date
                            text
                            link
                            header
                            active
                            }


                    }
                `,
            update: (data) => {
            function compare(a, b) {
              let dateA = a.date.split(/[\s|,.!\-#]+/)
              dateA.reverse()
              let dateB = b.date.split(/[\s|,.!\-#]+/)
              dateB.reverse()
              dateA.join('.')
              dateB.join('.')
              if (dateA > dateB) return -1; // если первое значение больше второго
              if (dateA == dateB) return 0; // если равны
              if (dateA < dateB) return 1; // если первое значение меньше второго
            }
            return data.getPartnerInformation.sort(compare)
          }
        }
      },
        methods: {
          splitP: function(text){
            const arrText = text.split("[P]")
            return arrText.map(t => {
              return  t.replace(/\[li].+\[name].+\[li]/g, (str, p1, p2, offset, s) => {
                const arr = str.replace(/\[li]/g, "").split("[name]")
                return `<a href="${arr[0]}">${arr[1]}</a>`
              })
            })
          }
        },
        computed: {
        }
    }
</script>
