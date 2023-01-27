<template>
    <div class="row mg-t-20">
        <div class="col-12 grid-margin">
            <div class="card">
                <div class="card-status bg-gradient br-tr-3 br-tl-3" v-if="topLine === 'true'"></div>
                <div class="card-header" v-if="header === 'true'">
                    <h3 class="card-title f-b">{{data.title || "Новости ivend"}}</h3>
                </div>
                <div class="card-body">
                    <div class="fluid-container" v-if="data">
                        <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3" v-for="ne in data.news">
                            <div class="ticket-details col-md-12">
                                <p class="mb-2 mr-2 text-muted" v-if="!data.nodate">{{ne.date}}</p>

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
        </div>
    </div>
</template>

<script>
    export default {
        name: "News",
        props:  {
            data: {
                type: Object,
                default: ()=> ({})
            },
            topLine: {
                type: String,
                default: "true"
            },
            header: {
                type: String,
                default: "true"
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
        }
    }
</script>

<style scoped>
>>> .noMargin > p {
  margin-top: 0; /* Отступ сверху */
  margin-bottom: 0; /* Отступ снизу */
}

</style>
