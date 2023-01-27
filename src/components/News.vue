<template>



  <div >

    <div class="modal fade" id="ModalNewsPopup" tabindex="-1" data-backdrop="static"   role="dialog" aria-labelledby="ModalNewsPopupAria" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabelModalSettingsTerminal">Экстренный выпуск новостей</h5>

          </div>
          <div class="modal-body" >
                <div class="fluid-container" v-if="selectedNew">
                  <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3">
                    <div class="ticket-details col-md-12">
                      <p class="mb-2 mr-2 text-muted" >{{selectedNew.date}}</p>

                      <div class="d-flex">
                        <p class="text-black f-b mr-2 mb-2 no-wrap">{{selectedNew.header}}</p>
                      </div>
                      <div  class="row" v-if="selectedNew.link">

                        <div class="col-sm-4" v-if="selectedNew.link"><img :src="selectedNew.link" /></div>
                        <div class="col-sm-8"><p class="text-black mb-2" v-for="par in splitP(selectedNew.text)"><span  class="noMargin"  v-html="par"></span></p></div>
                      </div>
                      <p class="text-black mb-2" v-if="!selectedNew.link" v-for="par in splitP(selectedNew.text)"><span  class="noMargin"  v-html="par"></span></p>




                    

                  </div>

                </div>
            </div>


          </div>
          <div class="modal-footer" >
            <button type="button" class="btn btn-primary" @click.prevent="read(data)">Прочитал!</button>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import gql from "graphql-tag";


export default {
  name: "News",
  props: ["data"],
  data: ()=>({
    news: null
  }),
  apollo: {
    news: {
      query: gql`
                    query {
                        getNews {
                            id
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
        return data.getNews.sort(compare)
      }
    }
  },
  computed: {
    selectedNew(){
      if(!this.data || !this.news) return null

      return this.news.find(item=>item.id === this.data)
    }
  },
  methods: {
    async read(id){
      try {

        const result = await this.$apollo.mutate({
          mutation: gql `
          mutation setNewsRead {
            setNewsRead
          }
          `,
        });
      }catch (e) {

      }
      finally {
        $('#ModalNewsPopup').modal("hide")
        this.$emit("clearNewsData")
      }
    },

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


}
</script>

<style scoped>

.modal-dialog {
  max-width: 800px;
}

>>> .noMargin > p {
  margin-top: 0; /* Отступ сверху */
  margin-bottom: 0 ; /* Отступ снизу */
}


</style>