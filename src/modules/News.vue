<template>
    <div class="row mg-t-20">
        <div class="col-12 grid-margin">
            <div class="card">
                <div class="card-status bg-gradient br-tr-3 br-tl-3"></div>
                <div class="card-header">
                    <h3 class="card-title f-b">{{data.title || "Новости ivend"}}</h3>
                </div>
                <div class="card-body">
                    <div class="fluid-container" v-if="data">
                        <div class="row ticket-card  pb-2 border-bottom pb-3 mb-3" v-for="ne in data.news">
                            <div class="ticket-details col-md-12">
                                <p class="mb-2 mr-2 text-muted">{{ne.date}}</p>

                                <div class="d-flex">
                                    <p class="text-black f-b mr-2 mb-2 no-wrap">{{ne.header}}</p>
                                </div>
                                <div  class="row" v-if="ne.link">

                                    <div class="col-sm-4" v-if="ne.link"><img :src="ne.link" /></div>
                                    <div class="col-sm-8"><p class="text-black mb-2" v-for="par in splitP(ne.text)">{{par}}</p></div>
                                </div>
                                <p class="text-black mb-2" v-if="!ne.link" v-for="par in splitP(ne.text)">{{par}}</p>




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
            }
        },
        methods: {
            splitP: function(text){
                return text.split("[P]")
            }
        }
    }
</script>